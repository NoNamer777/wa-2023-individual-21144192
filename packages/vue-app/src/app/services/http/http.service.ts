import axios, { AxiosInstance } from 'axios';

export class HttpService {
    static get instance(): HttpService {
        if (!HttpService._instance) {
            HttpService._instance = new HttpService();
        }
        return HttpService._instance;
    }
    private static _instance: HttpService;

    private client: AxiosInstance;

    constructor() {
        this.client = axios.create();
    }

    async get<T>(url: string): Promise<T> {
        return (await this.client.get(url)).data;
    }

    async post<T, R>(url: string, body: T): Promise<R> {
        return (await this.client.post(url, body)).data;
    }

    async put<T>(url: string, body: T): Promise<T> {
        return (await this.client.put(url, body)).data;
    }

    async delete(url: string): Promise<void> {
        await this.client.delete(url);
    }
}
