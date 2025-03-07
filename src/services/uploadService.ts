import axios from 'axios';
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

export interface UploadResponse {
    message: string;
    filename?: string;
    error?: string;
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
        /*
        const response = await upload.post("video/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        */

        const response = await fetch('/api/upload_video/', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();

        if (response.status === 200) {
            return data;
        }
        if (response.status === 500) {
            throw new Error(data.error || 'Server error during upload');
        }
        return {
            error: data.error || `Server responded with status ${response.status}`,
            message: 'Upload failed'
        };
        } catch (error) {
            console.error('Upload error:', error);
            // Return the error response to allow fallback
            return {
                error: error instanceof Error ? error.message : 'Unknown upload error',
                message: 'Upload failed'
            };
        }
};

export const directUploadYTvideo = async (info: UploadVideoI, file: File) => {
    console.log("Direct Upload using System Resources")

    const title = info.title;
    const description = info.description;
    //const lesson_id = info.lesson_id;
    //const playlist = info.playlist;
    const access_token = info.accessToken;

    const metadata = {
        snippet:{
            title:title,
            description:description,
            tags:["react", 'api', 'babushka'],
            categoryId: "27",
        },
        status:{
            madeForKids:false,
            privacyStatus: "public",
        }
    }

    const formData = new FormData();
    formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    formData.append("file", file);

    try {
        const response = await axios.post(
          "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
          formData,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log("Upload successful!", response.data);

        return response.data
      } catch (error) {
        console.error("Upload failed", error);
        return null;
      }
};
