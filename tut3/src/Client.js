import * as axios from "axios"
import config  from "./config"


export default class HttpClient {
    constructor(baseUrl=config.API_ROOT, baseToken=config.DEFAULT_AUTH_TOKEN) {
        this.client = axios.create({
            baseURL: baseUrl,
            timeout: 5000,
            headers: {'Authorization': `Basic ${baseToken}`, 'Content-Type': "application/json"},
        })
    }

    async echo() {
        return await this.client.get("/echo/")
    }

    async verifySecret () {
        const resp = await this.client.get("/secret/")
        const secret = resp.data.data.secret
        return secret === config.SECRET_MSG
    }

    async parrot (payload) {
        const resp = await this.client.post("/parrot/", {message: payload})
        return resp.data.data.message
    }
}