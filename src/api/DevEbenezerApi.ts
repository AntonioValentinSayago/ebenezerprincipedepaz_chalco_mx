import { isAxiosError } from "axios";
import api from "../config/axios";
import { UsuarioAPI } from "../types/UserEbenzer"; 

export async function getUserEbenezer () {
    try {
        const { data } = await api<UsuarioAPI>('/ebenezer')
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export async function updateUserEbenezer (memberId: number) {
    try {
        const { data } = await api.patch<UsuarioAPI>(`/ebenezer/member/${memberId}/toggle-coverage`)
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}
