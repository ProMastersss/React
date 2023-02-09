import { ITrack } from "@/types/tracks";
import { Box, Grid } from "@mui/material";
import TrackItem from "./TrackItem";

type Props = {
  tracks: ITrack[];
};

export default function TrackList({ tracks }: Props) {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track}></TrackItem>
        ))}
      </Box>
    </Grid>
  );
}
