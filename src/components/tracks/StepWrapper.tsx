import { Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { ReactNode } from "react";
import styles from "../../styles/Tracks.module.scss";

type Props = {
  steps: string[];
  activeStep: number;
  children: ReactNode;
};

export default function StepWrapper({ steps, activeStep, children }: Props) {
  return (
    <Container className={styles["step-wrapper"]}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid className={styles.content} container justifyContent="center">
        <Card className={styles.card}>{children}</Card>
      </Grid>
    </Container>
  );
}
