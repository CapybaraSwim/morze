import React, { FC, useState, useEffect, useRef } from "react";
import { playMorseCode } from "../Mastering/AudioPlayer/AudioPlayer";
import styles from "./Training.module.scss";

interface TrainingProps {
  speed: number;
  groups: number;
  symbols: string[];
  onFinish: () => void;
}

interface DisplayedChar {
  char: string;
  padRight: boolean;
}

const morseMap: Record<string, string> = {
  А: "•-", Б: "-•••", В: "•--", Г: "--•", Д: "-••",
  Е: "•", Ж: "•••-", З: "--••", И: "••", Й: "•---",
  К: "-•-", Л: "•-••", М: "--", Н: "-•", О: "---",
  П: "•--•", Р: "•-•", С: "•••", Т: "-", У: "••-",
  Ф: "••-•", Х: "••••", Ц: "-•-•", Ч: "---•", Ш: "----",
  Щ: "--•-", Ы: "-•--", Ь: "-••-", Э: "••-••", Ю: "••--",
  Я: "•-•-", "1": "•----","2": "••---","3": "•••--",
  "4": "••••-","5": "•••••","6": "-••••","7": "--•••",
  "8": "---••","9": "----•","0": "-----"
};

const Training: FC<TrainingProps> = ({ speed, groups, symbols, onFinish }) => {
  const [displayedChars, setDisplayedChars] = useState<DisplayedChar[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.15);
  const [showOutput, setShowOutput] = useState(true);
  const [showWarning, setShowWarning] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef     = useRef<GainNode   | null>(null);
  const playNextRef = useRef<(() => void) | null>(null);

  // инициализация AudioContext+GainNode
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const ctx = new (window.AudioContext ||
                      (window as any).webkitAudioContext)();
      const gain = ctx.createGain();
      gain.gain.value = volume;
      gain.connect(ctx.destination);
      audioCtxRef.current = ctx;
      gainRef.current     = gain;
    }
  };

  // остановка
  const stopPlayback = () => {
    playNextRef.current = null;
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
      gainRef.current     = null;
    }
    setIsPlaying(false);
  };

  // генерим последовательность
  const generateSequence = () => {
    let seq = "";
    for (let i = 0; i < groups; i++) {
      for (let j = 0; j < 5; j++) {
        seq += symbols[Math.floor(Math.random() * symbols.length)];
      }
      if (i < groups - 1) seq += " ";
    }
    return seq;
  };

  // собственно play
  const playSequence = () => {
    stopPlayback();
    const seq    = generateSequence();       // строка вида "абвгд еёжзи …"
    const groups = seq.split(" ");            // массив групп по 5 букв
    setDisplayedChars([]);
  
    initAudio();
    setIsPlaying(true);
  
    const desiredGroupTime = 60 / speed;      // сек на одну группу
    const unitDotTime      = 0.1;             // базовая «единица» (точка)
    const speedMul         = speed / 10;      // множитель для звуков
  
    // Для каждой группы заранее рассчитываем две величины:
    // symbolPause — пауза между буквами внутри группы,
    // groupPause  — пауза после группы, перед следующей.
    const pauses = groups.map(group => {
      // 1) склеиваем азбуку Морзе одной строкой, без пробелов между буквами:
      const morseStr = group
        .split("")
        .map(ch => morseMap[ch.toUpperCase()] || "")
        .join("");
  
      // 2) считаем «елементы»: точек, тире и «малые паузы» внутри одной буквы:
      let dotCount  = 0;
      let dashCount = 0;
      for (const e of morseStr) {
        if (e === "•") dotCount++;
        else if (e === "-") dashCount++;
      }
      const intraElementGaps = morseStr.length - 1; 
  
      // 3) вычисляем время «звука» этой группы:
      //    • — 1 unit, – — 3 unit, пауза между точками/тире внутри одной буквы — 1 unit
      const audioUnits = dotCount * 1 + dashCount * 3 + intraElementGaps * 1;
      const audioTime  = audioUnits * unitDotTime / speedMul;
  
      // 4) сколько «групповых» пауз и «буквенных» пауз у нас в одной группе:
      //    буквенных пауз между 5 буквами будет 4,
      //    групповых пауз (после буквы‑5) — 1.
      const letterGapsCount = group.length - 1; // всегда = 4
      const groupGapsCount  = 1;
  
      // 5) оставшееся время, которое нужно распределить по этим паузам:
      const leftover = desiredGroupTime - audioTime;
      // 6) делим его в пропорции, скажем, буквы получают 1 долю, группа — 2 доли:
      const totalShares   = letterGapsCount * 1 + groupGapsCount * 2;
      const shareDuration = leftover / totalShares;
  
      return {
        symbolPause: shareDuration * 1,
        groupPause:  shareDuration * 2
      };
    });
  
    // 7) теперь проигрываем группы по очереди:
    let groupIndex = 0;
    const playGroup = () => {
      if (groupIndex >= groups.length) {
        setIsPlaying(false);
        return;
      }
      const groupText = groups[groupIndex]!;
      const { symbolPause, groupPause } = pauses[groupIndex];
      let charIdx = 0;
  
      const playChar = () => {
        if (!audioCtxRef.current || !gainRef.current) return;
        if (charIdx >= groupText.length) {
          // после всей группы — делаем большую паузу
          groupIndex++;
          setTimeout(playGroup, groupPause * 1000);
          return;
        }
        const ch       = groupText[charIdx]!;
        const morse    = morseMap[ch.toUpperCase()] || "";
        playMorseCode(
          morse,
          volume,
          speedMul,
          () => {
            // отобразить букву после звука
            setDisplayedChars(prev => {
              const idx = prev.length + 1;
              return [
                ...prev,
                { char: ch.toLowerCase(), padRight: idx % 5 === 0 }
              ];
            });
            charIdx++;
            setTimeout(playChar, symbolPause * 1000);
          },
          audioCtxRef.current!,
          gainRef.current!
        );
      };
  
      playChar();
    };
  
    playGroup();
  };

  // громкость «на лету»
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(v, audioCtxRef.current.currentTime);
    }
  };

  // при unmount
  useEffect(() => () => stopPlayback(), []);

  const rows = [];
  for (let i = 0; i < displayedChars.length; i += 25) {
    rows.push(displayedChars.slice(i, i + 25));
  }
  const handleBack = () => {
    stopPlayback();
    onFinish();
  };
  return (
    <div className={styles.training}>
      {/* Панель управления */}
      <div className={styles.controls}>
      <button
        className={styles.backButton}
        onClick={handleBack}
      >
        ← Назад
      </button>

        <button
          className={styles.controlButton}
          onClick={isPlaying ? stopPlayback : playSequence}
        >
          {isPlaying ? "■ Остановить" : "▶ Начать"}
        </button>

        <div className={styles.volumeControl}>
          <label>Громкость:</label>
          <input
            type="range" min="0" max="1" step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>

        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={showOutput}
            onChange={() => setShowOutput(x => !x)}
          />
          Показать символы
        </label>
      </div>

      {/* Предупреждение перед стартом */}
      {showWarning && (
        <div className={styles.warning}>
          ⚠️ Приготовьтесь записывать символы в тетрадь
        </div>
      )}

      {/* Область вывода */}
      {showOutput && (
        <div className={styles.sequenceDisplay}>
          {rows.map((row, ridx) => (
            <div key={ridx} className={styles.row}>
              {row.map((item,i) => (
                <span
                  key={i}
                  className={styles.symbol}
                  style={{ marginRight: item.padRight? "15px":"0" }}
                >
                  {item.char===" "?"␣":item.char}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Training;