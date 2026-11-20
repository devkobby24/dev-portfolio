"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactElement,
} from "react";
import { FiMessageSquare, FiX } from "react-icons/fi";
import type {
  ChatLeadField,
  ChatLeadFieldName,
  ChatMessage,
  ChatService,
  ChatState,
  ChatStatus,
  ChatStrings,
  ChatUiFacts,
} from "@sitestar/sdk";
import { readTextField } from "@/lib/formData";
import { useSiteStar } from "./SiteStarProvider";

type ResolvedChatStrings = Required<ChatStrings>;

type ChatViewProps = {
  chat: ChatService;
  chatState: ChatState;
};

type ChatStore = {
  subscribe: (onStoreChange: () => void) => () => void;
  getSnapshot: () => ChatState;
};

/**
 * Adapts the chat controller to useSyncExternalStore. `chat.state` builds a
 * new object on every read, so the snapshot is held here and replaced only
 * when the controller reports a change; reading it fresh on each render would
 * never settle.
 */
const createChatStore = (chat: ChatService): ChatStore => {
  let latestState = chat.state;
  return {
    subscribe: (onStoreChange) => {
      const unsubscribe = chat.onChange((nextState) => {
        latestState = nextState;
        onStoreChange();
      });
      // onChange reports only later changes. Re-read once, so a change that
      // landed between the first render and this subscription still shows.
      latestState = chat.state;
      onStoreChange();
      return unsubscribe;
    },
    getSnapshot: () => latestState,
  };
};

const CORNER_CLASSNAME: Record<ChatUiFacts["position"], string> = {
  "bottom-right": "right-4 sm:right-6",
  "bottom-left": "left-4 sm:left-6",
};

/**
 * The copy for each status. A failure prefers the controller's own
 * `errorMessage`, which says why; these are what shows when it is empty.
 */
const STATUS_COPY_KEY: Record<ChatStatus, keyof ResolvedChatStrings | null> = {
  idle: null,
  session_loading: "sessionLoading",
  turnstile_required: "verificationPrompt",
  sending: "sendingMessage",
  awaiting_reply: "awaitingReply",
  reply_delayed: "replyDelayed",
  human_handling: "humanHandling",
  reply_failed: "replyFailed",
  agent_unavailable: "agentUnavailable",
  unavailable: "chatUnavailable",
  error: "sendFailed",
  ended: "conversationEnded",
};

const RETRYABLE_STATUSES: ReadonlySet<ChatStatus> = new Set<ChatStatus>([
  "reply_failed",
  "agent_unavailable",
  "unavailable",
  "error",
]);

const describeStatus = (
  chatState: ChatState,
  strings: ResolvedChatStrings
): string => {
  if (chatState.errorMessage !== "") {
    return chatState.errorMessage;
  }
  const copyKey = STATUS_COPY_KEY[chatState.status];
  return copyKey === null ? "" : strings[copyKey];
};

type LeadFieldInput = {
  fieldName: ChatLeadFieldName;
  label: string;
  placeholder: string;
  inputType: "text" | "email" | "tel";
  autoComplete: string;
  isRequired: boolean;
};

/** The SDK's own defaults for the lead form; it does not export them. */
const LEAD_FIELD_DEFAULTS: Record<
  ChatLeadFieldName,
  Omit<LeadFieldInput, "fieldName" | "isRequired">
> = {
  name: {
    label: "Name",
    placeholder: "Your name",
    inputType: "text",
    autoComplete: "name",
  },
  email: {
    label: "Email",
    placeholder: "you@example.com",
    inputType: "email",
    autoComplete: "email",
  },
  phone: {
    label: "Phone",
    placeholder: "+1 (555) 000-0000",
    inputType: "tel",
    autoComplete: "tel",
  },
};

