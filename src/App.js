import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [msgKey, setMsgKey] = useState(0); // unique key for reanimation
  const [phase, setPhase] = useState("idle"); // "idle", "thinking", "result"

  const handleClick = () => {
    const parsedAge = Number(age);
    if (!parsedAge || isNaN(parsedAge) || parsedAge <= 0) {
      setMessage("Please enter a valid age!");
      setPhase("result");
      setMsgKey((k) => k + 1);
      return;
    }

    // Start the thinking phase
    setPhase("thinking");
    setMsgKey((k) => k + 1);

    // After 1.2s, show the result
    setTimeout(() => {
      const safeAge = Math.min(parsedAge, 18);
      const batchYear = 2025 + (18 - safeAge);
      setMessage(`Apply to YC Fall ${batchYear} batch.`);
      setPhase("result");
      setMsgKey((k) => k + 1);
    }, 1200);
  }; // closed handleClick properly

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-indigo-200 to-blue-300 font-sans">
      <motion.h1
        className="text-5xl font-extrabold text-indigo-800 mb-10 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        What Should I Do With My Life?
      </motion.h1>

      <motion.div
        className="flex flex-col items-center bg-white/70 p-8 rounded-2xl shadow-2xl backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="p-3 w-48 rounded-xl shadow-inner text-center focus:outline-none focus:ring-4 focus:ring-indigo-400 mb-4"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
        >
          Find Out
        </motion.button>

        <AnimatePresence mode="wait">
          {phase === "thinking" && (
            <motion.p
              key={msgKey}
              className="mt-6 text-xl text-indigo-800 italic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              Calculating your destiny...
            </motion.p>
          )}

          {phase === "result" && (
            <motion.p
              key={msgKey}
              className="mt-6 text-2xl text-indigo-900 font-medium"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="mt-12 text-indigo-800/70 text-sm">
        © {new Date().getFullYear()} Future Founder Predictor 🚀
      </footer>
    </div>
  );
}

export default App;
