import React, { FC } from "react";
import styles from "./styles.module.scss";

const morseSymbols = [
  { letter: "А", code: "·-", chant: "ай-ДАА" },
  { letter: "Б", code: "-···", chant: "БАА-ки-те-кут" },
  { letter: "В", code: "·--", chant: "ВИ-ДАА-ЛАА" },
  { letter: "Г", code: "--·", chant: "ГАА-РАА-жик" },
  { letter: "Д", code: "-··", chant: "ДОО-ми-ки" },
  { letter: "Е", code: "·", chant: "есть" },
  { letter: "Ж", code: "···-", chant: "я-бук-ва-ЖЕЕ" },
  { letter: "З", code: "--··", chant: "ЗАА-КАА-ти-ки" },
  { letter: "И", code: "··", chant: "и-ди" },
  { letter: "Й", code: "·---", chant: "й-КРАА-ТКАА-ЯЯ" },
  { letter: "К", code: "-·-", chant: "КААК-де-ЛАА" },
  { letter: "Л", code: "·-··", chant: "лу-НAA-ти-ки" },
  { letter: "М", code: "--", chant: "МАА-МАА" },
  { letter: "Н", code: "-·", chant: "НОО-мер" },
  { letter: "О", code: "---", chant: "ОО-КОО-ЛОО" },
  { letter: "П", code: "·--·", chant: "пи-ЛАА-ПОО-ет" },
  { letter: "Р", code: "·-·", chant: "ре-ШАА-ет" },
  { letter: "С", code: "···", chant: "си-ни-е" },
  { letter: "Т", code: "-", chant: "ТААК" },
  { letter: "У", code: "··-", chant: "у-бе-ГУУ" },
  { letter: "Ф", code: "··-·", chant: "фи-ли-МООН-чик" },
  { letter: "Х", code: "····", chant: "хи-ми-чи-те" },
  { letter: "Ц", code: "-·-·", chant: "ЦАА-пля-ЦАА-пля" },
  { letter: "Ч", code: "---·", chant: "ЧЕЕ-ЛОО-ВЕЕ-чик" },
  { letter: "Ш", code: "----", chant: "ШАА-РОО-ВАА-РЫЫ" },
  { letter: "Щ", code: "--·-", chant: "ЩАА-ВААМ-не-ШАА" },
  { letter: "Ы", code: "-·--", chant: "ЫЫ-не-НАА-ДОО" },
  { letter: "Ь", code: "-··-", chant: "ЯЯ-мяг-кий-ЗНААК" },
  { letter: "Э", code: "··-··", chant: "э-ле-РОО-ни-ки" },
  { letter: "Ю", code: "··--", chant: "ю-ли-АА-НАА" },
  { letter: "Я", code: "·-·-", chant: "я-МААЛ-я-МААЛ" },
  { letter: "1", code: "·----", chant: "и-ТООЛЬ-КОО-ОО-ДНАА" },
  { letter: "2", code: "··---", chant: "две-не-ХОО-РОО-ШОО" },
  { letter: "3", code: "···--", chant: "три-те-бе-МАА-ЛОО" },
  { letter: "4", code: "····-", chant: "чет-ве-ре-ти-КАА" },
  { letter: "5", code: "·····", chant: "пя-ти-ле-ти-е" },
  { letter: "6", code: "-····", chant: "ПОО-шес-ти-бе-ри" },
  { letter: "7", code: "--···", chant: "ДАЙ-ДАЙ-за-ку-рить" },
  { letter: "8", code: "---··", chant: "МОО-ЛОО-КОО-ки-пит" },
  { letter: "9", code: "----·", chant: "ВОО-ДОО-ПРОО-ВООД-чик" },
  { letter: "0", code: "-----", chant: "НООЛЬ" },
];

const Table: FC = () => {
  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>Таблица символов азбуки Морзе</h2>

      <table className={styles.desktopTable}>
        <thead>
          <tr>
            <th>Буква</th>
            <th>Код</th>
            <th>Напев</th>
          </tr>
        </thead>
        <tbody>
          {morseSymbols.map(({ letter, code, chant }) => (
            <tr key={letter}>
              <td>{letter}</td>
              <td>{code}</td>
              <td>{chant}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className={styles.mobileTable}>
        <thead>
          <tr>
            <th>Буква</th>
            <th>Код</th>
          </tr>
        </thead>
        <tbody>
          {morseSymbols.map(({ letter, code }) => (
            <tr key={letter}>
              <td>{letter}</td>
              <td>{code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
