import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form';
import "../styles/AccountPage.css";
import "../styles/Pages.css";
import { Video, VideoUpdateData, fetchVideos, deleteVideo, updateVideo} from '../services/videoService'
import { Grid2 } from "@mui/material";

interface ModifyPageProps {
    language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
    setIsLoggedIn: (isLoggedIn: boolean) => void;
  }
  const translations ={

    en:{
        logout: "Logout",
        welcome: "Welcome ",
        upload: "Upload",
        modify: "Modify"
    },
    ru:{
        logout: "Выйти",
        welcome: "Добро пожаловать ",
        upload: "Загрузить",
        modify: "Модифицировать"
    },

    es: {
        logout: "Cerrar Sesión",
        welcome: "Bienvenido ",
        upload: "Subir",
        modify: "Modificar"
    },

    fr: {
        logout: "Se déconnecter",
        welcome: "Bienvenue ",
        upload: "Télécharger",
        modify: "Modifier"
    },

    uk: {
        logout: "Вийти",
        welcome: "Ласкаво просимо ",
        upload: "Завантажити",
        modify: "Змінити"
    }

}

const AccountPage: React.FC<ModifyPageProps> = ({ language, setIsLoggedIn }) =>{
  const username = localStorage.getItem("username") || "Guest";
  const navigate = useNavigate();

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [actionInProgress, setActionInProgress] = useState<boolean>(false);
  const [actionResult, setActionResult] = useState<{status:number; message:string} | null>(null);

  const { register, handleSubmit, setValue, formState: {errors}} = useForm<VideoUpdateData>();

  //Function to open update modal and populate form with current video data
  const openUpdateModal = (video: Video) => {
    setSelectedVideo(video);
    setValue('title', video.title);
    setValue('description', video.description);
    setValue('tags', video.tags);
    setIsUpdateModalOpen(true);
  }

  //Function to open delete confirmation
  const openDeleteModal = (video: Video) => {
    setSelectedVideo(video);
    setIsDeleteModalOpen(true);
  }

  //Handle form submission for updating video
  const onUpdateSubmit = (data: VideoUpdateData) => {
    if(selectedVideo){
        updateVideo(selectedVideo.youtube_url, data, setActionInProgress, setActionResult, setIsUpdateModalOpen, setLoading, setError, setVideos);
    }
  }

  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username"); // Clear username on logout
  localStorage.removeItem("access_token");
  localStorage.removeItem("id_token");
  setIsLoggedIn(false);
  navigate("/login");
  };

  //Fetch on mount
  useEffect(() => {
    fetchVideos(setLoading, setError, setVideos);
  }, [])

  return (
    <div className="modify-page">
      <h1> {translations[language].welcome}{username}!</h1>


      <button className="upload-page-button" onClick={() => navigate("/upload")}>
       + {translations[language].upload}
      </button>

      <button className="logout-button" onClick={handleLogout}> 
      {translations[language].logout}
      </button>

      {/* List of Videos for Account */}
      {/* Pull for account based on tracked id */}
      {/* Edit login code to add db result to localstorage for use */}
      {/* Modify and Delete Buttons next to list */}
      {/* Element to modify within */}
      {/* ACTUALLY ADD FILES */}

      <h1>YouTube Video Manager</h1>

      {loading && <p>Loading Videos...</p>}

      {error &&
        (<div>{error}</div>)
      }

      {!loading && videos.length === 0 &&
        (<p>No Videos Found.</p>)
      }

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Grid2 container direction="column" spacing={2} sx={{ overflowY: "auto", height: '70vh', maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
            {videos.map(video => (
                <Grid2 container direction="row" spacing={2} key={video.id} sx={{width: '100%', marginBottom: '16px'}}>
                    <Grid2>
                        <img src={video.thumbnail_url} alt={video.title} style={{width: '300px', maxHeight: '250px', objectFit: 'cover'}}/>
                    </Grid2>
                    <Grid2 container direction="column" spacing={1} sx={{ flex: 1 }}>
                        <Grid2>
                            <h2>{video.title}</h2>
                        </Grid2>
                        <Grid2>
                            <p>{video.description}</p>
                        </Grid2>
                        <Grid2>
                            <div>
                                <button onClick={() => openUpdateModal(video)} style={{ marginRight: '8px' }}>
                                    Edit
                                </button>
                                <button onClick={() => openDeleteModal(video)}>
                                    Delete
                                </button>
                            </div>
                        </Grid2>
                    </Grid2>
                </Grid2>
            ))}
        </Grid2>
      </div>

      {isUpdateModalOpen && selectedVideo && (
        <div style={{position:'absolute', left:'35vw', top:'35vh', width:'30vw', height:'30vh', background:'black', justifyContent:'center', alignContent:'center', borderRadius:'5vw', border:'0.5vh solid white'}}>
            <div>
                <h2>
                    Update Video
                </h2>

                {actionResult && (
                    <div>
                        {actionResult.message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onUpdateSubmit)}>
                    <div>
                        <label>Title</label>
                        <input
                            {...register('title', {required: 'Title Required'})}
                        />
                        {errors.title && <p>{errors.title.message}</p>}
                    </div>
                    <div>
                        <label>Tags (comma seperated)</label>
                        <input
                            {...register('tags')}
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => setIsUpdateModalOpen(false)}
                            disabled={actionInProgress}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={actionInProgress}
                        >
                            {actionInProgress ? 'Updating...' : 'Update Video'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {isDeleteModalOpen && selectedVideo && (
        <div style={{position:'absolute', left:'35vw', top:'35vh', width:'30vw', height:'30vh', background:'black', justifyContent:'center', alignContent:'center', borderRadius:'5vw', border:'0.5vh solid white'}}>
            <div>
                <h2>
                    Confirm Deletion
                </h2>
                {actionResult && (
                    <div>
                        {actionResult.message}
                    </div>
                )}
                <p>
                    Are you sure you want to delete <strong>{selectedVideo.title}</strong>?
                </p>
                <div>
                    <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        disabled={actionInProgress}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => deleteVideo(selectedVideo.youtube_url, setActionInProgress, setActionResult, setIsDeleteModalOpen, setLoading, setError, setVideos)}
                        type="submit"
                        disabled={actionInProgress}
                    >
                        {actionInProgress ? 'Deleting...' : 'Delete Video'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;