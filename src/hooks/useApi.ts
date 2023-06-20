import axios, { AxiosInstance } from 'axios';
import { env } from '../config/env';

type HttpResponse = {
    status: number;
    data: any;
}

class Api {
    private instace: AxiosInstance;
    constructor(provider = axios) {
        this.instace = provider.create({
            baseURL: `${env.base_url}:8080`
        });
    }

    async getVacancyCoordsByVacancyNumber(vacancyNumber: string): Promise<HttpResponse> {
        try {
            const response = await this.instace.get(`/search/number/${vacancyNumber}`);
            return {
                data: response.data,
                status: response.status
            }
        } catch (error) {
            const response = (<any>error).response;
            return {
                status: response?.status || 500,
                data: response.data
            } 
        } 
    }

    async getVacancyCoordsByVehicleId(vehicleId: string): Promise<HttpResponse> {
        try {
            const response = await this.instace.get(`/search/vehicle/${vehicleId}`);
            console.log({ response });
            return {
                data: response.data,
                status: response.status
            }
        } catch (error) {
            const response = (<any>error).response;
            return {
                status: response?.status || 500,
                data: response.data
            } 
        } 
    }
}

export default new Api;