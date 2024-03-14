import { BankQRState } from "@admin/store/bankQR";
import axios from "axios";

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

export interface CardResponse {
    ok: boolean;
    link: string;
}

export type BankData = Omit<
    BankResponseData,
    "transferSupported" | "lookupSupported" | "code"
>;

export async function getBankBins(): Promise<BankData[]> {
    const response = await axios.get<BankResponse>(
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

export async function createCard(data: BankQRState): Promise<string | undefined> {
    const url = window.WPLKPath.api + "/lucky/v1/create";

    try {
        const response = await axios.post<CardResponse>(url, data);
        if (response.status == 200) {
            return window.WPLKPath.page + "?card=" + response.data.link;
        } else {
            throw new Error("");
        }
    } catch (error) {
        return undefined;
    }

}

export async function getChip(): Promise<string[]> {
    const url = window.WPLKPath.api + "/lucky/v1/suggestion";

    try {
        const response = await axios.get<string[]>(url);
        if (response.status == 200) {
            return response.data;
        } else {
            throw new Error("");
        }
    } catch (error) {
        return [];
    }
}

export async function addChip(value: string): Promise<boolean> {
    const url = window.WPLKPath.api + "/lucky/v1/suggestion";

    try {
        const response = await axios.post(url, { value });
        if (response.status == 200) {
            return true;
        } else {
            throw new Error("");
        }
    } catch (error) {
        return false;
    }
}

export async function removeChip(value: string): Promise<boolean> {
    const url = window.WPLKPath.api + "/lucky/v1/suggestion";

    try {
        const response = await axios.delete(url, { data: { value } });
        if (response.status == 200) {
            return true;
        } else {
            throw new Error("");
        }
    } catch (error) {
        return false;
    }
}

export async function uploadImage(file: File): Promise<string | undefined> {
    const url = window.WPLKPath.api + "/lucky/v1/asset";

    try {
        let formData = new FormData();
        formData.append('image_upload', file);

        const response = await axios.post<CardResponse>(url, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (response.status == 200) {
            return response.data.link;
        } else {
            throw new Error("");
        }
    } catch (error) {
        return undefined;
    }
}