/** A bare field name means a required field with the default copy. */
const toLeadFieldInput = (leadField: ChatLeadField): LeadFieldInput => {
  if (typeof leadField === "string") {
    return {
      fieldName: leadField,
      isRequired: true,
      ...LEAD_FIELD_DEFAULTS[leadField],
    };
  }
  const defaults = LEAD_FIELD_DEFAULTS[leadField.field];
  return {
    fieldName: leadField.field,
    isRequired: leadField.required ?? true,
    label: leadField.label ?? defaults.label,
    placeholder: leadField.placeholder ?? defaults.placeholder,
    inputType: defaults.inputType,
    autoComplete: defaults.autoComplete,
  };
};

/** One input per field name, first entry wins, as the SDK's own form does. */
const toLeadFieldInputs = (
  leadFields: readonly ChatLeadField[]
): LeadFieldInput[] => {
  const allInputs = leadFields.map(toLeadFieldInput);
  return allInputs.filter(
    (leadFieldInput, inputIndex) =>
      allInputs.findIndex(
        (candidate) => candidate.fieldName === leadFieldInput.fieldName
      ) === inputIndex
  );
};

const TEXT_BUTTON_CLASSNAME =
  "font-mono text-xs text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-link hover:decoration-link disabled:pointer-events-none disabled:opacity-50";

const PRIMARY_BUTTON_CLASSNAME =
  "rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-link hover:text-link disabled:pointer-events-none disabled:opacity-50";

const INPUT_CLASSNAME =
  "block w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70";

const ChatBubble = ({
  message,
  strings,
}: {
  message: ChatMessage;
  strings: ResolvedChatStrings;
}) => {
  // A tool row is something the assistant did for the visitor; `text` is its label.
  if (message.role === "tool") {
    return (
      <li className="font-mono text-[0.65rem] text-muted-foreground">
        {message.text}
      </li>
    );
  }

  const isVisitor = message.role === "user";
  const bubbleClassName = isVisitor
    ? "ml-8 self-end rounded-lg bg-secondary px-3 py-2 text-sm text-foreground"
    : "mr-8 self-start rounded-lg border border-border px-3 py-2 text-sm text-foreground";

  return (
    <li
      className={`flex flex-col ${message.sending === true ? "opacity-60" : ""}`}
    >
      <div className={bubbleClassName}>
        <span className="sr-only">
          {isVisitor ? strings.youPrefix : strings.assistantPrefix}{" "}
        </span>
        {/* Assistant replies are Markdown; this minimal widget shows the source text. */}
        <p className="whitespace-pre-wrap wrap-break-word">{message.text}</p>
      </div>
      {message.failed === true ? (
        <span className="mt-1 self-end font-mono text-[0.65rem] text-destructive">
          {strings.notSent}
        </span>
      ) : null}
    </li>
  );
};

