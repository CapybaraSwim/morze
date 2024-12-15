import React, { FC } from "react"
import styles from "./styles.module.scss";

const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Все права защищены.</p>
        </footer>
    );
};

export default Footer;