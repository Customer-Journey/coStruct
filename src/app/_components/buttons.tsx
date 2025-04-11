"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";

interface ButtonBaseProps {
  children: ReactNode;
  className?: string;
}

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    ButtonBaseProps {}

interface LinkButtonProps extends Omit<LinkProps, "children">, ButtonBaseProps {
  target?: string;
  rel?: string;
}

// Primary button - blue in light mode, teal in dark mode
export function PrimaryButton({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-block rounded-lg bg-[#4B8DF8] px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-[#3A6BC4] hover:shadow-lg dark:bg-[#00FFD1] dark:text-[#0D0D0D] dark:hover:bg-[#00CCAA] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Secondary button - white with blue border
export function SecondaryButton({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-block rounded-lg border border-[#4B8DF8] bg-transparent px-4 py-2 text-sm font-medium text-[#4B8DF8] transition-all hover:bg-[#4B8DF8]/10 dark:border-[#00FFD1] dark:text-[#00FFD1] dark:hover:bg-[#00FFD1]/10 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Tertiary button - white with gray border
export function TertiaryButton({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1A1A1A] dark:text-gray-300 dark:hover:bg-[#252525] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// CTA button - larger primary button
export function CTAButton({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-block rounded-lg bg-[#4B8DF8] px-8 py-4 text-lg font-medium text-white shadow-md transition-all hover:opacity-90 hover:shadow-xl dark:bg-[#00FFD1] dark:text-[#0D0D0D] dark:shadow-[#00FFD1]/10 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Link versions of buttons
export function PrimaryLinkButton({
  children,
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={`inline-block rounded-lg bg-[#4B8DF8] px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-[#3A6BC4] hover:shadow-lg dark:bg-[#00FFD1] dark:text-[#0D0D0D] dark:hover:bg-[#00CCAA] ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function SecondaryLinkButton({
  children,
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={`inline-block rounded-lg border border-[#4B8DF8] bg-transparent px-4 py-2 text-sm font-medium text-[#4B8DF8] transition-all hover:bg-[#4B8DF8]/10 dark:border-[#00FFD1] dark:text-[#00FFD1] dark:hover:bg-[#00FFD1]/10 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function TertiaryLinkButton({
  children,
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={`rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1A1A1A] dark:text-gray-300 dark:hover:bg-[#252525] ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function TextLink({
  children,
  className = "",
  ...props
}: LinkButtonProps & { title?: string }) {
  return (
    <Link
      className={`text-[#4B8DF8] hover:text-[#3A6BC4] dark:text-[#00FFD1] dark:hover:text-[#00CCAA] ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function CTALinkButton({
  children,
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={`inline-block rounded-lg bg-[#4B8DF8] px-8 py-4 text-lg font-medium text-white shadow-md transition-all hover:opacity-90 hover:shadow-xl dark:bg-[#00FFD1] dark:text-[#0D0D0D] dark:shadow-[#00FFD1]/10 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
