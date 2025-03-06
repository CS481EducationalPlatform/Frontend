import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form';
import { Video, VideoUpdateData, fetchVideos, deleteVideo, updateVideo} from '../services/videoService'
import { Grid2 } from "@mui/material";

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

// Page styles
const pageStyles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        color: '#333'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '0'
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px'
    },
    uploadButton: {
        backgroundColor: '#4285f4',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center'
    },
    logoutButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    videoList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    videoItem: {
        display: 'flex',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    thumbnail: {
        width: '300px',
        maxHeight: '250px',
        objectFit: 'cover'
    },
    videoDetails: {
        flex: 1,
        padding: '16px'
    },
    videoTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '0',
        marginBottom: '8px'
    },
    videoDescription: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '16px'
    },
    actionButtons: {
        display: 'flex',
        gap: '8px'
    },
    editButton: {
        backgroundColor: '#4285f4',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    deleteButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    loadingText: {
        textAlign: 'center',
        fontSize: '16px',
        color: '#666'
    },
    errorText: {
        color: '#f44336',
        textAlign: 'center',
        padding: '16px',
        border: '1px solid #f44336',
        borderRadius: '4px',
        backgroundColor: '#ffebee'
    },
    noVideosText: {
        textAlign: 'center',
        fontSize: '16px',
        color: '#666'
    }
}

// Modal styles
const modalStyles = {
    overlay: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000'
    },
    modal: {
        width: '500px',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    modalHeader: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '16px',
        borderBottom: '1px solid #eee',
        paddingBottom: '8px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    label: {
        fontSize: '14px',
        fontWeight: 'bold'
    },
    input: {
        padding: '8px 12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px'
    },
    errorMessage: {
        color: '#f44336',
        fontSize: '12px',
        marginTop: '4px'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
        marginTop: '16px'
    },
    cancelButton: {
        backgroundColor: '#9e9e9e',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    submitButton: {
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    disabledButton: {
        opacity: '0.7',
        cursor: 'not-allowed'
    },
    successMessage: {
        backgroundColor: '#e8f5e9',
        color: '#2e7d32',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '16px'
    },
    errorResult: {
        backgroundColor: '#ffebee',
        color: '#c62828',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '16px'
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

    //Fetch on mount
    useEffect(() => {
        fetchVideos(setLoading, setError, setVideos);
    }, [])

    return (
        <div style={pageStyles.container}>
            <div style={pageStyles.header}>
                <h1 style={pageStyles.title}>{translations[language].welcome}{username}!</h1>
                <div style={pageStyles.buttonContainer}>
                    <button 
                        style={pageStyles.uploadButton} 
                        onClick={() => navigate("/upload")}
                    >
                        + {translations[language].upload}
                    </button>
                    <button 
                        style={pageStyles.logoutButton} 
                        onClick={handleLogout}
                    > 
                        {translations[language].logout}
                    </button>
                </div>
            </div>

            <h1 style={pageStyles.title}>YouTube Video Manager</h1>

            {loading && <p style={pageStyles.loadingText}>Loading Videos...</p>}

            {error && (
                <div style={pageStyles.errorText}>{error}</div>
            )}

            {!loading && videos.length === 0 && (
                <p style={pageStyles.noVideosText}>No Videos Found.</p>
            )}

            <div style={pageStyles.videoList}>
                {videos.map(video => (
                    <div style={pageStyles.videoItem} key={video.id}>
                        <div>
                            <img 
                                src={video.thumbnail_url} 
                                alt={video.title} 
                                style={pageStyles.thumbnail}
                            />
                        </div>
                        <div style={pageStyles.videoDetails}>
                            <h2 style={pageStyles.videoTitle}>{video.title}</h2>
                            <p style={pageStyles.videoDescription}>{video.description}</p>
                            <div style={pageStyles.actionButtons}>
                                <button 
                                    style={pageStyles.editButton} 
                                    onClick={() => openUpdateModal(video)}
                                >
                                    Edit
                                </button>
                                <button 
                                    style={pageStyles.deleteButton} 
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
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.modal}>
                        <h2 style={modalStyles.modalHeader}>
                            Update Video
                        </h2>

                        {actionResult && (
                            <div style={actionResult.status >= 400 ? modalStyles.errorResult : modalStyles.successMessage}>
                                {actionResult.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onUpdateSubmit)} style={modalStyles.form}>
                            <div style={modalStyles.formGroup}>
                                <label style={modalStyles.label}>Title</label>
                                <input
                                    style={modalStyles.input}
                                    {...register('title', {required: 'Title Required'})}
                                />
                                {errors.title && <p style={modalStyles.errorMessage}>{errors.title.message}</p>}
                            </div>
                            <div style={modalStyles.formGroup}>
                                <label style={modalStyles.label}>Tags (comma seperated)</label>
                                <input
                                    style={modalStyles.input}
                                    {...register('tags')}
                                />
                            </div>
                            <div style={modalStyles.buttonGroup}>
                                <button
                                    type="button"
                                    onClick={() => setIsUpdateModalOpen(false)}
                                    disabled={actionInProgress}
                                    style={{
                                        ...modalStyles.cancelButton,
                                        ...(actionInProgress ? modalStyles.disabledButton : {})
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={actionInProgress}
                                    style={{
                                        ...modalStyles.submitButton,
                                        ...(actionInProgress ? modalStyles.disabledButton : {})
                                    }}
                                >
                                    {actionInProgress ? 'Updating...' : 'Update Video'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && selectedVideo && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.modal}>
                        <h2 style={modalStyles.modalHeader}>
                            Confirm Deletion
                        </h2>
                        
                        {actionResult && (
                            <div style={actionResult.status >= 400 ? modalStyles.errorResult : modalStyles.successMessage}>
                                {actionResult.message}
                            </div>
                        )}
                        
                        <p style={{ marginBottom: '20px' }}>
                            Are you sure you want to delete <strong>{selectedVideo.title}</strong>?
                        </p>
                        
                        <div style={modalStyles.buttonGroup}>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                disabled={actionInProgress}
                                style={{
                                    ...modalStyles.cancelButton,
                                    ...(actionInProgress ? modalStyles.disabledButton : {})
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => deleteVideo(selectedVideo.youtube_url, setActionInProgress, setActionResult, setIsDeleteModalOpen, setLoading, setError, setVideos)}
                                type="submit"
                                disabled={actionInProgress}
                                style={{
                                    ...modalStyles.deleteButton,
                                    ...(actionInProgress ? modalStyles.disabledButton : {})
                                }}
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