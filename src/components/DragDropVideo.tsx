import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import UploadIcon from "@mui/icons-material/Upload";
import { SvgIcon } from "@mui/material";
import { gapi } from "gapi-script";
import CircularProgress from "@mui/material/CircularProgress";

function DragDropVideo() {
  const fileTypes = ["mov", "mp4", "mpg", "mpeg4"];
  const [file, setFile] = useState(null);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(<></>);
  const [uploadUrl, setUploadUrl] = useState(null);  // Track resumable URL
  const CLIENT_ID = "178516670715-5l32e4c5lanhgvn8iv7sa7r23l57o2qq.apps.googleusercontent.com";

  useEffect(() => {
    // Check if there's a resumable upload URL in localStorage
    const savedUploadUrl = localStorage.getItem("resumableUploadUrl");
    if (savedUploadUrl) {
      setUploadUrl(savedUploadUrl);
      setIsUploading(true);  // Indicate that an upload is in progress
      continueUpload(savedUploadUrl);  // Attempt to continue the upload
    }

    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "https://www.googleapis.com/auth/youtube.upload",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const handleSignIn = async () => {
    const auth = gapi.auth2.getAuthInstance();
    await auth.signIn();
    return auth.currentUser.get().getAuthResponse().access_token;
  };

  const handleChange = (file) => {
    setHasUploaded(true);
    setErrorMessage(<></>);
    setFile(file);
    console.log(file);
  };

  const continueUpload = async (savedUploadUrl) => {
    try {
      const response = await fetch(savedUploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file["type"],
          "Content-Length": file["size"],
        },
        body: file,  // Upload the file
      });

      if (response.ok) {
        setIsUploading(false);
        localStorage.removeItem("resumableUploadUrl");  // Clear the URL from localStorage
        alert("Video uploaded successfully!");
      } else {
        throw new Error("Video upload failed. Check response.");
      }
    } catch (error) {
      setIsUploading(false);
      if(file != null){
        console.error("Error continuing video upload:", error);
        alert("Error continuing video upload. Check console for details.");
      }
    }
  };

  const uploadToYouTube = async () => {
    if (!file) return alert("Please upload a file first!");

    setIsUploading(true);

    try {
      const token = await handleSignIn();
      gapi.client.setToken({ access_token: token });

      const metadata = {
        snippet: {
          title: "last temp test",
          description: "This video was uploaded via the YouTube API!",
          tags: ["react", "youtube", "upload"],
          category: "27",
        },
        status: {
          privacyStatus: "public",
          madeForKids: false,
        },
      };

      // Step 1: Initiate the resumable upload session
      const initResponse = await gapi.client.request({
        path: "https://www.googleapis.com/upload/youtube/v3/videos",
        method: "POST",
        params: {
          part: "snippet,status",
          uploadType: "resumable",
        },
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata),
      });

      const resumableUrl = initResponse.headers.location;
      if (!resumableUrl) {
        throw new Error("Failed to get the resumable upload URL.");
      }

      // Save the resumable upload URL to localStorage for continuation on revisit
      localStorage.setItem("resumableUploadUrl", resumableUrl);
      setUploadUrl(resumableUrl);

      // Step 2: Upload the video file
      const uploadResponse = await fetch(resumableUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file["type"],
          "Content-Length": file["size"],
        },
        body: file,  // Upload the file
      });

      if (!uploadResponse.ok) {
        throw new Error("Video upload failed. Check response.");
      }

      setIsUploading(false);
      localStorage.removeItem("resumableUploadUrl");  // Clear the URL from localStorage
      alert("Video uploaded successfully!");
    } catch (error) {
      setIsUploading(false);
      if(file != null){
        console.error("Error uploading video:", error);
        alert("Error uploading video. Check console for details.");
      }
    }
  };

  return (
    <>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        maxSize={256000}
      >
        <div
          style={{
            height: 200,
            width: 200,
            border: "2px solid " + (hasUploaded ? "green" : "red"),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
          }}
        >
          <SvgIcon
            component={UploadIcon}
            style={{
              position: "relative",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              color: hasUploaded ? "green" : "red",
              opacity: "20%",
            }}
          />
          <div style={{ position: "absolute" }}>
            {hasUploaded ? (
              <p>
                Upload of <br />
                {file ? file["name"] : <></>}
                <br />
                Successful
              </p>
            ) : (
              <p>
                <u style={{ cursor: "pointer" }}>Click Here</u>
                <br />
                or Drag & Drop
                <br />
                Video to Upload
              </p>
            )}
            {errorMessage}
          </div>
        </div>
      </FileUploader>

      {file && !isUploading && (
        <div>
          <h3>Uploaded Video:</h3>
          <video src={URL.createObjectURL(file)} controls width="500" />
        </div>
      )}

      {file && (
        <div>
          <h3>Ready to Upload:</h3>
          <p>{file["name"]}</p>
          <button onClick={uploadToYouTube} disabled={isUploading}>
            {isUploading ? (
              <>
                <CircularProgress size={24} style={{ marginRight: 10 }} />
                Uploading...
              </>
            ) : (
              "Upload to YouTube"
            )}
          </button>
        </div>
      )}

      {isUploading && (
        <div style={{ marginTop: 20 }}>
          <CircularProgress />
          <p>Uploading your video, please wait...</p>
        </div>
      )}
    </>
  );
}

export default DragDropVideo;
