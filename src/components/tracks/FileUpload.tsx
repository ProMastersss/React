import { Button } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

type Props = {
  setFile: Function;
  accept: string;
  children: ReactNode;
};

export default function FileUpload({ setFile, accept, children }: Props) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  return (
    <Button variant="contained" component="label">
      {children}
      <input hidden accept={accept} multiple type="file" onChange={onChange} />
    </Button>
  );
}
