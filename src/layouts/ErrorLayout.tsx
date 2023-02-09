import { Alert } from "@mui/material";
import MainLayout from "./MainLayout";

type Props = {
  error: string;
};

export default function ErrorLayout({ error }: Props) {
  return (
    <MainLayout title="Error">
      {<Alert severity="error">{error}</Alert>}
    </MainLayout>
  );
}
