import React, { useState } from "react";

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState("");
    const [selected, setSelected] = useState(null);

    const allImages = [
        { url: "https://picsum.photos/200?random=1", isAI: false },
        { url: "https://picsum.photos/200?random=2", isAI: false },
        { url: "https://placebear.com/200/200", isAI: true }, // "AI" yerine mizahî görsel
    ];

    const startGame = () => {
        setGameStarted(true);
        setMessage("");
        setSelected(null);
        setImages(shuffle(allImages));
    };

    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

    const handleSelect = (index) => {
        const chosen = images[index];
        setSelected(index);
        if (chosen.isAI) {
            setMessage("✅ Doğru tahmin! Bu görsel yapay zekâ tarafından üretilmiş.");
        } else {
            setMessage("❌ Yanlış! Bu görsel gerçek bir fotoğraf.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
            {!gameStarted ? (
                <div>
                    <h1>AI Guess Game</h1>
                    <p>
                        Kurallar: Üç görselden birini seç. Hangisi yapay zekâ tarafından
                        üretildi?
                    </p>
                    <button onClick={startGame}>Başla</button>
                </div>
            ) : (
                <div>
                    <h2>Hangisi AI?</h2>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                            marginTop: "20px",
                        }}
                    >
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img.url}
                                alt="option"
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    border:
                                        selected === i ? "4px solid #ff4d4f" : "2px solid #ccc",
                                    cursor: "pointer",
                                    borderRadius: "10px",
                                }}
                                onClick={() => handleSelect(i)}
                            />
                        ))}
                    </div>

                    {message && (
                        <div style={{ marginTop: "20px", fontSize: "18px" }}>
                            <p>{message}</p>
                            <button onClick={startGame}>Yeni Tur</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
