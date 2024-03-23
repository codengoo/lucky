import { MessageState } from "@admin/store/message";
import Api from "../api";
import { ResponseData } from "src/types/api";

class MessageApi extends Api {
    constructor() {
        super("/message");
    }

    async add(data: MessageState): Promise<string | undefined> {
        try {
            const response = await this.axios.post<ResponseData>("/", data);

            if (response.status == 200) {
                return response.data.data;
            } else {
                throw new Error("");
            }
        } catch (error) {
            return undefined;
        }
    }
}

export default new MessageApi();