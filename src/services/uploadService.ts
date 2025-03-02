import { upload } from './API'

export interface UploadVideoI {
    title: string;
    description?: string;
    lesson_id?: string;
    accessToken:string;
    playlist?: string;
}

export interface LinkVideoI {
    lesson_id: string;
    video_url: string;
}

export const ensurePlaylistExists = async (playlist_name: string, accessToken: string) => {
    console.log("Ensure Playlist called in services");
    
    const formData = new FormData();
    formData.append("playlist_name", playlist_name);
    formData.append("access_token", accessToken);

    try {
        const response = await upload.post("playlist/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Playlist Ensure Response ", response)
        return response;
    } catch (error) {
        console.log("Playlist Ensure Failure ", error)
        throw error;
    }
}

export const linkYTvideo = async (info: LinkVideoI) => {
    console.log("Link called in services:", info);

    const formData = new FormData();
    formData.append("lesson_id", info.lesson_id);
    formData.append("video_url", info.video_url);

    try {
        const response = await upload.post("link/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Linker Response : ", response)
        return response;
    } catch (error) {
        console.error("Link Error : ", error);
        throw error;
    }
}

export const uploadYTvideo = async (info: UploadVideoI, file: File) => {
    console.log("Upload called in services:", info, file);

    const formData = new FormData();
    formData.append("file", file); // Append the file
    formData.append("title", info.title);
    formData.append("description", !info.description ? "" : info.description);
    formData.append("lesson_id", !info.lesson_id ? "" : info.lesson_id);
    formData.append("playlist", !info.playlist ? "" : info.playlist);
    formData.append("accessToken", info.accessToken);

    try {
        const response = await upload.post("video/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Upload Response:", response);
        return response;
    } catch (error) {
        console.error("Upload Error (FE):", error);
        throw error;
    }
};
