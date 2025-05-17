import React, { FC, useState, useEffect } from "react";
import { supabase } from "../../src/supabaseClient";
import { useNavigate } from "react-router-dom";
import "./AuthForm.scss";

interface AuthFormProps {
  onClose: () => void;
  onLoginSuccess: (nickname: string) => void;
}

const AuthForm: FC<AuthFormProps> = ({ onClose, onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (isRegistering && password !== repeatPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (isRegistering) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nickname }
        }
      });
      if (error) setError(error.message);
      else setMessage("Проверьте почту для подтверждения.");
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        const { user } = data;
        onLoginSuccess(user.user_metadata?.nickname || "User");
        onClose();
        navigate("/");
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Введите Email для сброса пароля");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) setError("Ошибка при отправке письма сброса пароля");
    else setMessage("Проверьте почту для сброса пароля.");
  };

  return (
    <div
      className="authOverlay"
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains("authOverlay")) {
          onClose();
        }
      }}
    >
      <div className="authModal">
        <div className="closeWrapper">
          <button className="closeButton" onClick={onClose}>✕</button>
        </div>
        <h2>{isRegistering ? "Регистрация" : "Вход"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isRegistering && (
            <>
              <input
                type="password"
                placeholder="Повторите пароль"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Никнейм"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </>
          )}
          {error && <div className="errorMessage">{error}</div>}
          {message && <div className="successMessage">{message}</div>}
          <button type="submit">{isRegistering ? "Зарегистрироваться" : "Войти"}</button>
        </form>
  
        {!isRegistering && (
          <button className="resetPassword">Забыли пароль?</button>
        )}
  
        <div
          className="toggleMode"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "Уже есть аккаунт? Войти"
            : "Нет аккаунта? Зарегистрироваться"}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;