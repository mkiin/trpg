"use client";

import { JSONViewer } from "@/ui/dev/json-viewer";
import { useFormMetadata } from "@conform-to/react";
import type { FC } from "react";

const FormDebug: FC = () => {
  const form = useFormMetadata();
  return (
    <JSONViewer
      value={{
        formValue: form.value,
        formErrors: form.allErrors,
      }}
    />
  );
};

export default FormDebug;
