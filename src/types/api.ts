export interface ResponseData<T = string> {
    ok: boolean;
    data: T;
    message: string
}

export interface BankBinResponseData {
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
    data: BankBinResponseData[];
}

export type BankBinData = Omit<
    BankBinResponseData,
    "transferSupported" | "lookupSupported" | "code"
>;