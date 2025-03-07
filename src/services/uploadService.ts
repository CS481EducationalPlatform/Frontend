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

export const uploadYTvideo = async (
    params: UploadVideoI, 
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<UploadResponse> => {
    const { title, description, lesson_id, accessToken, playlist } = params;
    
    // Create form data to send to the backend
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description ? description : "");
    formData.append('lesson_id', lesson_id ? lesson_id : '1');
    formData.append('accessToken', accessToken);
    
    if (playlist) {
      formData.append('playlist', playlist);
    }
    
    if(onProgress){
        //Do Nothing I just need this to get rid of an error, but I need onProgress later
    }

    try {
      // First attempt - use server-side (Celery/Redis) upload
      const response = await fetch('/api/upload_video/', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      // If server responds with success
      if (response.status === 200) {
        return data;
      }
      
      // If server responds with 500, throw error to trigger fallback
      if (response.status === 500) {
        throw new Error(data.error || 'Server error during upload');
      }
      
      // For other error statuses
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
      } catch (error) {
        console.error("Upload failed", error);
      }
};
