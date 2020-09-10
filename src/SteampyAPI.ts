import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Game } from "./Game";
import { objectToFormData } from "./Utils";

export default class SteampyAPI {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: "https://www.steampy.com",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
            },
        });
    }

    setToken(token: string) {
        this.instance.defaults.headers["accessToken"] = token;
    }

    listSale(gameId: string) {
        return this.get(
            "/xboot/steamKeySale/listSale?pageNumber=1&pageSize=20&sort=keyPrice&order=asc&startDate=&endDate=&gameId=" +
                gameId
        );
    }

    listSelf() {
        return this.get<{ content: Game[] }>(
            "/xboot/steamKeySale/listSelf?pageNumber=1&pageSize=10&sort=saleStatus&order=desc&startDate=&endDate="
        );
    }

    updateSell(saleId: string, sellPrice: number) {
        return this.post(
            "/xboot/steamKeySale/updateSell",
            ...objectToFormData({ saleId, sellPrice })
        );
    }

    protected async get<T = any>(
        url: string,
        config?: AxiosRequestConfig | undefined
    ): Promise<T> {
        return this.getData(await this.instance.get(url, config));
    }

    protected async post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig | undefined
    ): Promise<T> {
        return this.getData(await this.instance.post(url, data, config));
    }

    protected getData(res: AxiosResponse<any>) {
        if (res.status != 200 || res.data.code != 200)
            throw new Error(
                "网络访问出错: " + res.config.url + ": " + res.data.message ??
                    res.status
            );
        return res.data.result;
    }
}
