import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center">
      <h2 className="text-[32px] md:text-[44px] font-bold leading-[1.2] tracking-[-0.01em] text-[#1A1A1A] text-balance">
        {title}
      </h2>
      <div className="w-[76px] h-[5px] bg-primary rounded-[3px] mx-auto mt-[18px]" aria-hidden="true" />
      {subtitle && (
        <p className="text-base text-[#555555] mt-[14px] text-pretty max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

export const cardShadow = "shadow-[0_10px_30px_-14px_rgba(0,0,0,0.18)]";

export function NewBadge({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className={`inline-block text-[9.5px] font-bold rounded-full px-[7px] py-[2px] ml-1.5 align-[3px] ${
        inverted ? "bg-white text-primary" : "bg-primary text-white"
      }`}
    >
      NEW
    </span>
  );
}

export function CtaButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center bg-primary text-white font-bold text-[15px] px-[26px] py-[14px] rounded-[10px] shadow-[0_8px_18px_-8px_rgba(237,53,84,0.6)] transition hover:-translate-y-px hover:brightness-95 cursor-pointer"
    >
      {children}
    </button>
  );
}
