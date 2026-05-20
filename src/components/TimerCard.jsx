import { useState, useEffect, useRef } from 'react';

const MODES = {
  pomodoro: {
    id: 'pomodoro',
    name: 'Pomodoro',
    duration: 25 * 60,
    label: 'Time to focus!',
  },
  shortBreak: {
    id: 'shortBreak',
    name: 'Short Break',
    duration: 5 * 60,
    label: 'Time for a break!',
  },
  longBreak: {
    id: 'longBreak',
    name: 'Long Break',
    duration: 15 * 60,
    label: 'Time for a long break!',
  },
};

export default function TimerCard() {
  const [activeMode, setActiveMode] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(MODES.pomodoro.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(1);
  const timerRef = useRef(null);

  // Play a gentle sound when the timer completes using Web Audio API
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      const playTone = (freq, startTime, duration) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        // Exponential decay for a natural bell/chime sound
        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      
      const now = audioCtx.currentTime;
      // Double chime (C5 then E5)
      playTone(523.25, now, 0.4); 
      playTone(659.25, now + 0.15, 0.6); 
    } catch (e) {
      console.warn("Failed to play synthesized chime:", e);
    }
  };

  // Update timeLeft when the mode changes
  const handleModeChange = (modeKey) => {
    setIsRunning(false);
    setActiveMode(modeKey);
    setTimeLeft(MODES[modeKey].duration);
  };

  // Timer tick effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer finished
            clearInterval(timerRef.current);
            setIsRunning(false);
            playChime();
            
            // Advance mode automatically or notify
            if (activeMode === 'pomodoro') {
              setSessionCount((s) => s + 1);
            }
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
  }, [isRunning, activeMode]);

  // Update page title dynamically
  useEffect(() => {
    const formatted = formatTime(timeLeft);
    const label = MODES[activeMode].label;
    document.title = `${formatted} | ${label}`;
    
    return () => {
      document.title = 'stand-up';
    };
  }, [timeLeft, activeMode]);

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle play/pause
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Reset current timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODES[activeMode].duration);
  };

  // Skip to next mode helper
  const skipTimer = () => {
    setIsRunning(false);
    if (activeMode === 'pomodoro') {
      // Typically alternate to short break, or long break every 4 sessions
      if (sessionCount % 4 === 0) {
        handleModeChange('longBreak');
      } else {
        handleModeChange('shortBreak');
      }
    } else {
      handleModeChange('pomodoro');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Timer Card Container */}
      <div className="w-full max-w-md md:max-w-lg bg-white rounded-3xl p-6 md:p-10 shadow-2xl shadow-indigo-100/80 border border-slate-100/50 transition-all duration-300">
        
        {/* Modes Selector Tabs */}
        <div className="flex justify-center gap-1.5 md:gap-2 mb-8 bg-slate-50 p-1.5 rounded-2xl">
          {Object.values(MODES).map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeChange(mode.id)}
              className={`flex-1 py-2 px-3 md:py-2.5 md:px-4 rounded-xl text-[13px] md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeMode === mode.id
                  ? 'bg-white text-[#16008b] shadow-sm'
                  : 'text-slate-500 hover:text-[#16008b] hover:bg-white/60'
              }`}
            >
              {mode.name}
            </button>
          ))}
        </div>

        {/* Big Countdown Timer */}
        <div className="text-7xl md:text-8xl font-extrabold tracking-tight text-[#16008b] text-center my-6 md:my-8 tabular-nums select-none">
          {formatTime(timeLeft)}
        </div>

        {/* Controller Row */}
        <div className="flex items-center justify-center gap-4 mt-6">
          {/* Reset Button */}
          <button
            onClick={resetTimer}
            title="Reset"
            className="p-3.5 rounded-2xl border border-slate-200 text-slate-400 hover:text-[#16008b] hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 cursor-pointer"
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

          {/* Main Action Button */}
          <button
            onClick={toggleTimer}
            className="w-44 md:w-52 py-3.5 bg-[#16008b] text-white font-bold text-lg md:text-xl rounded-2xl shadow-lg shadow-indigo-200 hover:bg-[#1e05b1] hover:shadow-indigo-300 transition-all duration-200 cursor-pointer active:scale-95 text-center uppercase tracking-wide"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>

          {/* Skip Button */}
          <button
            onClick={skipTimer}
            title="Skip"
            className="p-3.5 rounded-2xl border border-slate-200 text-slate-400 hover:text-[#16008b] hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 cursor-pointer"
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
                d="M3 8.25V18a.75.75 0 001.22.58l9.75-8a.75.75 0 000-1.16l-9.75-8A.75.75 0 003 2.25v6m11.25 0V18a.75.75 0 001.22.58l9.75-8a.75.75 0 000-1.16l-9.75-8A.75.75 0 0014.25 2.25v6"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Info Label below the Card */}
      <div className="text-center mt-6 select-none">
        <span className="text-slate-400 text-xs md:text-sm font-semibold block mb-1">
          #{sessionCount}
        </span>
        <span className="text-lg md:text-xl font-bold text-[#16008b]">
          {MODES[activeMode].label}
        </span>
      </div>
    </div>
  );
}
