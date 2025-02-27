import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.css"

const translations = {
    en: {
        signup: "Sign Up",
        username: "Username",
        password:"Password",
        confirmpass: "Confirm Password",

    },
    ru: {
        signup: "Зарегистрироваться",
        username: "Имя пользователя",
        password:"Пароль",
        confirmpass: "Подтвердите пароль",
    },
    es: {
        signup: "Registrarse",
        username: "Nombre de usuario",
        password: "Contraseña",
        confirmpass: "Confirmar contraseña",
    },
    fr: {
        signup: "S’inscrire",
        username: "Nom d’utilisateur",
        password: "Mot de passe",
        confirmpass: "Confirmer le mot de passe",
    },
    uk: {
        signup: "Зареєструватися",
        username: "Ім'я користувача",
        password: "Пароль",
        confirmpass: "Підтвердьте пароль",
    }
  };
  
  interface SignUpPageProps {
    language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
  }

const SignUpPage: React.FC<SignUpPageProps> = ({ language }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation checks
    if (!username || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Save the user info in localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password); // This is just for demo; hashing should be used in a real app.

    alert("Account created successfully! Redirecting to login.");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="signup-container">
      <h2>{translations[language].signup}</h2> 
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignUp}>
        <div className="input-group">
          <label>{translations[language].username}</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-group">
          <label>{translations[language].password}</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-group">
          <label>{translations[language].confirmpass}</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit" className="signup-button">
        {translations[language].signup}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;