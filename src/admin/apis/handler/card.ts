import { ResponseData } from "src/types/api";
import Api from "../api";

import { BankQRState } from "@admin/store/bankQR";

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

    async deleteCard(id: string): Promise<boolean> {
        try {
            const response = await this.axios.delete("/card", { data: { id } });
            if (response.status == 200) {
                return true;
            } else {
                throw new Error("");
            }
        } catch (error) {
            return false;
        }
    }
}

export default new CardApi();