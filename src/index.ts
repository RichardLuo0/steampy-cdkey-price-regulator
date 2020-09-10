import fs from "fs";
import readlineSync from "readline-sync";
import { initOptions } from "./Cli";
import { Game } from "./Game";
import SteampyAPI from "./SteampyAPI";

// exit when exception is thrown
process.on("unhandledRejection", error => {
    console.error(error);
    process.exit();
});

const api = new SteampyAPI();

let options = initOptions(process.argv);

// read token from file
const filePath = options["-cookiesPath"];
if (options["-token"].length <= 0 && fs.existsSync(filePath))
    try {
        options["-token"] = fs.readFileSync(filePath).toString();
    } catch {
        throw new Error("读取文件出错");
    }
else fs.writeFileSync(filePath, options["-token"]);
if (options["-token"].length <= 0) throw new Error("token未定义!");

const spread = options["-spread"];

api.setToken(options["-token"]);
api.listSelf().then(res => {
    res.content.forEach(async game => {
        if (game.stock <= 0) return;
        if (game.keyPrice >= game.steamGame.keyPrice) {
            console.log(
                `${game.steamGame.gameName}的当前价格${game.keyPrice}大于等于市场最低价格: ${game.steamGame.keyPrice}`
            );
            let newPrice = options["-step"]
                ? parseFloat(
                      readlineSync.question(
                          `请输入${game.steamGame.gameName}新价格？`
                      )
                  )
                : game.steamGame.keyPrice + spread;
            if (newPrice) setNewPrice(game, newPrice);
        }
    });
});

let isFirst = true;
function setNewPrice(game: Game, price: number) {
    if (price <= 0 || price == game.keyPrice) return;
    api.listSale(game.gameId).then(res => {
        if (res.content.length <= 1) return;
        // update when my bid is higher than or equal to others
        if (
            res.content[0].saleId != game.id ||
            res.content[0].keyPrice >= res.content[1].keyPrice
        ) {
            // delay to avoid server reject
            let updateFunction = () =>
                api
                    .updateSell(game.id, price)
                    .then(() =>
                        console.log(
                            game.steamGame.gameName + "价格已更新为: " + price
                        )
                    );
            if (isFirst) {
                updateFunction();
                isFirst = false;
            } else setTimeout(updateFunction, 11 * 1000);
        } else
            console.log(
                `${game.steamGame.gameName}已经是当前市场唯一的最低价: ${game.keyPrice}`
            );
    });
}
