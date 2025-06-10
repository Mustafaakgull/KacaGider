import { useEffect, useState } from "react";
import { Box, Typography, Chip, Fade } from "@mui/material";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";

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
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: "#242424",
            borderRadius: "8px",
            padding: "12px 24px",
          }}
      >
        <Fade in={secondsLeft > 0}>
          <Chip
              icon={
                <QueryBuilderOutlinedIcon
                    sx={{
                      color: "#fbbf24 !important", // <-- zorunlu override
                      fontSize: 30,
                      marginRight: '3px !important',
                    }}
                />
              }
              label={`${secondsLeft}s`}
              sx={{
                backgroundColor: "transparent",
                border: "none",
                ".MuiChip-label": {
                  color: "white",
                  fontSize: "22px",
                  fontWeight: "bold",
                },
                ".MuiChip-icon": {
                  color: "#fbbf24 !important",
                },
              }}
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