import { api } from "./API";

export interface Lesson {
    CourseID: number;
    LessonID?: number;
    LessonName: string;
    LessonDescription: string;
}

// Fetch all courses
export const getCourses = async () => {
    const response = await api.get<Lesson[]>("/lessons/");
    return response.data;
};

// Create a new course
export const createCourse = async (info: Lesson) => {
    const response = await api.post<Lesson>("/lessons/", info);
    return response.data;
};

// Update a course
export const updateCourse = async (id: number, info: Lesson) => {
    const response = await api.put<Lesson>(`/lessons/${id}/`, info);
    return response.data;
};

// Delete a course
export const deleteCourse = async (id: number) => {
    await api.delete(`/lessons/${id}/`);
};
