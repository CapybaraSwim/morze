import { FC } from "react";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import styles from "./styles.module.scss";

interface SymbolDetailProps {
    symbol: string;
}

export const SYMBOL_DATA: { [key: string]: { code: string; napiev: string } } = {
    Аа: { code: "•-", napiev: "ай-ДАА" },
    Бб: { code: "-•••", napiev: "БАА-ки-те-кут" },
    Вв: { code: "•--", napiev: "ви-ДАА-ЛАА" },
    Гг: { code: "--•", napiev: "ГАА-РАА-жик" },
    Дд: { code: "-••", napiev: "ДОО-ми-ки" },
    Ее: { code: "•", napiev: "есть" },
    Жж: { code: "•••-", napiev: "я-бук-ва-ЖЕЕ" },
    Зз: { code: "--••", napiev: "ЗАА-КАА-ти-ки" },
    Ии: { code: "••", napiev: "и-ди" },
    Йй: { code: "•---", napiev: "й-КРАА-ТКАА-ЯЯ" },
    Кк: { code: "-•-", napiev: "КААК-де-ЛАА" },
    Лл: { code: "•-••", napiev: "лу-НАА-ти-ки" },
    Мм: { code: "--", napiev: "МАА-МАА" },
    Нн: { code: "-•", napiev: "НОО-мер" },
    Оо: { code: "---", napiev: "ОО-КОО-ЛОО" },
    Пп: { code: "•--•", napiev: "пи-ЛАА-ПОО-ет" },
    Рр: { code: "•-•", napiev: "ре-ШАА-ет" },
    Сс: { code: "•••", napiev: "си-ни-е" },
    Тт: { code: "-", napiev: "ТААК" },
    Уу: { code: "••-", napiev: "у-бе-ГУУ" },
    Фф: { code: "••-•", napiev: "фи-ли-МООН-чик" },
    Хх: { code: "••••", napiev: "хи-ми-чи-те" },
    Цц: { code: "-•-•", napiev: "ЦАА-пля-ЦАА-пля" },
    Чч: { code: "---•", napiev: "ЧЕЕ-ЛОО-ВЕЕ-чик" },
    Шш: { code: "----", napiev: "ШАА-РОО-ВАА-РЫЫ" },
    Щщ: { code: "--•-", napiev: "ЩАА-ВААМ-не-ШАА" },
    Ыы: { code: "-•--", napiev: "ЫЫ-не-НАА-ДОО" },
    Ьь: { code: "-••-", napiev: "ТОО-мяг-кий-ЗНААК" },
    Ээ: { code: "••-••", napiev: "э-ле-РОО-ни-ки" },
    Юю: { code: "••--", napiev: "ю-ли-АА-НАА" },
    Яя: { code: "•-•-", napiev: "я-МААЛ-я-МААЛ" },
    1: { code: "•----", napiev: "и-ТООЛЬ-КОО-ОО-ДНАА" },
    2: { code: "••---", napiev: "две-не-ХОО-РОО-ШОО" },
    3: { code: "•••--", napiev: "три-те-бе-МАА-ЛОО" },
    4: { code: "••••-", napiev: "чет-ве-ре-ти-КАА" },
    5: { code: "•••••", napiev: "пя-ти-ле-ти-е" },
    6: { code: "-••••", napiev: "ПОО-шес-ти-бе-ри" },
    7: { code: "--•••", napiev: "ДАЙ-ДАЙ-за-ку-рить" },
    8: { code: "---••", napiev: "МОО-ЛОО-КОО-ки-пит" },
    9: { code: "----•", napiev: "ВОО-ДОО-ПРОО-ВООД-чик" },
    0: { code: "-----", napiev: "НООЛЬ" },
};

const SymbolDetail: FC<SymbolDetailProps> = ({ symbol }) => {
    const { code, napiev } = SYMBOL_DATA[symbol] || {};

    return (
        <div className={styles.symbolDetail}>
            <h2>Символ: {symbol}</h2>
            {code ? <p>Код Морзе: {code}</p> : <p>Код не найден</p>}
            {napiev ? <p>Напев: {napiev}</p> : <p>Напев не найден</p>}
            {code && <AudioPlayer code={code} speedMultiplier={1} />}
        </div>
    );
};

export default SymbolDetail;