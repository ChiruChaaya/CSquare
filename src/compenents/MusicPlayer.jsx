import { useEffect, useRef } from "react";

export default function AutoMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const startMusic = () => {
      audioRef.current?.play().catch(() => {});
      document.removeEventListener("click", startMusic);
    };

    document.addEventListener("click", startMusic);

    return () => {
      document.removeEventListener("click", startMusic);
    };
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/music/atlasaudio-hope-piano-509806.mp3" type="audio/mpeg" />
    </audio>
  );
}