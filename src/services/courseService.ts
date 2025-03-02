import { api } from "./API";

export interface Course {
    CourseID?: number;
    CourseName: string;
    CourseDescription: string;
    TopicID: number;
    UserID: number;
    IsApproved: boolean;
}

// Fetch all courses
export const getCourses = async () => {
    const response = await api.get<Course[]>("/courses/");
    return response.data;
};

// Create a new course
export const createCourse = async (course: Course) => {
    const response = await api.post<Course>("/courses/", course);
    return response.data;
};

// Update a course
export const updateCourse = async (id: number, course: Course) => {
    const response = await api.put<Course>(`/courses/${id}/`, course);
    return response.data;
};

// Delete a course
export const deleteCourse = async (id: number) => {
    await api.delete(`/courses/${id}/`);
};
