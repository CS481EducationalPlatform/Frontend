import { gapi } from "gapi-script";
import { useEffect } from "react";

//CHANGE to being pulled from database securely
const CLIENT_ID = "178516670715-5l32e4c5lanhgvn8iv7sa7r23l57o2qq.apps.googleusercontent.com";
const CLIENT_ID2 = "961838062810-eh97iiq2d6eobfp3b20n65lc5l3a1sp9.apps.googleusercontent.com";
const CLIENT_ID3 = "595459553093-rb03rl24l4l4oece2leb1re5t0f3t1ra.apps.googleusercontent.com";
const CLIENT_IDS = [CLIENT_ID, CLIENT_ID2, CLIENT_ID3]

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
    <button onClick={handleSignIn} style={{height:'100px', width:'200px', borderRadius:'8px', border:'0px solid black'}}>Sign in with Google</button>
  );
}

export default GoogleLoginComponent;