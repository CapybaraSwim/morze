import { FC, useState } from "react";
import Sidebar from "./Sidebar";
import SymbolDetail from "./SymbolDetail";
import styles from "./styles.module.scss";

const Mastering: FC = () => {
    const [selectedSymbol, setSelectedSymbol] = useState<string>("Аа");

    return (
        <div className={styles.masteringContainer}>
            <Sidebar onSelect={setSelectedSymbol} />
            <SymbolDetail symbol={selectedSymbol} />
        </div>
    );
};

export default Mastering;