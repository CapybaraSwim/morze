import React, { FC } from "react";
import styles from "./styles.module.scss";

const Table: FC = () => {
  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>Таблица символов азбуки Морзе</h2>
      <table className={styles.morseTable}>
        <thead>
          <tr>
            <th>Буква</th>
            <th>Код</th>
            <th>Напев</th>
            <th>Буква</th>
            <th>Код</th>
            <th>Напев</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>А</td><td>·-</td><td>ай-ДАА</td>
            <td>Ф</td><td>··-·</td><td>фи-ли-МООН-чик</td>
          </tr>
          <tr>
            <td>Б</td><td>-···</td><td>БАА-ки-те-кут</td>
            <td>Х</td><td>····</td><td>хи-ми-чи-те</td>
          </tr>
          <tr>
            <td>В</td><td>·--</td><td>ВИ-ДАА-ЛАА</td>
            <td>Ц</td><td>-·-·</td><td>ЦАА-пля-ЦАА-пля</td>
          </tr>
          <tr>
            <td>Г</td><td>--·</td><td>ГАА-РАА-жик</td>
            <td>Ч</td><td>---·</td><td>ЧЕЕ-ЛОО-ВЕЕ-чик</td>
          </tr>
          <tr>
            <td>Д</td><td>-··</td><td>ДОО-ми-ки</td>
            <td>Ш</td><td>----</td><td>ШАА-РОО-ВАА-РЫЫ</td>
          </tr>
          <tr>
            <td>Е</td><td>·</td><td>есть</td>
            <td>Щ</td><td>--·-</td><td>ЩАА-ВААМ-не-ШАА</td>
          </tr>
          <tr>
            <td>Ж</td><td>···-</td><td>я-бук-ва-ЖЕЕ</td>
            <td>Ь</td><td>-··-</td><td>ЯЯ-мяг-кий-ЗНААК</td>
          </tr>
          <tr>
            <td>З</td><td>--··</td><td>ЗАА-КАА-ти-ки</td>
            <td>Ы</td><td>-·--</td><td>ЫЫ-не-НАА-ДОО</td>
          </tr>
          <tr>
            <td>И</td><td>··</td><td>и-ди</td>
            <td>Ю</td><td>··--</td><td>ю-ли-АА-НАА</td>
          </tr>
          <tr>
            <td>Й</td><td>·---</td><td>й-КРАА-ТКАА-ЯЯ</td>
            <td>Я</td><td>·-·-</td><td>я-МААЛ-я-МААЛ</td>
          </tr>
          <tr>
            <td>К</td><td>-·-</td><td>КААК-де-ЛАА</td>
            <td>1</td><td>·----</td><td>и-ТООЛЬ-КОО-ОО-ДНАА</td>
          </tr>
          <tr>
            <td>Л</td><td>·-··</td><td>лу-НАА-ти-ки</td>
            <td>2</td><td>··---</td><td>две-не-ХОО-РОО-ШОО</td>
          </tr>
          <tr>
            <td>М</td><td>--</td><td>МАА-МАА</td>
            <td>3</td><td>···--</td><td>три-те-бе-МАА-ЛОО</td>
          </tr>
          <tr>
            <td>Н</td><td>-·</td><td>НОО-мер</td>
            <td>4</td><td>····-</td><td>чет-ве-ре-ти-КАА</td>
          </tr>
          <tr>
            <td>О</td><td>---</td><td>ОО-КОО-ЛОО</td>
            <td>5</td><td>·····</td><td>пя-ти-ле-ти-е</td>
          </tr>
          <tr>
            <td>П</td><td>·--·</td><td>пи-ЛАА-ПОО-ет</td>
            <td>6</td><td>-····</td><td>ПОО-шес-ти-бе-ри</td>
          </tr>
          <tr>
            <td>Р</td><td>·-·</td><td>ре-ШАА-ет</td>
            <td>7</td><td>--···</td><td>ДАЙ-ДАЙ-за-ку-рить</td>
          </tr>
          <tr>
            <td>С</td><td>···</td><td>си-ни-е</td>
            <td>8</td><td>---··</td><td>МОО-ЛОО-КОО-ки-пит</td>
          </tr>
          <tr>
            <td>Т</td><td>-</td><td>ТААК</td>
            <td>9</td><td>----·</td><td>ВОО-ДОО-ПРОО-ВООД-чик</td>
          </tr>
          <tr>
            <td>У</td><td>··-</td><td>у-бе-ГУУ</td>
            <td>0</td><td>-</td><td>НООЛЬ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;