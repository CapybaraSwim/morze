import { FC } from "react"
import styles from "./styles.module.scss"


const Header: FC = () => {
    return (
        <header className={styles.header}>
            <h1>Азбука Морзе</h1>
            <nav>
                <ul className={styles.navList}>
                    <li><a href="/">Главная</a></li>
                    <li><a href="/new_symbols">Изучение</a></li>
                    <li><a href="/train">Тренировка</a></li>
                    <li><a href="/table">Таблица символов</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;