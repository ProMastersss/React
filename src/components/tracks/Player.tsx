/* eslint-disable react-hooks/exhaustive-deps */
import { getServerUrl } from "@/helpers/common";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { MouseEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  pause as pauseTrack,
  play as playTrack,
  setCurrentTime,
  setDuration,
  setVolume,
} from "../../store/reducers/player";
import styles from "../../styles/Tracks.module.scss";
import TrackProgress from "./TrackProgress";

let audio: HTMLAudioElement;

export default function Player() {
  const dispatch = useAppDispatch();
  const { isPause, currentTime, volume, duration, activeTrack } =
    useAppSelector((state) => state.player);

  const setTrack = () => {
    if (activeTrack) {
      audio.src = getServerUrl(activeTrack.audio);
      audio.currentTime = currentTime;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        dispatch(setDuration(Math.ceil(audio.duration)));
      };
      audio.ontimeupdate = () => {
        dispatch(setCurrentTime(Math.ceil(audio.currentTime)));
      };
    }
  };

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setTrack();
    }
  }, [activeTrack]);

  const play = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isPause) {
      dispatch(playTrack());
      audio.play();
    } else {
      dispatch(pauseTrack());
      audio.pause();
    }
  };

  const changeTimePlay = (event: Event, value: number | number[]) => {
    if (typeof value === "number") {
      dispatch(setCurrentTime(value));
      audio.currentTime = value;
    }
  };

  const changeVolume = (event: Event, value: number | number[]) => {
    if (typeof value === "number") {
      dispatch(setVolume(value));
      audio.volume = value / 100;
    }
  };

  if (!activeTrack) {
    return null;
  }

  return (
    <div className={styles.player}>
      <div className={styles.player__wrapper}>
        <IconButton onClick={play}>
          {isPause ? <PlayArrow /> : <Pause />}
        </IconButton>
        <Grid className={styles.player__info} container direction="column">
          <div>{activeTrack.name}</div>
          <div>{activeTrack.artist}</div>
        </Grid>
        <TrackProgress
          min={0}
          max={duration}
          value={currentTime}
          onChange={changeTimePlay}
        />
        <VolumeUp className={styles["player__volume-up"]} />
        <TrackProgress
          min={0}
          max={100}
          value={volume}
          onChange={changeVolume}
        />
      </div>
    </div>
  );
}
