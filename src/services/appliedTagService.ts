import { api } from "./API";

export interface AppliedTag {
    CourseID: number;
    TagID: number;
}

// Fetch all courses
export const getCourses = async () => {
    const response = await api.get<AppliedTag[]>("/appliedtags/");
    return response.data;
};

// Create a new course
export const createCourse = async (info: AppliedTag) => {
    const response = await api.post<AppliedTag>("/appliedtags/", info);
    return response.data;
};

// Update a course
export const updateCourse = async (id: number, info: AppliedTag) => {
    const response = await api.put<AppliedTag>(`/appliedtags/${id}/`, info);
    return response.data;
};

// Delete a course
export const deleteCourse = async (id: number) => {
    await api.delete(`/appliedtags/${id}/`);
};
