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
    const response = await api.get<Course[]>("/courses");
    return response.data;
};

// Get a specific course
export const getCourse = async (id: number) => {
    const response = await api.get<Course>(`/courses/${id}`);
    return response.data;
};

// Get lessons for a specific course
export const getCourseLessons = async (courseId: number) => {
    const response = await api.get(`/courses/${courseId}/lessons`);
    return response.data;
};

// Create a new course
export const createCourse = async (course: Course) => {
    const response = await api.post<Course>("/courses", course);
    return response.data;
};

// Update a course
export const updateCourse = async (id: number, course: Course) => {
    const response = await api.put<Course>(`/courses/${id}`, course);
    return response.data;
};

// Delete a course
export const deleteCourse = async (id: number) => {
    await api.delete(`/courses/${id}`);
};
