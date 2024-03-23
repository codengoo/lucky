import { BankBinData, BankResponse } from "src/types/api";
import axios from "axios";

class ExternalApi {
    constructor() { }

    async getBankBins(): Promise<BankBinData[]> {
        const response = await axios.get<BankResponse>(
            "https://api.vietqr.io/v2/banks"
        );

        if (response.status == 200) {
            const data = response.data.data;
            return data.map<BankBinData>((item) => ({
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
}

export default new ExternalApi();