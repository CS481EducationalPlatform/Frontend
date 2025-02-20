import { upload } from './API'

export interface UploadVideoI {
    title: string;
    description?: string;
    user_id?: string;
    course_id?:string;
    page_id?:string;
    accessToken:string;
}

export interface TaskStatus {
    task_id: string
    status?: any
    result?: any
    response?:any
}

export const checkTaskStatus = async (taskID:string) => {
    try {
        const response = await upload.get<TaskStatus>(`/status/${taskID}/`);
        return response.data;
    } catch (error) {
        console.log("Error checking task status of task : ", taskID, " : ", error)
    }
}

export const uploadYTvideo = async (info: UploadVideoI, file: File) => {
    console.log("Upload called in services:", info, file);

    const formData = new FormData();
    formData.append("file", file); // Append the file
    formData.append("title", info.title);
    formData.append("description", !info.description ? "" : info.description);
    formData.append("user_id", !info.user_id ? "" : info.user_id);
    formData.append("course_id", !info.course_id ? "" : info.course_id);
    formData.append("page_id", !info.page_id ? "" : info.page_id);
    formData.append("accessToken", info.accessToken);

    try {
        const response = await upload.post("video/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        /*
        const response_data = await response.data;
        const interval = setInterval(async () => {
            const status = await checkTaskStatus(response_data.task_id)
            if (status && (status.status === "SUCCESS" || status.status === "FAILURE")){
                clearInterval(interval);
                console.log("Task Results: ", status);
            }
        }, 2500);
        */

        console.log("Upload Response:", response);
        return response;
    } catch (error) {
        console.error("Upload Error (FE):", error);
        throw error;
    }
};
