import { youtube } from "./API";

export interface Video {
    id: string;
    title: string;
    description: string;
    youtube_url: string;
    thumbnail_url: string;
    tags: string[];
    published_at: string;
}

export interface VideoUpdateData {
    title:string;
    description:string;
    tags:string[];
    categoryId?:string;
    privacyStatus?: 'private' | 'public' | 'unlisted';
}

export interface APIResponse {
    success: boolean;
    videos?: Video[];
    error?: string;
    message?: string;
}

//Handle API response
export const handleAPIResponse = async (response: Response): Promise<APIResponse> => {
    if (!response.ok){
        try{
            const errorData = await response.json();
            return {
                success: false,
                error: errorData.error || `Error: ${response.status} ${response.statusText}`
            };
        } catch (e) {
            return {
                success: false,
                error: `Error: ${response.status} ${response.statusText}`
            }
        }
    }

    try {
        return await response.json();
    } catch (e) {
        return {
            success: false,
            error: 'Failed to Parse Response'
        }
    }
}

//Function to fetch video from backend
export const fetchVideos = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>, setError:React.Dispatch<React.SetStateAction<string | null>>, setVideos:React.Dispatch<React.SetStateAction<Video[]>>) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("access_token");
    if (!token){
        setError("No Access Token Found. Please Re-Authenticate")
        setLoading(false);
        return;
    }

    try {
        console.log('Fetching videos from: http://127.0.0.1:8001/youtube/videos')
        console.log('Using token: ', token.substring(0, 5) + '...')

        const response = await youtube.get('videos/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log("Fetch Video Response ", response)

        if(response.data.videos.length >= 1){
            setVideos(response.data.videos)
        }

        return response;

    } catch (err) {
        setError('Failed to fetch videos');
        console.error('err', err);
    } finally {
        setLoading(false);
    }
}

//Function to delete a youtube video
export const deleteVideo = async (youtubeUrl: string, setActionInProgress:React.Dispatch<React.SetStateAction<boolean>>, setActionResult:React.Dispatch<React.SetStateAction<{success:boolean;message:string;} | null>>, setIsDeleteModalOpen:React.Dispatch<React.SetStateAction<boolean>>, setLoading:React.Dispatch<React.SetStateAction<boolean>>, setError:React.Dispatch<React.SetStateAction<string | null>>, setVideos:React.Dispatch<React.SetStateAction<Video[]>>) => {
    setActionInProgress(true);

    const token = localStorage.getItem("access_token");
    if (!token){
        setActionResult({
            success: false,
            message: 'No Access Token Found. Please Re-Authenticate with YouTube'
        })
        setActionInProgress(false);
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8001/youtube/delete/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({youtube_url: youtubeUrl}),
        });

        const result = await handleAPIResponse(response);

        setActionResult({
            success: result.success,
            message: result.message || result.error || (result.success ? 'Video Deleted' : "Failed to Delete Video")
        })

        if(result.success){
            setTimeout(() => {
                setIsDeleteModalOpen(false);
                fetchVideos(setLoading, setError, setVideos);
            }, 1000)
        }
    } catch (err) {
        setActionResult({success: false, message: 'Video Deletion Failed'});
        console.error(err);
    } finally {
        setActionInProgress(false);
    }
  }

//Function to update a youtube video
export const updateVideo = async (youtubeUrl:string, data:VideoUpdateData, setActionInProgress:React.Dispatch<React.SetStateAction<boolean>>, setActionResult:React.Dispatch<React.SetStateAction<{success: boolean; message: string;} | null>>, setIsUpdateModalOpen:React.Dispatch<React.SetStateAction<boolean>>, setLoading:React.Dispatch<React.SetStateAction<boolean>>, setError:React.Dispatch<React.SetStateAction<string | null>>, setVideos:React.Dispatch<React.SetStateAction<Video[]>>) => {
    setActionInProgress(true);

    const token = localStorage.getItem("access_token");
    if (!token){
        setActionResult({
            success: false,
            message: 'No Access Token Found. Please Re-Authenticate with YouTube'
        })
        setActionInProgress(false);
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8001/youtube/update/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                youtube_url: youtubeUrl,
                ...data
            }),
        });

        const result = await handleAPIResponse(response);
        
        setActionResult({
            success: result.success,
            message: result.message || result.error || (result.success ? 'Video Updated' : "Failed to Update Video")
        })

        if(result.success){
            setTimeout(() => {
                setIsUpdateModalOpen(false);
                fetchVideos(setLoading, setError, setVideos);
            }, 1000)
        }
    } catch (err){
        setActionResult({success:false, message: 'Video Update Failed'});
        console.error(err);
    } finally {
        setActionInProgress(false);
    }
}
