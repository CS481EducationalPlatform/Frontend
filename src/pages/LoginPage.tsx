import React, { useState } from "react";
import "../styles/LoginPage.css";
import GoogleLoginComponent from "../components/GoogleLoginComponent";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
    language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
    setIsLoggedIn: (isLoggedIn: boolean) => void;
 }  

const translations ={
    en:{
        login: "Log in",
        username: "Username",
        password: "Password",
        error: "Username and password are required",
        noacc: "Don't have an Account?",
        signup: "Sign up",
        or: "or"
    },
    ru:{
        login: "Имя пользователя",
        username: "Имя пользователя",
        password: "Пароль",
        error: "Ошибка",
        noacc: "У вас нет аккаунта?",
        signup: "Зарегистрироваться",
        or: "или"
    },

    es: {
        login: "Iniciar sesión", 
        username: "Usuario",
        password: "Contraseña",
        error: "Error",
        noacc: "¿No tienes una cuenta?",
        signup: "Registrarse",
        or: "o"
    },

    fr: {
        login: "Se connecter", 
        username: "Nom d’utilisateur",
        password: "Mot de passe",
        error: "Erreur",
        noacc: "Vous n’avez pas de compte ?",
        signup: "S’inscrire",
        or: "ou"
    },

    uk: {
        login: "Увійти", 
        username: "Ім'я користувача",
        password: "Пароль",
        error: "Помилка",
        noacc: "У вас немає облікового запису?",
        signup: "Зареєструватися",
        or: "або"
    }

}

const LoginPage: React.FC<LoginPageProps> = ({ language, setIsLoggedIn }) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleOauthChanged = (value:boolean) => {
      if(value){
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        navigate("/account"); 
        console.log("Signed In With OAuth 2.0");
      }
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      if (username && password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username); // Save username
        setIsLoggedIn(true);
        navigate("/account"); 
      } else {
        setError("Username and password are required");
      }
    };
  
    return (
      <div className="login-container">
        <h1>
          {translations[language].login}
        </h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              {translations[language].username}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>
              {translations[language].password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            {translations[language].login}
          </button>
        </form>
        <p>
          {translations[language].noacc}
        </p>
        <button className="sign-up-button" onClick={() => navigate("/signup")}>
          {translations[language].signup}
        </button>
        <p>
          {translations[language].or}
        </p>
        <GoogleLoginComponent onOauth={handleOauthChanged}/>
      </div>
    );
  };
  
  export default LoginPage;