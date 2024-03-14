import Api from "../api";

class ChipApi extends Api {
    constructor() {
        super("/suggestion");
    }

    async get(): Promise<string[]> {

        try {
            const response = await this.axios.get<string[]>("/");
            if (response.status == 200) {
                return response.data;
            } else {
                throw new Error("");
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