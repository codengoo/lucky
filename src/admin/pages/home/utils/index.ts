
import axios from "axios";

export interface BankDataResponse {
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
    data: BankDataResponse[];
}

export type BankData = Omit<
    BankDataResponse,
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