import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form';
import "../styles/AccountPage.css";
import "../styles/Pages.css";
import "../styles/ModifyPage.css";
import { Video, VideoUpdateData, fetchVideos, deleteVideo, updateVideo} from '../services/videoService'

interface ModifyPageProps {
    language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const translations = {
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

const AccountPage: React.FC<ModifyPageProps> = ({ language, setIsLoggedIn }) => {
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

    const callMulti = (...functions: React.SetStateAction<any>[]) => (event:any) => {
        const value = event.target.value;
        functions.forEach((func) => func(value));
    }

    //Fetch on mount
    useEffect(() => {
        fetchVideos(setLoading, setError, setVideos);
    }, [])

    return (
        <div className="account-page">
            <div className="header-container">
                <h1 className="page-title">{translations[language].welcome}{username}!</h1>
                <div className="button-container">
                    <button 
                        className="upload-button" 
                        onClick={() => navigate("/upload")}
                    >
                        + {translations[language].upload}
                    </button>
                    <button 
                        className="logout-button" 
                        onClick={handleLogout}
                    > 
                        {translations[language].logout}
                    </button>
                </div>
            </div>
            <div className="list-container">

                <h1 className="page-title">YouTube Video Manager</h1>

                {loading && <p className="loading-text">Loading Videos...</p>}

                {error && (
                    <div className="error-message">{error}</div>
                )}

                {!loading && videos.length === 0 && (
                    <p className="no-videos-text">No Videos Found.</p>
                )}

                <div className="video-list">
                    {videos.map(video => (
                        <div className="video-item" key={video.id}>
                            <div>
                                <img 
                                    src={video.thumbnail_url} 
                                    alt={video.title} 
                                    className="video-thumbnail"
                                />
                            </div>
                            <div className="video-details">
                                <h2 className="video-title">{video.title}</h2>
                                <Link className="video-url" to={video.youtube_url}>{video.youtube_url}</Link>
                                <p className="video-description">{video.description}</p>
                                <div className="action-buttons">
                                    <button 
                                        className="edit-button" 
                                        onClick={() => openUpdateModal(video)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="delete-button" 
                                        onClick={() => openDeleteModal(video)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {isUpdateModalOpen && selectedVideo && (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <h2 className="modal-header">
                                Update Video
                            </h2>

                            {actionResult && (
                                <div className={actionResult.status >= 400 ? "error-result" : "success-message"}>
                                    {actionResult.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onUpdateSubmit)} className="modal-form">
                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input
                                        className="form-input"
                                        {...register('title', {required: 'Title Required'})}
                                    />
                                    {errors.title && <p className="form-error">{errors.title.message}</p>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Tags (comma seperated)</label>
                                    <input
                                        className="form-input"
                                        {...register('tags')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <input
                                        className="form-input"
                                        {...register('description')}
                                    />
                                </div>
                                <div className="modal-button-group">
                                    <button
                                        type="button"
                                        onClick={() => callMulti(setIsUpdateModalOpen(false), setActionResult(null))}
                                        disabled={actionInProgress}
                                        className={`cancel-button ${actionInProgress ? 'button-disabled' : ''}`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={actionInProgress}
                                        className={`submit-button ${actionInProgress ? 'button-disabled' : ''}`}
                                    >
                                        {actionInProgress ? 'Updating...' : 'Update Video'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isDeleteModalOpen && selectedVideo && (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <h2 className="modal-header">
                                Confirm Deletion
                            </h2>
                            
                            {actionResult && (
                                <div className={actionResult.status >= 400 ? "error-result" : "success-message"}>
                                    {actionResult.message}
                                </div>
                            )}
                            
                            <p className="delete-question">
                                Are you sure you want to delete <strong>{selectedVideo.title}</strong>?
                            </p>
                            
                            <div className="modal-button-group">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    disabled={actionInProgress}
                                    className={`cancel-button ${actionInProgress ? 'button-disabled' : ''}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => deleteVideo(selectedVideo.youtube_url, setActionInProgress, setActionResult, setIsDeleteModalOpen, setLoading, setError, setVideos)}
                                    type="submit"
                                    disabled={actionInProgress}
                                    className={`delete-button ${actionInProgress ? 'button-disabled' : ''}`}
                                >
                                    {actionInProgress ? 'Deleting...' : 'Delete Video'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountPage;