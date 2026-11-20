"use client";

import { useState, type FormEvent } from "react";
import {
  FormSubmitError,
  type FormFieldError,
  type FormFieldValue,
} from "@sitestar/sdk";
import { readTextField } from "@/lib/formData";
import { useSiteStar } from "./SiteStarProvider";

/** How the owner's dashboard groups these submissions. */
const CONTACT_FORM_TYPE = "contact";

/** Input names, which are also the keys of the submitted fields. */
const FIELD_NAME = {
  name: "name",
  email: "email",
  message: "message",
  // The platform rejects a submission that fills this; only bots see it.
  honeypot: "_honeypot",
} as const;

const UNEXPECTED_FAILURE_MESSAGE =
  "Something went wrong sending your message. Please email me instead.";

const UNAVAILABLE_MESSAGE =
  "The form can't reach the server right now. Please email me instead.";

type Submission =
  | { status: "editing" }
  | { status: "sending" }
  | { status: "sent" }
  | {
      status: "failed";
      message: string;
      fieldErrors: Readonly<Record<string, FormFieldError>>;
    };

const LABEL_CLASSNAME = "font-mono text-xs text-muted-foreground";

const INPUT_CLASSNAME =
  "mt-2 block w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground/70 hover:border-muted-foreground/40";

const FieldError = ({
  submission,
  fieldName,
}: {
  submission: Submission;
  fieldName: string;
}) => {
  if (submission.status !== "failed") {
    return null;
  }
  const fieldError = submission.fieldErrors[fieldName];
  if (fieldError === undefined) {
    return null;
  }
  return (
    <p className="mt-1.5 font-mono text-xs text-destructive">
      {fieldError.message}
    </p>
  );
};

const ContactForm = () => {
  const connection = useSiteStar();
  const [submission, setSubmission] = useState<Submission>({
    status: "editing",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (connection.status !== "ready") {
      throw new Error("The contact form was submitted before Site Star was ready.");
    }

    const formData = new FormData(event.currentTarget);
    const contactFields: Record<string, FormFieldValue> = {
      [FIELD_NAME.name]: readTextField(formData, FIELD_NAME.name).trim(),
      [FIELD_NAME.email]: readTextField(formData, FIELD_NAME.email).trim(),
      [FIELD_NAME.message]: readTextField(formData, FIELD_NAME.message).trim(),
      [FIELD_NAME.honeypot]: readTextField(formData, FIELD_NAME.honeypot),
    };

    setSubmission({ status: "sending" });
    try {
      await connection.sitestar.forms.submit(CONTACT_FORM_TYPE, contactFields);
      setSubmission({ status: "sent" });
    } catch (submitError) {
      if (submitError instanceof FormSubmitError) {
        setSubmission({
          status: "failed",
          message: submitError.message,
          fieldErrors: submitError.fieldErrors,
        });
        return;
      }
      // Not a refusal the SDK describes: give the visitor a way out, then let
      // it surface as an unhandled rejection, which the SDK reports.
      setSubmission({
        status: "failed",
        message: UNEXPECTED_FAILURE_MESSAGE,
        fieldErrors: {},
      });
      throw submitError;
    }
  };

  if (submission.status === "sent") {
    return (
      <p role="status" className="text-base leading-relaxed text-foreground">
        Thanks for reaching out. Your message is in, and I&rsquo;ll get back to
        you soon.
      </p>
    );
  }

  const isSending = submission.status === "sending";
  const canSubmit = connection.status === "ready" && !isSending;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={LABEL_CLASSNAME}>Name</span>
          <input
            type="text"
            name={FIELD_NAME.name}
            autoComplete="name"
            required
            className={INPUT_CLASSNAME}
          />
          <FieldError submission={submission} fieldName={FIELD_NAME.name} />
        </label>

        <label className="block">
          <span className={LABEL_CLASSNAME}>Email</span>
          <input
            type="email"
            name={FIELD_NAME.email}
            autoComplete="email"
            required
            className={INPUT_CLASSNAME}
          />
          <FieldError submission={submission} fieldName={FIELD_NAME.email} />
        </label>
      </div>

      <label className="block">
        <span className={LABEL_CLASSNAME}>Message</span>
        <textarea
          name={FIELD_NAME.message}
          rows={5}
          required
          className={`${INPUT_CLASSNAME} resize-y`}
        />
        <FieldError submission={submission} fieldName={FIELD_NAME.message} />
      </label>

      {/* Hidden from sight, the tab order and assistive tech; a person never fills it. */}
      <div aria-hidden="true" className="sr-only">
        <label>
          Leave this field empty
          <input
            type="text"
            name={FIELD_NAME.honeypot}
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-md border border-border px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-link hover:text-link disabled:pointer-events-none disabled:opacity-50"
        >
          {isSending ? "Sending…" : "Send message"}
        </button>

        {submission.status === "failed" ? (
          <p role="alert" className="font-mono text-xs text-destructive">
            {submission.message}
          </p>
        ) : null}

        {connection.status === "failed" ? (
          <p role="alert" className="font-mono text-xs text-destructive">
            {UNAVAILABLE_MESSAGE}
          </p>
        ) : null}
      </div>
    </form>
  );
};

export default ContactForm;
