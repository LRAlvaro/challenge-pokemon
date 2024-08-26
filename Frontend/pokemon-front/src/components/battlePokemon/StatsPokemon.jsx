import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export default function StatsBar({ statName, statValue }) {
  const normalValue = (statValue / 6) * 100;

  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 8,
    width: "95%",
    margin: "auto",
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#d9d9d9",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 6,
      backgroundColor: "#75fb4d",
    },
  }));

  const styleTypography = {
    textAlign: "initial",
    fontSize: "13px",
    fontWeight: "bold",
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography typography={styleTypography} sx={{ mt: 1, ml: 1.5 }}>
        {statName}
      </Typography>
      <BorderLinearProgress variant="determinate" value={normalValue} />
    </Box>
  );
}
