// import { useEffect, useState } from "react";
//
// function CountdownTimer({ deadline }) {
//   const [secondsLeft, setSecondsLeft] = useState(
//     Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
//   );
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const diff = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
//       setSecondsLeft(diff);
//     }, 1000);
//
//     return () => clearInterval(interval);
//   }, [deadline]);
//
//   return <div>Time left: {secondsLeft} seconds</div>;
// }
//
// export default CountdownTimer;
import { useEffect, useState } from "react";
import { Box, Typography, Chip, Fade } from "@mui/material";

function CountdownTimer({ deadline }) {
  const [secondsLeft, setSecondsLeft] = useState(
    Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSecondsLeft(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={2}
      sx={{ backgroundColor: "#1e1e1e", borderRadius: 2, boxShadow: 1 }}
    >

      <Fade in={secondsLeft > 0}>
        <Chip
          label={`Time left: ${secondsLeft}s`}
          color={secondsLeft > 10 ? "primary" : "warning"}
          variant="outlined"
          sx={{ fontSize: "1rem", padding: "0.5rem 1rem" }}
        />
      </Fade>
      {secondsLeft === 0 && (
        <Typography variant="body1" mt={2} color="error">
          Time’s up!
        </Typography>
      )}
    </Box>
  );
}

export default CountdownTimer;
