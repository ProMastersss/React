import Player from "@/components/tracks/Player";
import TrackList from "@/components/tracks/TrackList";
import ErrorLayout from "@/layouts/ErrorLayout";
import MainLayout from "@/layouts/MainLayout";
import { wrapper } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { fetchTracks } from "@/store/reducers/tracks";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../../styles/Tracks.module.scss";

export default function Index() {
  const router = useRouter();
  const { tracks, error } = useAppSelector((state) => state.tracks);

  if (error) {
    return <ErrorLayout error={error} />;
  }

  return (
    <MainLayout title="Cписок треков">
      <Grid container justifyContent={"center"}>
        <Card className={styles.tracks__card}>
          <Box p={3}>
            <Grid container justifyContent={"space-between"}>
              <Typography variant="h4" gutterBottom>
                Список треков
              </Typography>
              <Button onClick={() => router.push("/tracks/create")}>
                Загрузить
              </Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
      <Player />
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await store.dispatch(await fetchTracks());

    return {
      props: {},
    };
  }
);
