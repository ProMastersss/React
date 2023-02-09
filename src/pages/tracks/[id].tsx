import { PATH_NO_IMAGE } from "@/consts/common";
import { getServerUrl } from "@/helpers/common";
import useChangeInput from "@/hooks/useChangeInput";
import ErrorLayout from "@/layouts/ErrorLayout";
import MainLayout from "@/layouts/MainLayout";
import { wrapper } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addComment, getTrack } from "@/store/reducers/tracks";
import { IComment, ITrack } from "@/types/tracks";
import CommentIcon from "@mui/icons-material/Comment";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Tracks.module.scss";

type Props = {
  trackServer: ITrack;
};

export default function TrackPage({ trackServer }: Props) {
  const [track, setTrack] = useState(trackServer);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.tracks);
  const router = useRouter();
  const comment = useChangeInput("");

  const sendComment = () => {
    dispatch(
      addComment({
        trackId: track.id,
        text: comment.value,
      })
    ).then((res) => {
      if (res.type !== "tracks/addComment/rejected") {
        if (Array.isArray(track.comments)) {
          track.comments.push(res.payload as IComment);
        } else {
          track.comments = [res.payload as IComment];
        }
        setTrack({ ...track });
      }
    });
  };

  if (error) {
    return <ErrorLayout error={error} />;
  }

  return (
    <MainLayout
      title={`Трек${track.name ? " | " + track.name : ""}`}
      keywords={[track.name, track.artist].join(", ")}
    >
      <Box className={styles.page}>
        <Card className={styles.tracks__card}>
          <Button
            className={styles["btn-back"]}
            variant="outlined"
            onClick={() => router.push("/tracks")}
          >
            К списку
          </Button>
          <Grid container className={styles.info}>
            <Image
              priority
              width={200}
              height={200}
              alt={track.name}
              src={track.picture ? getServerUrl(track.picture) : PATH_NO_IMAGE}
            />
            <Box ml={2}>
              <Typography variant="h5">Название: {track.name}</Typography>
              <Typography variant="h5">Испольнитель: {track.artist}</Typography>
              <Typography variant="h5">
                Прослушиваний: {track.listen}
              </Typography>
            </Box>
          </Grid>

          <Typography variant="h5">Текст песни</Typography>
          <p>{track.text}</p>

          <Typography variant="h5">Комментарии</Typography>

          <Grid container direction="column" rowSpacing={1}>
            <Grid item>
              <TextField
                label="Вы"
                value={track.user.email}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item>
              <TextField
                {...comment}
                label="Комментарий"
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item>
              <Button onClick={sendComment}>Отправить</Button>
            </Grid>
          </Grid>

          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {Array.isArray(track.comments) &&
              track.comments.map((comment) => (
                <ListItem key={comment.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <CommentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={track.user.email}
                    secondary={comment.text}
                  />
                </ListItem>
              ))}
          </List>
        </Card>
      </Box>
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      let trackServer;
      if (params && typeof params.id === "string") {
        trackServer = await getTrack(params.id);
      }

      return {
        props: { trackServer },
      };
    }
);
