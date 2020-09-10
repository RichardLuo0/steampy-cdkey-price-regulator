export interface Game {
    id: string;
    gameId: string;
    createTime: string;
    stock: number;
    keyPrice: number;
    steamGame: {
        gameName: string;
        gameNameCn: string;
        gamePrice: number;
        keyPrice: number;
    };
}
