import React, { FC } from "react";
import styles from "./styles.module.css";

const MainWindow: FC = () => {
    return (
        <main className={styles.main}>
            <h2>Добро пожаловать на сайт по изучению азбуки Морзе</h2>
            <p>
                Здесь вы сможете узнать основы азбуки Морзе, научиться передавать и принимать сообщения,
                а также проверить свои знания с помощью тестов и практических заданий.
            </p>
        </main>
    );
};

export default MainWindow;