// src/components/AudioPlayer/AudioPlayer.tsx
import React, {
    forwardRef,
    useImperativeHandle,
    useState,
    useEffect,
    useRef
  } from "react";
  import styles from "./audioPlayer.module.scss";
  
  export interface AudioPlayerRef {
    playSequence: (code: string, onEnd?: () => void) => void;
    stop: () => void;
  }
  
  interface AudioPlayerProps {
    /** М‑орзе‑строка: точка = '•', тире = '-' */
    code: string;
    /** сколько групп в минуту (используется для расчёта длительности единицы) */
    speedMultiplier?: number;
    /** начальное значение громкости 0…1 */
    initialVolume?: number;
    /** если true — покажет текущий код под кнопкой */
    showVisualization?: boolean;
  }
  
  export const playMorseCode = (
    code: string,
    volume: number,
    speedMultiplier: number,
    onPlaybackEnd: () => void,
    sharedCtx?: AudioContext,
    sharedGain?: GainNode
  ) => {
    // Если передали общий AudioContext/GainNode — используем его,
    // иначе создаём новый и закрываем в конце.
    const ctx =
      sharedCtx ||
      new (window.AudioContext || (window as any).webkitAudioContext)();
    const gain =
      sharedGain ||
      (() => {
        const g = ctx.createGain();
        g.connect(ctx.destination);
        g.gain.value = volume;
        return g;
      })();
  
    const unit = 0.1 / speedMultiplier; // длительность «точки»
    let t = ctx.currentTime;
  
    const playTone = (duration: number) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 700;
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + duration);
      t += duration + unit; // пауза «между элементами» = 1×unit
    };
  
    for (const ch of code) {
      if (ch === "•") {
        playTone(unit);
      } else if (ch === "-") {
        playTone(unit * 3);
      } else if (ch === " ") {
        t += unit * 2; // межбуквенная пауза = 3×unit, но один unit уже добавили в конец tone → +2
      }
    }
  
    // сигнал об окончании
    setTimeout(() => {
      onPlaybackEnd();
      if (!sharedCtx) ctx.close();
    }, (t - ctx.currentTime) * 1000);
  };
  
  const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
    (
      {
        code,
        speedMultiplier = 1,
        initialVolume = 0.15,
        showVisualization = false
      },
      ref
    ) => {
      const [isPlaying, setIsPlaying] = useState(false);
      const [volume, setVolume] = useState(initialVolume);
  
      const ctxRef = useRef<AudioContext | null>(null);
      const gainRef = useRef<GainNode | null>(null);
  
      // Создаём AudioContext + общий GainNode
      const initAudio = () => {
        if (!ctxRef.current) {
          const ctx =
            new (window.AudioContext || (window as any).webkitAudioContext)();
          const g = ctx.createGain();
          g.connect(ctx.destination);
          g.gain.value = volume;
          ctxRef.current = ctx;
          gainRef.current = g;
        }
      };
  
      // Остановка и очистка
      const stopPlayback = () => {
        if (ctxRef.current) {
          ctxRef.current.close();
          ctxRef.current = null;
          gainRef.current = null;
        }
        setIsPlaying(false);
      };
  
      // Нажали «▶»
      const handlePlay = () => {
        if (!code) return;
        initAudio();
        setIsPlaying(true);
        playMorseCode(
          code,
          volume,
          speedMultiplier,
          () => {
            setIsPlaying(false);
          },
          ctxRef.current!,
          gainRef.current!
        );
      };
  
      // Динамическая громкость
      const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = parseFloat(e.target.value);
        setVolume(v);
        if (gainRef.current && ctxRef.current) {
          gainRef.current.gain.setValueAtTime(
            v,
            ctxRef.current.currentTime
          );
        }
      };
  
      // expose ref API
      useImperativeHandle(ref, () => ({
        playSequence: (c: string, onEnd = () => {}) => {
          initAudio();
          setIsPlaying(true);
          playMorseCode(
            c,
            volume,
            speedMultiplier,
            () => {
              setIsPlaying(false);
              onEnd();
            },
            ctxRef.current!,
            gainRef.current!
          );
        },
        stop: stopPlayback
      }));
  
      // на unmount
      useEffect(() => {
        return () => stopPlayback();
      }, []);
  
      return (
        <div className={styles.audioPlayer}>
          <button
            className={styles.playButton}
            onClick={isPlaying ? stopPlayback : handlePlay}
          >
            {isPlaying ? "■ Остановить" : "▶ Воспроизвести"}
          </button>
  
          <div className={styles.volumeControl}>
            <label>Громкость:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
  
          {showVisualization && (
            <div className={styles.visualization}>{code}</div>
          )}
        </div>
      );
    }
  );
  
  export default AudioPlayer;
  