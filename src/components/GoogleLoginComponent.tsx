import { gapi } from "gapi-script";
import { useEffect } from "react";

//CHANGE to being pulled from database securely
const CLIENT_ID = "178516670715-5l32e4c5lanhgvn8iv7sa7r23l57o2qq.apps.googleusercontent.com";
const CLIENT_ID2 = "961838062810-eh97iiq2d6eobfp3b20n65lc5l3a1sp9.apps.googleusercontent.com";
const CLIENT_ID3 = "595459553093-rb03rl24l4l4oece2leb1re5t0f3t1ra.apps.googleusercontent.com";
const CLIENT_IDS = [CLIENT_ID, CLIENT_ID2, CLIENT_ID3]

/*
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID1;
const CLIENT_ID2 = process.env.REACT_APP_CLIENT_ID2;
const CLIENT_ID3 = process.env.REACT_APP_CLIENT_ID3;
const CLIENT_IDS = [CLIENT_ID, CLIENT_ID2, CLIENT_ID3]
*/

interface GoogleLoginProps {
  onOauth: (value: boolean) => void;
}

const GoogleLoginComponent:React.FC<GoogleLoginProps> = ({onOauth}) => {
  useEffect(() => {
    onOauth(false);
    // Initialize the Google API client
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_IDS[0],
        scope: "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl email profile openid",
      });
    };

    //https://www.googleapis.com/auth/youtube.upload      ->    Allow YouTube Uploading of Videos
    //https://www.googleapis.com/auth/youtube.readonly    ->    Allow YouTube Reading of Videos and Playlists
    //https://www.googleapis.com/auth/youtube.force-ssl   ->    Allow YouTube Management and Deletion of Videos

    gapi.load("client:auth2", initClient);
  }, []);

  const handleSignIn = async () => {
    const authInstance = gapi.auth2.getAuthInstance();
    const user = await authInstance.signIn();

    const response_auth = user.getAuthResponse();
    const response_profile = user.getBasicProfile();

    const token = response_auth.access_token;
    const id_token = response_auth.id_token;
    const email = response_profile.getEmail();

    console.log('Auth ', user.getAuthResponse);

    localStorage.setItem("access_token", token);
    localStorage.setItem("id_token", id_token);
    localStorage.setItem("username", email);

    onOauth(true);
    alert("Successfully signed in");
  };

  return (
    <button
      onClick={handleSignIn}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        border: '1px solid #dadce0',
        borderRadius: '4px',
        padding: '8px 16px',
        fontSize: '14px',
        fontFamily: 'Roboto, Arial, sans-serif',
        color: '#3c4043',
        fontWeight: '500',
        height: '40px',
        cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        transition: 'background-color 0.3s, box-shadow 0.3s',
        minWidth: '220px'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
        e.currentTarget.style.backgroundColor = '#f7f8f8';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
        e.currentTarget.style.backgroundColor = 'white';
      }}
    >
      {/* SVG creator code for icon */}
      <div style={{ marginRight: '12px', display: 'flex', alignItems: 'center' }}>
        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
      </div>
      <span>Sign in with Google</span>
    </button>
  );
}

export default GoogleLoginComponent;