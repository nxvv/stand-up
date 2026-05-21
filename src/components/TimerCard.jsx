import { useState, useEffect, useRef } from 'react';

const INITIAL_TIME = 45 * 60; // 45 minutes in seconds

export default function TimerCard() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Play a modern ascending arpeggio when starting
  const playStartSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playTone = (freq, startTime, duration) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        // Soft volume envelope to avoid clicking sounds
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      
      const now = audioCtx.currentTime;
      // Ascending C major arpeggio (C4 -> E4 -> G4 -> C5)
      playTone(261.63, now, 0.25);
      playTone(329.63, now + 0.08, 0.25);
      playTone(392.00, now + 0.16, 0.25);
      playTone(523.25, now + 0.24, 0.4);
    } catch (e) {
      console.warn("Failed to play start chime:", e);
    }
  };

  // Play a high-pitched double chime when finished
  const playCompleteSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playTone = (freq, startTime, duration) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      
      const now = audioCtx.currentTime;
      // High-pitched notification double chime (A5 then C6)
      playTone(880.00, now, 0.4);
      playTone(1046.50, now + 0.15, 0.6);
    } catch (e) {
      console.warn("Failed to play complete chime:", e);
    }
  };

  // Formatter for MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer Tick Effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  // Effect to play complete sound when timeLeft reaches 0
  useEffect(() => {
    if (timeLeft === 0) {
      playCompleteSound();
    }
  }, [timeLeft]);

  // Document Title update Effect
  useEffect(() => {
    const formatted = formatTime(timeLeft);
    if (isRunning) {
      document.title = `(${formatted}) Travail en cours...`;
    } else if (timeLeft < INITIAL_TIME && timeLeft > 0) {
      document.title = `(${formatted}) En pause`;
    } else if (timeLeft === 0) {
      document.title = 'Terminé !';
    } else {
      document.title = 'stand-up';
    }

    return () => {
      document.title = 'stand-up';
    };
  }, [timeLeft, isRunning]);

  // Click handler for Start / Pause
  const handleToggle = () => {
    if (!isRunning) {
      // Play start sound when commencing/resuming the timer
      playStartSound();
    }
    setIsRunning(!isRunning);
  };

  // Click handler for stopping/resetting the timer
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(INITIAL_TIME);
  };

  // Get status message based on state
  const getStatusMessage = () => {
    if (timeLeft === 0) {
      return "Félicitations, session terminée !";
    }
    if (isRunning) {
      return "Travail en cours... Restez concentré !";
    }
    if (timeLeft < INITIAL_TIME) {
      return "En pause. Prêt à reprendre ?";
    }
    return "Il est temps de bosser !";
  };

  return (
    <div className="w-full max-w-md md:max-w-lg bg-white rounded-3xl p-6 md:p-10 shadow-2xl shadow-indigo-100/80 border border-slate-100/50 transition-all duration-300">
      <div className="text-6xl md:text-7xl font-medium tracking-tight text-[#16008b] text-center my-6 md:my-8 tabular-nums select-none">
        {formatTime(timeLeft)}
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        {/* Main Action Button */}
        <button
          onClick={handleToggle}
          className="px-7 py-3.5 bg-[#16008b] text-white font-medium text-xs md:text-lg rounded-2xl shadow-lg shadow-indigo-200 hover:bg-[#1e05b1] hover:shadow-indigo-300 transition-all duration-200 cursor-pointer active:scale-95 text-center uppercase tracking-wide min-w-[140px]"
        >
          {isRunning ? 'Pause' : 'Démarrer'}
        </button>
        {/* Reset / Stop Button */}
        <button
          onClick={handleReset}
          title="Arrêter et réinitialiser"
          className="p-3.5 rounded-2xl border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all active:scale-95 cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
      <div className="text-center mt-10 select-none h-6">
        <span className="text-lg md:text-xl font-medium text-[#16008b] transition-all duration-300">
          {getStatusMessage()}
        </span>
      </div>
    </div>
  );
}