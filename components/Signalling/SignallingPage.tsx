import React, { FC, useState, useRef, useEffect } from "react";
import styles from "./SignallingPage.module.scss";
import { supabase } from "../../src/supabaseClient";
import { getOrCreateUsername } from "../../src/generateUsername";

const russianMorse: Record<string, string> = {
  а: "•-", б: "-•••", в: "•--", г: "--•", д: "-••",
  е: "•", ж: "•••-", з: "--••", и: "••", й: "•---",
  к: "-•-", л: "•-••", м: "--", н: "-•", о: "---",
  п: "•--•", р: "•-•", с: "•••", т: "-", у: "••-",
  ф: "••-•", х: "••••", ц: "-•-•", ч: "---•", ш: "----",
  щ: "--•-", ы: "-•--", ь: "-••-", э: "••-••", ю: "••--",
  я: "•-.-",
  1: "•----", 2: "••---", 3: "•••--", 4: "••••-", 5: "•••••",
  6: "-••••", 7: "--•••", 8: "---••", 9: "----•", 0: "-----",
};

const inverseMorse = Object.entries(russianMorse).reduce((acc, [ltr, code]) => {
  acc[code] = ltr;
  return acc;
}, {} as Record<string, string>);

function decodeLetter(buf: string): string {
  return inverseMorse[buf] || "?";
}

const SignallingPage: FC = () => {
  const [buffer, setBuffer] = useState("");
  const [text, setText] = useState("");
  const [volume, setVolume] = useState(0.15);
  const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [showMorse, setShowMorse] = useState(true);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const wordTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const username = useRef<string>("Аноним");
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const bufferRef = useRef<string>("");
  const letterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const downTs = useRef<number>(0);

  const initAudio = () => {
    if (!ctxRef.current) {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.gain.value = volume;
      gain.connect(ctx.destination);
      ctxRef.current = ctx;
      gainRef.current = gain;
    }
  };

  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.value = volume;
  }, [volume]);

  const startTone = () => {
    initAudio();
    if (ctxRef.current && gainRef.current) {
      const osc = ctxRef.current.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 600;
      osc.connect(gainRef.current);
      osc.start();
      oscRef.current = osc;
    }
  };

  const stopTone = () => {
    if (oscRef.current && ctxRef.current) {
      oscRef.current.stop(ctxRef.current.currentTime + 0.02);
      oscRef.current = null;
    }
  };

  const onMouseDown = () => {
    startTone();
    downTs.current = performance.now();
    if (letterTimeoutRef.current) clearTimeout(letterTimeoutRef.current);
  };

  const onMouseUp = () => {
    const dt = performance.now() - downTs.current;
    stopTone();
    const sym = dt > 250 ? "-" : "•";
    bufferRef.current += sym;
    setBuffer(bufferRef.current);

    if (letterTimeoutRef.current) clearTimeout(letterTimeoutRef.current);
    if (wordTimeoutRef.current) clearTimeout(wordTimeoutRef.current);

    letterTimeoutRef.current = setTimeout(() => {
      const letter = decodeLetter(bufferRef.current);
      setText((t) => t + letter);
      bufferRef.current = "";
      setBuffer("");
      letterTimeoutRef.current = null;

      wordTimeoutRef.current = setTimeout(() => {
        setText((t) => t + " ");
        wordTimeoutRef.current = null;
      }, 1000);
    }, 300);
  };

  const handleBroadcast = async () => {
    if (!text.trim()) return;
    await supabase.from("messages").insert({
      username: username.current,
      message: text
    });
    setText("");
    bufferRef.current = "";
    setBuffer("");
  };

  useEffect(() => {
    const setup = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      username.current =
        user?.user_metadata?.nickname ??
        user?.email ??
        getOrCreateUsername();

      if (username.current) {
        const presenceChannel = supabase.channel("presence:chat", {
          config: { presence: { key: username.current } },
        });

        presenceChannel
          .on("presence", { event: "sync" }, () => {
            const state = presenceChannel.presenceState();
            setOnlineUsers(Object.keys(state));
          })
          .subscribe(async () => {
            await presenceChannel.track({ online_at: new Date().toISOString() });
          });
      }
    };

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(50);
      if (data) {
        setMessages(data.map((m) => ({ username: m.username, message: m.message })));
      }
    };

    fetchMessages();
    setup();

    const msgChannel = supabase
      .channel("realtime:messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const newMsg = {
          username: payload.new.username,
          message: payload.new.message,
        };
        setMessages((prev) => [...prev, newMsg].slice(-50));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(msgChannel);
    };
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.container}>
      {showMorse && (
        <aside className={styles.sidebar}>
          <h3>Таблица Морзе</h3>
          <ul className={styles.morseList}>
            {Object.entries(russianMorse).map(([ltr, code]) => (
              <li key={ltr}>
                <span className={styles.letter}>{ltr}</span>
                <span className={styles.code}>{code}</span>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <main className={styles.main}>
        <section className={styles.chatArea}>
          <div className={styles.chatHeader}>
            <button onClick={() => setShowMorse(!showMorse)} className={styles.toggleButton}>
              {showMorse ? "скрыть таблицу Морзе" : "показать таблицу Морзе"}
            </button>
            <h2 className={styles.title}>Чат</h2>
            <span className={styles.currentUser}>Вы: {username.current}</span>
          </div>

          <div ref={chatBoxRef} className={styles.chatBox}>
            {messages.map((msg, idx) => (
              <div key={idx} className={styles.chatMessage}>
                <span className={styles.chatUsername}>{msg.username}</span>
                <span className={styles.chatText}>{msg.message}</span>
              </div>
            ))}
          </div>

          <div className={styles.clearWrapper}>
            {text && (
              <button className={styles.clearButton} onClick={() => {
                setText("");
                bufferRef.current = "";
                setBuffer("");
              }}>✕ Очистить</button>
            )}
          </div>

          <div className={styles.status}>
            <div>Код буквы: <code>{buffer || "–"}</code></div>
            <div>Текст: <strong>{text || "(пусто)"}</strong></div>
          </div>

          <div className={styles.volumeSection}>
            <label>Громкость: {Math.round(volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
            <div className={styles.volumeLine} />
          </div>

          <div className={styles.buttonWrapper}>
            <button className={styles.btn1} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
              Сигнал
            </button>
            <button className={styles.btn2} onClick={handleBroadcast} disabled={!text}>
              Передать
            </button>
          </div>
        </section>
      </main>

      <aside className={styles.onlineSidebar}>
        <h3>Онлайн</h3>
        <ul className={styles.userList}>
          {onlineUsers.map((user, i) => (
            <li key={i}>
              {user === username.current ? `${user} (вы)` : user}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default SignallingPage;
