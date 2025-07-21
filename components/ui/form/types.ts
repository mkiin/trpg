import type { SubmissionResult } from "@conform-to/react";

export type FormState = Readonly<
  | {
      status: "success";
      message: string;
      submissionResult?: SubmissionResult;
    }
  | {
      status: "error";
      submissionResult?: SubmissionResult;
    }
  | {
      status: "error";
      message: string;
      submissionResult?: SubmissionResult;
    }
  | {
      status: "idle";
      submissionResult?: SubmissionResult;
    }
>;
