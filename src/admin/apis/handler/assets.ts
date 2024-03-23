import { ResponseData } from "src/types/api";
import Api from "../api";

class AssetApi extends Api {
    constructor() {
        super("/assets");
    }

    async uploadImage(file: File): Promise<string | undefined> {
        try {
            let formData = new FormData();
            formData.append('image_upload', file);

            const response = await this.axios.post<ResponseData>("/", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.status == 200) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            return undefined;
        }
    }

    async uploadCanvas(data: string) {
        try {
            const response = await this.axios.post<ResponseData>("/canvas", { data });

            if (response.status == 200) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            return undefined;
        }
    }
}

export default new AssetApi();