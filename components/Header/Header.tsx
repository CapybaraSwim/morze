import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../src/supabaseClient";
import AuthForm from "../Auth/AuthForm";
import styles from "./styles.module.scss";

const Header: FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [userNickname, setUserNickname] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false); // ← для бургер-меню
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { user } = session;
        setUserNickname(user.user_metadata?.nickname || user.email);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserNickname(session.user.user_metadata?.nickname || session.user.email);
      } else {
        setUserNickname(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserNickname(null);
    navigate("/");
  };

  return (
    <>
      <header className={styles.header}>
        {/* Бургер-меню */}
        <div className={styles.burger} onClick={() => setNavOpen(!navOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <h1 className={styles.home}>Азбука Морзе</h1>

        <nav>
          <ul className={`${styles.navList} ${navOpen ? styles.open : ""}`}>
            <li><a href="/">Главная</a></li>
            <li><a href="/table">Таблица символов</a></li>
            <li><a href="/mastering">Прием на слух</a></li>
            <li><a href="/training">Тренировка</a></li>
            <li><a href="/signalling">Чат</a></li>
          </ul>
        </nav>

        <div className={styles.authControls}>
          {userNickname ? (
            <>
              <span className={styles.nickname}>{userNickname}</span>
              <button onClick={handleLogout} className={styles.logoutButton}>Выйти</button>
            </>
          ) : (
            <button onClick={() => setShowAuth(true)} className={styles.loginButton}>
              Войти / Регистрация
            </button>
          )}
        </div>
      </header>

      {showAuth && (
        <AuthForm
          onClose={() => setShowAuth(false)}
          onLoginSuccess={(nickname) => {
            setUserNickname(nickname);
            setShowAuth(false);
            navigate("/");
          }}
        />
      )}
    </>
  );
};

export default Header;
