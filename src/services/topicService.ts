import { api } from "./API";

export interface Topic {
    TopicID?: number;
    TopicName: string;
}

// Fetch all courses
export const getCourses = async () => {
    const response = await api.get<Topic[]>("/topics/");
    return response.data;
};

// Create a new course
export const createCourse = async (info: Topic) => {
    const response = await api.post<Topic>("/topics/", info);
    return response.data;
};

// Update a course
export const updateCourse = async (id: number, info: Topic) => {
    const response = await api.put<Topic>(`/topics/${id}/`, info);
    return response.data;
};

// Delete a course
export const deleteCourse = async (id: number) => {
    await api.delete(`/topics/${id}/`);
};
