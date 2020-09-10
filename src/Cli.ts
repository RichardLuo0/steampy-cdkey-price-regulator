import { parse } from "./Utils";

export function initOptions(argv: string[]) {
    const options = {
        "-token": "",
        "-spread": 0,
        "-step": false,
        "-cookiesPath": "cookies.txt",
    };

    let newOptions: any = {};
    argv.forEach((e, i) => {
        for (const opt in options) {
            if (opt == e) newOptions[opt] = parse(typeof opt, argv[i + 1]);
            if (e == "-help") showHelp();
        }
    });
    Object.assign(options, newOptions);
    return options;
}

function showHelp() {
    console.log(
        JSON.stringify(
            {
                "-token": "要使用的accessToken，第一次输入后自动保存",
                "-spread": "期望设定为比最低价高多少,为负值时比最低价低多少",
                "-step": "是否对每一个游戏单独设定，true/false",
                "-cookiesPath": "cookies保存的相对路径",
            },
            null,
            2
        )
    );
    process.exit();
}
