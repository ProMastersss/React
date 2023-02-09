import FileUpload from "@/components/tracks/FileUpload";
import StepWrapper from "@/components/tracks/StepWrapper";
import { PATH_NO_IMAGE } from "@/consts/common";
import useChangeInput from "@/hooks/useChangeInput";
import ErrorLayout from "@/layouts/ErrorLayout";
import MainLayout from "@/layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addTrack } from "@/store/reducers/tracks";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {};

const steps = ["Информация о треке", "Загрузите обложку", "Загрузите трек"];

export default function Create({}: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { error } = useAppSelector((state) => state.tracks);
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState<File | null>(null);
  const [pictureData, setPictureData] = useState<string | undefined>();
  const [audio, setAudio] = useState<File | null>(null);
  const name = useChangeInput("");
  const text = useChangeInput("");
  const artist = useChangeInput("");

  const handlePicture = (file: File) => {
    if (file) {
      setPicture(file);
      if (FileReader) {
        const fr = new FileReader();
        fr.readAsDataURL(file);

        fr.onload = function () {
          setPictureData(fr.result?.toString());
        };
      }
    }
  };

  const next = () => {
    if (activeStep !== steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      const form = new FormData();
      if (name.value) {
        form.append("name", name.value);
      }
      if (artist.value) {
        form.append("artist", artist.value);
      }
      if (text.value) {
        form.append("text", text.value);
      }
      if (picture) {
        form.append("picture", picture);
      }
      if (audio) {
        form.append("audio", audio);
      }
      dispatch(addTrack(form)).then((res) => {
        if (res.type !== "tracks/addTrack/rejected") {
          router.push("/tracks");
        }
      });
    }
  };

  const back = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  if (error) {
    return <ErrorLayout error={error} />;
  }

  return (
    <MainLayout title="Страница загрузки трека">
      <StepWrapper steps={steps} activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" rowSpacing={2}>
            <Grid item>
              <Typography variant="h5">{steps[0]}</Typography>
            </Grid>
            <Grid item>
              <TextField {...name} label="Название трека" fullWidth />
            </Grid>
            <Grid item>
              <TextField {...artist} label="Название исполнителя" fullWidth />
            </Grid>
            <Grid item>
              <TextField
                {...text}
                label="Текст песни"
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        )}
        {activeStep === 1 && (
          <>
            <Typography variant="h5">{steps[1]}</Typography>
            <Grid
              container
              direction="column"
              rowSpacing={2}
              m={2}
              alignContent="center"
              alignItems="center"
            >
              <Grid item>
                <Image
                  width="200"
                  height="200"
                  src={pictureData ?? PATH_NO_IMAGE}
                  alt="Picture of track"
                />
              </Grid>
              <Grid item>
                <FileUpload
                  accept="image/jpeg, image/png"
                  setFile={handlePicture}
                >
                  Выбрать обложку
                </FileUpload>
              </Grid>
            </Grid>
          </>
        )}
        {activeStep === 2 && (
          <>
            <Typography variant="h5">{steps[2]}</Typography>
            <Grid
              container
              direction="column"
              rowSpacing={2}
              m={2}
              alignContent="center"
              alignItems="center"
            >
              <Grid item>
                <Image
                  width="200"
                  height="200"
                  src={pictureData ?? PATH_NO_IMAGE}
                  alt="Picture of track"
                />
              </Grid>
              <Typography component="span">
                {audio ? audio.name : "Трек не выбран"}
              </Typography>
              <Grid item>
                <FileUpload accept="audio/mpeg" setFile={setAudio}>
                  Выбрать трек
                </FileUpload>
              </Grid>
            </Grid>
          </>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button onClick={back} disabled={activeStep <= 0}>
          Назад
        </Button>
        <Button onClick={next} disabled={activeStep === steps.length}>
          Далее
        </Button>
      </Grid>
    </MainLayout>
  );
}
