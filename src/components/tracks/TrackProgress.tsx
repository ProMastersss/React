import { Box, Slider } from "@mui/material";

type Props = {
  value: number;
  min: number;
  max: number;
  onChange: (event: Event, value: number | number[]) => void;
};

export default function TrackProgress({ min, max, value, onChange }: Props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width={200} m={2}>
        <Slider
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          defaultValue={0}
          aria-labelledby="input-slider"
        />
      </Box>
      <Box>
        {value} / {max}
      </Box>
    </Box>
  );
}
