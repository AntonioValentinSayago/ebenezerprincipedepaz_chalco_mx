import { isAxiosError } from "axios";
import api from "../config/axios";
import { ApiResponse, CreateMemberRequest, Usuario } from "../types/UserEbenzer";

export async function getUserEbenezer() {
    try {
        const { data } = await api.get<ApiResponse<Usuario>>('/ebenezer')
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export async function updateUserEbenezer(memberId: number) {
    try {
        const { data } = await api.patch<ApiResponse<Usuario>>(`/ebenezer/member/${memberId}/toggle-coverage`)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export async function getUserEbenezerById(memberId: number) {
    try {
        const { data } = await api.get<ApiResponse<Usuario>>(`/ebenezer/member/${memberId}`)
        return data.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export const createMember = async (
    payload: CreateMemberRequest
) => {
    const { data } = await api.post(
        '/api/members',
        payload
    );

    return data;
};