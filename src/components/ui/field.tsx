"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface FieldShellProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (id: { input: string; describedBy: string | undefined }) => ReactNode;
  className?: string;
}

function FieldShell({ label, hint, error, required, children, className }: FieldShellProps) {
  const reactId = useId();
  const inputId = `field-${reactId}`;
  const describedBy = error || hint ? `desc-${reactId}` : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={inputId}
        className="text-eyebrow flex items-center gap-1.5"
      >
        {label}
        {required && <span aria-hidden className="text-saffron">*</span>}
      </label>
      {children({ input: inputId, describedBy })}
      {(hint || error) && (
        <p
          id={describedBy}
          className={cn(
            "text-xs leading-snug",
            error ? "text-ochre" : "text-muted",
          )}
          role={error ? "alert" : undefined}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

const inputClasses =
  "bg-transparent border-b border-line-strong px-1 py-2.5 text-cream placeholder:text-faint focus:outline-none focus:border-saffron transition-colors";

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
}

export function TextField({ label, hint, error, required, className, ...rest }: TextFieldProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
      {({ input, describedBy }) => (
        <input
          id={input}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          aria-required={required}
          required={required}
          className={inputClasses}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

interface TextareaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
}

export function TextareaField({ label, hint, error, required, className, ...rest }: TextareaFieldProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
      {({ input, describedBy }) => (
        <textarea
          id={input}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          aria-required={required}
          required={required}
          rows={3}
          className={cn(inputClasses, "resize-y min-h-24")}
          {...rest}
        />
      )}
    </FieldShell>
  );
}
