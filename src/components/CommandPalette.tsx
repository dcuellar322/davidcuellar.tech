import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownToLine, Search, X } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { projects } from "../data/projects";
import { profile } from "../data/profile";

type CommandAction = {
  id: string;
  label: string;
  hint: string;
  type: "jump" | "external";
  href: string;
  icon: "jump" | "linkedin" | "github" | "x";
};

const actions: CommandAction[] = [
  {
    id: "projects",
    label: "Go to Projects",
    hint: "Featured product work",
    type: "jump",
    href: "#projects",
    icon: "jump",
  },
  {
    id: "principles",
    label: "Go to Approach",
    hint: "Operating principles",
    type: "jump",
    href: "#principles",
    icon: "jump",
  },
  {
    id: "resume",
    label: "Go to Resume",
    hint: "Traditional experience timeline",
    type: "jump",
    href: "#resume",
    icon: "jump",
  },
  {
    id: "build-log",
    label: "Go to Build Log",
    hint: "Creative git-log resume",
    type: "jump",
    href: "#build-log",
    icon: "jump",
  },
  {
    id: "skills",
    label: "Go to Skills",
    hint: "Skill matrix",
    type: "jump",
    href: "#skills",
    icon: "jump",
  },
  {
    id: "contact",
    label: "Go to Contact",
    hint: "Social links and location",
    type: "jump",
    href: "#contact",
    icon: "jump",
  },
  {
    id: "linkedin",
    label: "Open LinkedIn",
    hint: "Public contact path",
    type: "external",
    href: profile.social.linkedin,
    icon: "linkedin",
  },
  {
    id: "github",
    label: "Open GitHub",
    hint: "Code and project work",
    type: "external",
    href: profile.social.github,
    icon: "github",
  },
  {
    id: "x",
    label: "Open X",
    hint: "Social profile",
    type: "external",
    href: profile.social.x,
    icon: "x",
  },
  ...projects.map((project) => ({
    id: project.name.toLowerCase().replace(/\s+/g, "-"),
    label: `Open ${project.name}`,
    hint: project.description,
    type: "external" as const,
    href: project.url,
    icon: "jump" as const,
  })),
];

function ActionIcon({ icon }: { icon: CommandAction["icon"] }) {
  if (icon === "linkedin") return <FaLinkedinIn aria-hidden="true" />;
  if (icon === "github") return <FaGithub aria-hidden="true" />;
  if (icon === "x") return <FaXTwitter aria-hidden="true" />;
  return <ArrowDownToLine aria-hidden="true" />;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const bodyOverflowRef = useRef("");

  const closePalette = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) {
      window.setTimeout(() => triggerRef.current?.focus(), 0);
    }
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return actions;
    return actions.filter((action) =>
      `${action.label} ${action.hint}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const wantsPalette =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (wantsPalette) {
        event.preventDefault();
        triggerRef.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : document.querySelector<HTMLElement>("[data-command-open]");
        setOpen(true);
      }
      if (event.key === "Escape" && open) {
        event.preventDefault();
        closePalette();
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>("[data-command-open]");
      if (trigger) {
        triggerRef.current = trigger;
        setOpen(true);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [closePalette, open]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    bodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const siteShell = document.querySelector<HTMLElement>(".site-shell");
    if (siteShell) siteShell.inert = true;
    window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = bodyOverflowRef.current;
      if (siteShell) siteShell.inert = false;
    };
  }, [open]);

  useEffect(() => {
    if (activeIndex >= filtered.length) {
      setActiveIndex(Math.max(0, filtered.length - 1));
    }
  }, [activeIndex, filtered.length]);

  useEffect(() => {
    const activeButton = listRef.current?.querySelector<HTMLElement>(
      'button[aria-selected="true"]',
    );
    activeButton?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, filtered.length]);

  if (!open) return null;

  const runAction = (action: CommandAction | undefined) => {
    if (!action) return;
    closePalette(false);
    if (action.type === "jump") {
      document
        .querySelector(action.href)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.open(action.href, "_blank", "noopener,noreferrer");
  };

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'input, button, a[href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="palette-backdrop"
      role="presentation"
      onMouseDown={() => closePalette()}
    >
      <div
        ref={dialogRef}
        className="palette-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        data-lenis-prevent
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
      >
        <div className="palette-search">
          <Search aria-hidden="true" />
          <label className="sr-only" htmlFor="command-search">
            Search commands
          </label>
          <input
            id="command-search"
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActiveIndex((index) =>
                  Math.min(filtered.length - 1, index + 1),
                );
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActiveIndex((index) => Math.max(0, index - 1));
              }
              if (event.key === "Enter") {
                event.preventDefault();
                runAction(filtered[activeIndex]);
              }
            }}
            placeholder="Search or jump..."
          />
          <button
            type="button"
            onClick={() => closePalette()}
            aria-label="Close command palette"
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <h2 className="sr-only" id="command-palette-title">
          Command palette
        </h2>

        <div
          ref={listRef}
          className="palette-list"
          role="listbox"
          aria-label="Command actions"
          data-lenis-prevent
        >
          {filtered.length ? (
            filtered.map((action, index) => (
              <button
                key={action.id}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className={index === activeIndex ? "is-active" : ""}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => runAction(action)}
              >
                <span className="palette-icon">
                  <ActionIcon icon={action.icon} />
                </span>
                <span>
                  <strong>{action.label}</strong>
                  <small>{action.hint}</small>
                </span>
              </button>
            ))
          ) : (
            <p className="palette-empty">No matching command.</p>
          )}
        </div>
      </div>
    </div>
  );
}
