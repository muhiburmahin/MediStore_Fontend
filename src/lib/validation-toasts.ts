import { toast } from "sonner";
import type { ZodError } from "zod";

type FlatErrors = {
  formErrors?: string[];
  fieldErrors?: Record<string, string[] | undefined>;
};

export function toastZodIssues(error: ZodError) {
  for (const issue of error.issues) {
    const path = issue.path.length ? issue.path.join(".") : "form";
    toast.error(`${path}: ${issue.message}`);
  }
}

export function toastApiFlattenedErrors(errors: FlatErrors | undefined) {
  if (!errors) return;
  for (const msg of errors.formErrors ?? []) {
    if (msg) toast.error(msg);
  }
  for (const [field, msgs] of Object.entries(errors.fieldErrors ?? {})) {
    for (const m of msgs ?? []) {
      if (m) toast.error(`${field}: ${m}`);
    }
  }
}
