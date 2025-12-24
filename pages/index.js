import Head from "next/head";
import { useEffect } from "react";
import QRCode from "qrcode";

export default function Home() {
  useEffect(() => {
    const el = document.getElementById("enpe-counter");
    let count = 99999999999900;
    setInterval(() => {
      count += Math.floor(Math.random() * 10);
      el.innerText = count.toLocaleString();
    }, 1000);

    const feed = document.querySelector(".cosmic-feed");
    for (let i = 0; i < 50; i++) {
      const p = document.createElement("div");
      p.style.width = "2px";
      p.style.height = "2px";
      p.style.background = "#0ff";
      p.style.position = "absolute";
      p.style.top = Math.random() * window.innerHeight + "px";
      p.style.left = Math.random() * window.innerWidth + "px";
      p.style.opacity = Math.random();
      feed.appendChild(p);
    }

    const audio = document.getElementById("bg-atmos");
    audio.volume = 0.3;
    audio.play();

    const canvas = document.getElementById("canvas-qr");
    QRCode.toCanvas(canvas, JSON.stringify({ id: "User-1234", val: "100T" }), {
      width: 120,
      color: { dark: "#ffcc00", light: "#0000" },
    });
  }, []);

  return (
    <div>
      <Head>
        <title>NEUROSPHERE OSI</title>
      </Head>
      <h1>NEUROSPHERE</h1>
      <p>Syncing Global Ledger: 100T ENPE...</p>
      <div id="enpe-counter"></div>
      <canvas id="canvas-qr"></canvas>
      <div className="cosmic-feed"></div>
      <audio id="bg-atmos" src="/bg-atmos.mp3" loop />
    </div>
  );
}
