import { api } from "./API";

export interface Page {
    LessonID: number;
    PageID?: number;
    PageName: string;
    PageDescription: string;
}

// Fetch all courses
export const getCourses = async () => {
    const response = await api.get<Page[]>("/pages/");
    return response.data;
};

// Create a new course
export const createCourse = async (info: Page) => {
    const response = await api.post<Page>("/pages/", info);
    return response.data;
};

// Update a course
export const updateCourse = async (id: number, info: Page) => {
    const response = await api.put<Page>(`/pages/${id}/`, info);
    return response.data;
};

// Delete a course
export const deleteCourse = async (id: number) => {
    await api.delete(`/pages/${id}/`);
};
