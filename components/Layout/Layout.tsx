import { FC, ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./styles.module.scss";

interface LayoutProps {
    children: ReactNode; // Принимает дочерние элементы
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.content}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;