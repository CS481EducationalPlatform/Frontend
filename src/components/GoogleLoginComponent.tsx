import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";

const clientId = "308196405431-5b7l0snu35pqe6nkbfi2krljiq29qa41.apps.googleusercontent.com"; // Replace later

export default function GoogleLoginComponent() {
  const handleSuccess = (response: CredentialResponse) => {
    console.log("Google Login Success:", response);
    // backend 
  };

  const handleFailure = () => {
    console.log("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center mt-5">
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      </div>
    </GoogleOAuthProvider>
  );
}
