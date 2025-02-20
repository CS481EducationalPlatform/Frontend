import { api } from "./API";

export interface Uploaded {
    PageID: number;
    FileID?: number;
    FileOrURL: Blob | string;
}

// Fetch all courses
export const getCourses = async () => {
    const response = await api.get<Uploaded[]>("/uploaded/");
    return response.data;
};

// Create a new course
export const createCourse = async (info: Uploaded) => {
    const response = await api.post<Uploaded>("/uploaded/", info);
    return response.data;
};

// Update a course
export const updateCourse = async (id: number, info: Uploaded) => {
    const response = await api.put<Uploaded>(`/uploaded/${id}/`, info);
    return response.data;
};

// Delete a course
export const deleteCourse = async (id: number) => {
    await api.delete(`/uploaded/${id}/`);
};
