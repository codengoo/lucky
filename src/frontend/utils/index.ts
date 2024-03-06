//@ts-nocheck

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
    try {
        const url = window.WPLKPathx.api + "/lucky/v1/get";
        if (!id) throw new Error("Id not specified");
        
        console.log(id, password);
        const response = await axios.get<IResponse>(url, {
            params: {
                id: id,
                password: password
            }
        })

        if (response.status == 200) {
            return response.data;
        } else {
            return;
        }
    } catch (error) {
        console.log(error.message);
        
        return;
    }
}