import { api } from "./API";

export interface UserInfo {
    UserID?: number;
    Email: string;
    Password: string;
    IsTeacher: boolean;
}

// Fetch all courses
export const getUserInfo = async () => {
    const response = await api.get<UserInfo[]>("/userinfo/");
    return response.data;
};

// Create a new course
export const createUserInfo = async (info: UserInfo) => {
    const response = await api.post<UserInfo>("/userinfo/", info);
    return response.data;
};

// Update a course
export const updateUserInfo = async (id: number, info: UserInfo) => {
    const response = await api.put<UserInfo>(`/userinfo/${id}/`, info);
    return response.data;
};

// Delete a course
export const deleteUserInfo = async (id: number) => {
    await api.delete(`/userinfo/${id}/`);
};
