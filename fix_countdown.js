const fs = require('fs');
let code = fs.readFileSync('src/components/templates/CelebrationCarnivalTemplate.tsx', 'utf8');

// The countdown is a state variable. The interval clears itself when countdown reaches 1.
// Let's make sure it's saved to a ref and cleared on unmount.
// Add useRef import if not there (it is not there, I replaced it when fixing lint).
code = code.replace(/import \{ useState, useEffect \} from "react";/, 'import { useState, useEffect, useRef } from "react";');

// Find the handleSurprise function
code = code.replace(
`  const handleSurprise = () => {
    setCountdown(3);
    const countInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countInterval);
          setStage('surprise');
          triggerConfetti("huge");
          setTimeout(() => {
            setStage('finale');
          }, 5000);
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };`,
`  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  const handleSurprise = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setCountdown(3);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          setStage('surprise');
          triggerConfetti("huge");
          setTimeout(() => {
            setStage('finale');
          }, 5000);
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };`
);

fs.writeFileSync('src/components/templates/CelebrationCarnivalTemplate.tsx', code);
