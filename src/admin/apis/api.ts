import axios, { Axios } from "axios";

export default abstract class Api {
    protected readonly root: string;
    protected readonly baseUrl: string;
    protected readonly axios: Axios;

    constructor(url: string) {
        this.root = window.WPLKPath.api + "/lucky/v1";
        this.baseUrl = this.root + url;
        this.axios = axios.create({
            baseURL: this.baseUrl
        });

    }
}