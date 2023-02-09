import AppBar from "@/components/AppBar";
import { Container } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";
import styles from "../styles/MainLayout.module.scss";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
};

export default function MainLayout({
  children,
  title,
  description,
  keywords,
}: Props) {
  return (
    <>
      <Head>
        <title>{title || "Музыкальная площадка"}</title>
        <meta
          name="description"
          content={
            "Здесь можешь загрузить мвои треки и послушать другие. " +
              description ?? ""
          }
        />
        <meta name="robots" content="index follow" />
        <meta
          name="keywords"
          content={keywords || "Музыка, треки, комментарии"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AppBar />
      <Container className={styles.container}>{children}</Container>
    </>
  );
}
