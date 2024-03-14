import Api from "../api";

import { BankQRState } from "@admin/store/bankQR";

export interface BankResponseData {
    id: number;
    name: string;
    code: string;
    bin: string;
    shortName: string;
    logo: string;
    transferSupported: boolean;
    lookupSupported: boolean;
}

export interface BankResponse {
    code: string;
    desc: string;
    data: BankResponseData[];
}

export interface ResponseData<T = string> {
    ok: boolean;
    data: T;
}

export type BankData = Omit<
    BankResponseData,
    "transferSupported" | "lookupSupported" | "code"
>;


export interface MyDBCard {
    id: string;
    acc_name: string,
    acc_num: string,
    acc_bank: string,
    acc_bank_short: string,
    wish: string,
    image: string
}

class CardApi extends Api {
    constructor() {
        super("");
    }

    async getBankBins(): Promise<BankData[]> {
        const response = await this.axios.get<BankResponse>(
            "https://api.vietqr.io/v2/banks"
        );

        if (response.status == 200) {
            const data = response.data.data;
            return data.map<BankData>((item) => ({
                bin: item.bin,
                name: item.name,
                id: item.id,
                logo: item.logo,
                shortName: item.shortName,
            }));
        } else {
            return [];
        }
    }

    async createCard(data: BankQRState): Promise<string | undefined> {
        try {
            const response = await this.axios.post<ResponseData>("/card", data);
            if (response.status == 200) {
                return window.WPLKPath.page + "?card=" + response.data.data;
            } else {
                throw new Error("");
            }
        } catch (error) {
            return undefined;
        }
    }

    async getAllCards(): Promise<MyDBCard[]> {
        try {
            const response = await this.axios.get<ResponseData<MyDBCard[]>>("/card");
            if (response.status == 200) {
                return response.data.data
            } else {
                throw new Error("");
            }
        } catch (error) {
            return [];
        }
    }
}

export default new CardApi();