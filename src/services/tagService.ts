import { api } from "./API";

export interface Tag {
    TagID?: number;
    TagName: string;
}

// Fetch all courses
export const getCourses = async () => {
    const response = await api.get<Tag[]>("/tags/");
    return response.data;
};

// Create a new course
export const createCourse = async (info: Tag) => {
    const response = await api.post<Tag>("/tags/", info);
    return response.data;
};

// Update a course
export const updateCourse = async (id: number, info: Tag) => {
    const response = await api.put<Tag>(`/tags/${id}/`, info);
    return response.data;
};

// Delete a course
export const deleteCourse = async (id: number) => {
    await api.delete(`/tags/${id}/`);
};
