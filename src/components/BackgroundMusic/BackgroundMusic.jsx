/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { IconButton, Tooltip, Box } from "@mui/material";
import { FaVolumeUp, FaVolumeMute, FaPlay } from "react-icons/fa";
import { styled } from "@mui/material/styles";

const StyledIconButton = styled(IconButton)(() => ({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  zIndex: 1000,
  transition: "all 0.3s ease",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
}));

const PlayOverlay = styled(Box)(() => ({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "50%",
  padding: "8px",
  cursor: "pointer",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
}));

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Khởi tạo audio element
    const audio = new Audio();

    // Sử dụng đường dẫn tương đối từ thư mục public
    audio.src = "./nhacNen.mp3";

    // Xử lý lỗi khi tải audio
    audio.onerror = (e) => {
      console.error("Error loading audio:", e);
      setAudioError(true);
    };

    // Xử lý khi audio đã sẵn sàng
    audio.oncanplaythrough = () => {
      console.log("Audio is ready to play");
      audioRef.current = audio;
      audio.volume = 0.3;
      audio.loop = true;
    };

    // Load trạng thái từ localStorage
    const savedMuted = localStorage.getItem("musicMuted");
    if (savedMuted !== null) {
      setIsMuted(savedMuted === "true");
      if (audioRef.current) {
        audioRef.current.muted = savedMuted === "true";
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startPlaying = async () => {
    if (audioError) {
      console.error("Cannot play audio due to loading error");
      return;
    }

    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      }
    } catch (error) {
      console.error("Play failed:", error);
      setAudioError(true);
    }
  };

  const handleToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
        localStorage.setItem("musicMuted", "false");
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
        localStorage.setItem("musicMuted", "true");
      }
    }
  };

  if (audioError) {
    return null; // Không hiển thị gì nếu có lỗi
  }

  if (showPlayButton) {
    return (
      <Tooltip title="Bật nhạc nền">
        <PlayOverlay onClick={startPlaying}>
          <FaPlay size={24} color="#1976d2" />
        </PlayOverlay>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}>
      <StyledIconButton
        onClick={handleToggle}
        color="primary"
        aria-label="toggle music"
      >
        {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
      </StyledIconButton>
    </Tooltip>
  );
};

export default BackgroundMusic;
