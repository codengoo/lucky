import Api from "../api";

interface ResponseOutput {
    link: string,
    ok: boolean
}

class AssetApi extends Api {
    constructor() {
        super("/asset");
    }

    async uploadImage(file: File): Promise<string | undefined> {
        try {
            let formData = new FormData();
            formData.append('image_upload', file);

            const response = await this.axios.post<ResponseOutput>("/", formData, {
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

    async uploadCanvas(data: string) {
        try {
            const response = await this.axios.post<ResponseOutput>("/canvas", { data });

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

export default new AssetApi();