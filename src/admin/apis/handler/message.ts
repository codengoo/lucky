import { MessageState } from "@admin/store/message";
import Api from "../api";

interface ResponseOutput {
    link: string,
    ok: boolean
}

class MessageApi extends Api {
    constructor() {
        super("/message");
    }

    async add(data: MessageState): Promise<string | undefined> {
        try {
            const response = await this.axios.post<ResponseOutput>("/", data);

            if (response.status == 200) {
                return response.data.link;
            } else {
                throw new Error("");
            }
        } catch (error) {
            return undefined;
        }
    }
}

export default new MessageApi();