const ChatConversation = ({ chat, chatState }: ChatViewProps) => {
  const [draft, setDraft] = useState("");
  const transcriptRef = useRef<HTMLOListElement>(null);

  const messageCount = chatState.messages.length;
  useEffect(() => {
    const transcript = transcriptRef.current;
    if (transcript === null) {
      return;
    }
    transcript.scrollTop = transcript.scrollHeight;
  }, [messageCount]);

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // send() refuses while a session is starting or a turn is still in
    // flight; the draft stays so nothing typed is lost.
    const wasAccepted = chat.send(draft);
    if (wasAccepted) {
      setDraft("");
    }
  };

  const hasVisitorMessage = chatState.messages.some(
    (message) => message.role === "user"
  );
  const statusCopy = describeStatus(chatState, chat.strings);
  const hasEnded = chatState.status === "ended";

  return (
    <>
      <ol
        ref={transcriptRef}
        role="log"
        aria-live="polite"
        className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
      >
        {chatState.messages.map((message) => (
          <ChatBubble key={message.id} message={message} strings={chat.strings} />
        ))}
      </ol>

      {!hasVisitorMessage && chat.ui.starters.length > 0 ? (
        <ul
          aria-label={chat.strings.startersLabel}
          className="flex flex-wrap gap-2 px-4 pb-3"
        >
          {chat.ui.starters.map((starter) => (
            <li key={starter}>
              <button
                type="button"
                onClick={() => chat.startWith(starter)}
                className={PRIMARY_BUTTON_CLASSNAME}
              >
                {starter}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div
        role="status"
        className="flex min-h-6 flex-wrap items-center gap-x-3 gap-y-1 px-4 font-mono text-[0.65rem] text-muted-foreground"
      >
        <span>{statusCopy}</span>
        {RETRYABLE_STATUSES.has(chatState.status) ? (
          <button
            type="button"
            onClick={() => void chat.retry()}
            className={TEXT_BUTTON_CLASSNAME}
          >
            {chat.strings.tryAgain}
          </button>
        ) : null}
        {hasEnded ? (
          <button
            type="button"
            onClick={() => void chat.startNewChat()}
            className={TEXT_BUTTON_CLASSNAME}
          >
            {chat.strings.startChat}
          </button>
        ) : null}
      </div>

      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border-t border-border px-3 py-3"
      >
        <label className="sr-only" htmlFor="chat-composer">
          {chat.strings.messageInputLabel}
        </label>
        <input
          id="chat-composer"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={chat.ui.maxMessageLength}
          placeholder={chat.ui.placeholder}
          disabled={hasEnded}
          autoFocus
          autoComplete="off"
          className={INPUT_CLASSNAME}
        />
        <button
          type="submit"
          disabled={hasEnded || draft.trim() === ""}
          className={`shrink-0 whitespace-nowrap ${PRIMARY_BUTTON_CLASSNAME}`}
        >
          {chat.strings.sendMessage}
        </button>
      </form>
    </>
  );
};

const ChatLeadGate = ({ chat, chatState }: ChatViewProps) => {
  const gateConfig = chat.ui.gate;
  // The controller enters the lead gate only when the gate has fields.
  if (gateConfig === undefined) {
    throw new Error("The chat is at its lead form, but the site's chat has no gate.");
  }

  const leadFieldInputs = toLeadFieldInputs(gateConfig.fields);
  const isBusy =
    chatState.status === "sending" || chatState.status === "session_loading";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const leadValues = Object.fromEntries(
      leadFieldInputs.map((leadFieldInput) => [
        leadFieldInput.fieldName,
        readTextField(formData, leadFieldInput.fieldName),
      ])
    );
    void chat.submitLead(leadValues);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
      <div>
        <p className="text-sm font-medium text-foreground">
          {gateConfig.title ?? chat.strings.gateTitle}
        </p>
        {gateConfig.description !== undefined ? (
          <p className="mt-1 text-sm text-muted-foreground">
            {gateConfig.description}
          </p>
        ) : null}
      </div>

      {leadFieldInputs.map((leadFieldInput, inputIndex) => (
        <label key={leadFieldInput.fieldName} className="block">
          <span className="font-mono text-xs text-muted-foreground">
            {leadFieldInput.label}
            {leadFieldInput.isRequired ? null : (
              <span className="text-muted-foreground/70">
                {` (${chat.strings.optionalField})`}
              </span>
            )}
          </span>
          <input
            type={leadFieldInput.inputType}
            name={leadFieldInput.fieldName}
            autoComplete={leadFieldInput.autoComplete}
            placeholder={leadFieldInput.placeholder}
            required={leadFieldInput.isRequired}
            autoFocus={inputIndex === 0}
            className={`mt-1.5 ${INPUT_CLASSNAME}`}
          />
        </label>
      ))}

      {chatState.errorMessage !== "" ? (
        <p role="alert" className="font-mono text-xs text-destructive">
          {chatState.errorMessage}
        </p>
      ) : null}

      <button type="submit" disabled={isBusy} className={PRIMARY_BUTTON_CLASSNAME}>
        {chat.ui.offerText ? chat.strings.gateContinue : chat.strings.startChat}
      </button>

      {gateConfig.disclaimer !== undefined ? (
        <p className="text-[0.65rem] leading-relaxed text-muted-foreground">
          {gateConfig.disclaimer}
        </p>
      ) : null}
    </form>
  );
};

/**
 * Only reachable when the owner offers "text me instead". This widget offers
 * the chat alone: the text option needs a consent line shown exactly as the
 * SDK records it, and the SDK does not export the copy it records.
 */
const ChatModeChoice = ({ chat, chatState }: ChatViewProps) => (
  <div className="flex-1 space-y-4 px-4 py-4">
    <p className="text-sm font-medium text-foreground">
      {chat.strings.modePrompt}
    </p>
    <button
      type="button"
      onClick={() => void chat.selectMode("chat")}
      disabled={chatState.status === "sending"}
      className={PRIMARY_BUTTON_CLASSNAME}
    >
      {chat.strings.modeChat}
    </button>
  </div>
);

/** A conversation the visitor moved to SMS, restored from an earlier visit. */
const ChatTextedNotice = ({ chat, chatState }: ChatViewProps) => (
  <div className="flex-1 space-y-3 px-4 py-4">
    <p className="text-sm font-medium text-foreground">
      {chatState.textMoved
        ? chat.strings.movedToTextTitle
        : chat.strings.textedTitle}
    </p>
    <p className="text-sm text-muted-foreground">
      {chatState.textMoved ? chat.strings.movedToTextBody : chat.strings.textedBody}
    </p>
    <button
      type="button"
      onClick={() => void chat.chatInstead()}
      disabled={chatState.status === "sending"}
      className={TEXT_BUTTON_CLASSNAME}
    >
      {chat.strings.textChatInstead}
    </button>
  </div>
);

const ChatPanelBody = ({ chat, chatState }: ChatViewProps): ReactElement => {
  switch (chatState.gate) {
    case "lead":
      return <ChatLeadGate chat={chat} chatState={chatState} />;
    case "mode":
      return <ChatModeChoice chat={chat} chatState={chatState} />;
    case "texted":
      return <ChatTextedNotice chat={chat} chatState={chatState} />;
    case "open":
      return <ChatConversation chat={chat} chatState={chatState} />;
  }
};

const ChatWidget = ({ chat }: { chat: ChatService }) => {
  const chatStore = useMemo(() => createChatStore(chat), [chat]);
  const chatState = useSyncExternalStore(
    chatStore.subscribe,
    chatStore.getSnapshot
  );

  const isOpen = chatState.isOpen;
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        chat.close();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [chat, isOpen]);

  const cornerClassName = CORNER_CLASSNAME[chat.ui.position];

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => chat.open()}
        aria-label={chat.strings.openChat}
        className={`fixed bottom-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:border-link hover:text-link sm:bottom-6 ${cornerClassName}`}
      >
        <FiMessageSquare aria-hidden="true" className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label={chat.ui.title}
      className={`fixed bottom-4 z-30 flex h-[min(32rem,calc(100dvh-6rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-lg border border-border bg-background shadow-lg sm:bottom-6 ${cornerClassName}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p className="section-label text-foreground">{chat.ui.title}</p>
        <button
          type="button"
          onClick={() => chat.close()}
          aria-label={chat.strings.closeChat}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <FiX aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
      <ChatPanelBody chat={chat} chatState={chatState} />
    </div>
  );
};

/**
 * The site's chat, on the SDK's headless controller. Renders nothing unless
 * the owner turned chat on for the site.
 */
const Chat = () => {
  const connection = useSiteStar();
  if (connection.status !== "ready") {
    return null;
  }
  // Reading `sitestar.chat` throws when the site has no chat; `config.chat`
  // is that same condition, resolved without the throw.
  if (!connection.sitestar.config.chat) {
    return null;
  }
  return <ChatWidget chat={connection.sitestar.chat} />;
};

export default Chat;
