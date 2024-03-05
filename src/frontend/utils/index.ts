import axios from "axios";

export interface IResponse {
    "id": string,
    "acc_name": string,
    "acc_num": string,
    "acc_bank": string,
    "acc_bank_short": string,
    "wish": string,
    "image": string,
    "link": ""
}

export async function getData(id: string, password: string): Promise<IResponse | undefined> {
    const url = window.WPLKPath.api + "/lucky/v1/get";
    const response = await axios.get<IResponse>(url, {
        data: {
            id: id,
            password: password
        }
    })

    if (response.status == 200) {
        return response.data;
    } else {
        return undefined;
    }
}