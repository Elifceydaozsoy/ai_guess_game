import React, { useState } from "react";

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState("");
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);

    const allImages = [
        { url: "https://picsum.photos/200?random=1", isAI: false },
        { url: "https://picsum.photos/200?random=2", isAI: false },
        { url: "https://placebear.com/200/200", isAI: true }, // AI görsel
    ];

    const startGame = () => {
        setGameStarted(true);
        setMessage("");
        setSelected(null);
        setImages(shuffle(allImages));
        setRound((prev) => prev + 1);
    };

    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

    const handleSelect = (index) => {
        if (selected !== null) return; // Sadece bir seçim yapılabilir
        const chosen = images[index];
        setSelected(index);

        if (chosen.isAI) {
            setScore((prev) => prev + 1);
            setMessage("✅ Doğru tahmin! Bu görsel yapay zekâ tarafından üretilmiş.");
        } else {
            setMessage("❌ Yanlış! Bu görsel gerçek bir fotoğraf.");
        }
    };

    const endGame = () => {
        setGameStarted(false);
        setMessage("");
        setSelected(null);
        setScore(0);
        setRound(0);
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
                        {images.map((img, i) => {
                            // Seçim ve doğruluk durumuna göre border rengini belirle
                            let borderColor = "2px solid #ccc";
                            if (selected !== null) {
                                if (i === selected) {
                                    borderColor = img.isAI ? "4px solid green" : "4px solid red";
                                } else if (img.isAI) {
                                    borderColor = "4px solid green"; // doğru AI görseli göster
                                }
                            }

                            return (
                                <img
                                    key={i}
                                    src={img.url}
                                    alt="option"
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        border: borderColor,
                                        cursor: selected === null ? "pointer" : "default",
                                        borderRadius: "10px",
                                    }}
                                    onClick={() => handleSelect(i)}
                                />
                            );
                        })}
                    </div>

                    <div style={{ marginTop: "20px", fontSize: "18px" }}>
                        <p>Tur: {round}</p>
                        <p>Puan: {score}</p>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        {message && <p>{message}</p>}
                        <button onClick={startGame} style={{ marginRight: "10px" }}>
                            Yeni Tur
                        </button>
                        <button onClick={endGame}>Oyunu Bitir</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
