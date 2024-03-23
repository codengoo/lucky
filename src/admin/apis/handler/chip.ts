import { ResponseData } from "src/types/api";
import Api from "../api";

class ChipApi extends Api {
    constructor() {
        super("/suggestion");
    }

    async get(): Promise<string[]> {

        try {
            const response = await this.axios.get<ResponseData<string[]>>("/");
            if (response.status == 200) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            return [];
        }
    }

    async add(value: string): Promise<boolean> {
        try {
            const response = await this.axios.post("/", { value });
            if (response.status == 200) {
                return true;
            } else {
                throw new Error("");
            }
        } catch (error) {
            return false;
        }
    }

    async remove(value: string): Promise<boolean> {
        try {
            const response = await this.axios.delete("/", { data: { value } });
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

export default new ChipApi();