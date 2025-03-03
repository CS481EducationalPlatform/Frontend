import { api } from "./API";

export interface Lesson {
    CourseID: number;
    LessonID?: number;
    LessonName: string;
    LessonDescription: string;
}

// Fetch all lessons
export const getLessons = async () => {
    const response = await api.get<Lesson[]>("/lessons");
    return response.data;
};

// Get a specific lesson
export const getLesson = async (id: number) => {
    const response = await api.get<Lesson>(`/lessons/${id}`);
    return response.data;
};

// Create a new lesson
export const createLesson = async (lesson: Lesson) => {
    const response = await api.post<Lesson>("/lessons", lesson);
    return response.data;
};

// Update a lesson
export const updateLesson = async (id: number, lesson: Lesson) => {
    const response = await api.put<Lesson>(`/lessons/${id}`, lesson);
    return response.data;
};

// Delete a lesson
export const deleteLesson = async (id: number) => {
    await api.delete(`/lessons/${id}`);
};
