import { PATH_NO_IMAGE } from "@/consts/common";
import { getServerUrl } from "@/helpers/common";
import { useAppDispatch } from "@/store/hooks";
import { setActiveTrack } from "@/store/reducers/player";
import { ITrack } from "@/types/tracks";
import { Delete, PlayArrow } from "@mui/icons-material";
import { Card, Grid, IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import styles from "../../styles/Tracks.module.scss";

type Props = {
  track: ITrack;
};

export default function TrackItem({ track }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const play = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setActiveTrack(track));
  };

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track.id)}
    >
      <IconButton onClick={play}>
        <PlayArrow />
      </IconButton>
      <Image
        width={70}
        height={70}
        src={track.picture ? getServerUrl(track.picture) : PATH_NO_IMAGE}
        alt={track.name}
      />
      <Grid className={styles.track__info} container direction="column">
        <div>{track.name}</div>
        <div>{track.artist}</div>
      </Grid>
      <IconButton
        className={styles.track__delete}
        onClick={(e) => e.stopPropagation()}
      >
        <Delete />
      </IconButton>
    </Card>
  );
}
