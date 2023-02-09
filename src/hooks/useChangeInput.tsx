import { ChangeEvent, useState } from "react";

export default function useChangeInput(initialValue: string | number | Blob) {
  const [value, setValue] = useState(String(initialValue));

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return {
    value,
    onChange,
  };
}
