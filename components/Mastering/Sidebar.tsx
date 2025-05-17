import { FC } from "react";
import styles from "./styles.module.scss";

interface SidebarProps {
    onSelect: (symbol: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ onSelect }) => {
    const symbols = ["Аа", "Бб", "Вв", "Гг", "Дд", "Ее", "Жж", "Зз", "Ии", "Йй", "Кк", "Лл", "Мм", "Нн", "Оо", "Пп", "Рр", "Сс", "Тт", "Уу", "Фф", "Хх", "Цц", "Чч", "Шш", "Щщ", "Ъъ", "Ыы", "Ьь", "Ээ", "Юю", "Яя", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    return (
        <aside className={styles.sidebar}>
            <h2>Символы</h2>
            <ul>
                {symbols.map((symbol) => (
                    <li key={symbol} onClick={() => onSelect(symbol)}>
                        {symbol}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;