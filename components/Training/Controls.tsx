import React, { FC, useState } from "react";
import styles from "./styles.module.scss";

interface ControlsProps {
  onStart: (speed: number, groups: number, selectedSymbols: string[]) => void;
}

const alphabet = [
  "а","б","в","г","д","е","ж","з","и","й","к",
  "л","м","н","о","п","р","с","т","у","ф","х",
  "ц","ч","ш","щ","ы","ь","э","ю","я"
];
const numbers = ["1","2","3","4","5","6","7","8","9","0"];

const Controls: FC<ControlsProps> = ({ onStart }) => {
  const [speed, setSpeed] = useState(10);
  const [groups, setGroups] = useState(5);
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  // Проверяем, все ли буквы уже выбраны
  const allLettersSelected = alphabet.every(l => selectedSymbols.includes(l));
  // Аналогично для цифр
  const allNumbersSelected = numbers.every(n => selectedSymbols.includes(n));

  const toggleLetters = () => {
    if (allLettersSelected) {
      // Убираем из selectedSymbols все буквы
      setSelectedSymbols(prev =>
        prev.filter(s => !alphabet.includes(s))
      );
    } else {
      // Добавляем в selectedSymbols все буквы (уникально)
      setSelectedSymbols(prev =>
        Array.from(new Set([...prev, ...alphabet]))
      );
    }
  };

  const toggleNumbers = () => {
    if (allNumbersSelected) {
      setSelectedSymbols(prev =>
        prev.filter(s => !numbers.includes(s))
      );
    } else {
      setSelectedSymbols(prev =>
        Array.from(new Set([...prev, ...numbers]))
      );
    }
  };

  const handleStart = () => {
    if (!selectedSymbols.length) {
      alert("Выберите хотя бы один символ!");
      return;
    }
    onStart(speed, groups, selectedSymbols);
  };

  const renderSymbols = (list: string[]) =>
    list.map(sym => (
      <label key={sym} className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={selectedSymbols.includes(sym)}
          onChange={() =>
            setSelectedSymbols(prev =>
              prev.includes(sym)
                ? prev.filter(x => x !== sym)
                : [...prev, sym]
            )
          }
        />
        {sym}
      </label>
    ));

    return (
        <div className={styles.controls}>
          <h2>Настройки тренировки</h2>
    
          <div className={styles.controlGroup}>
            <label>Скорость (групп/мин): {speed}</label>
            <input
              type="range"
              min="5"
              max="30"
              value={speed}
              onChange={e => setSpeed(+e.target.value)}
            />
          </div>
    
          <div className={styles.controlGroup}>
            <label>Количество групп:</label>
            <input
              type="number"
              min="1"
              max="20"
              value={groups}
              onChange={e => setGroups(+e.target.value)}
            />
          </div>
    
          <div className={styles.controlGroup}>
            <label>Выбор символов:</label>
            <button className={styles.smallButton} onClick={toggleLetters}>
              {allLettersSelected ? "Снять все буквы" : "Выбрать все буквы"}
            </button>
            <button className={styles.smallButton} onClick={toggleNumbers}>
              {allNumbersSelected ? "Снять все цифры" : "Выбрать все цифры"}
            </button>
          </div>
    
          <div className={styles.symbolsGrid}>
            <div>
              <strong>Буквы:</strong>
              {renderSymbols(alphabet)}
            </div>
            <div>
              <strong>Цифры:</strong>
              {renderSymbols(numbers)}
            </div>
          </div>
    
          <button className={styles.startButton} onClick={handleStart}>
            Начать тренировку
          </button>
        </div>
      );
    };
    

export default Controls;
