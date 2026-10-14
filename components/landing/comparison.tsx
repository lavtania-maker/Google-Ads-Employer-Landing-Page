import type { ReactNode } from "react";
import { Check, X } from "lucide-react";
import { CtaButton, SectionHeading, cardShadow } from "./section-heading";

const Yes = () => (
  <>
    <Check className="h-5 w-5 text-[#00C2A0] stroke-[3]" aria-hidden="true" />
    <span className="sr-only">Yes</span>
  </>
);
const No = () => (
  <>
    <X className="h-5 w-5 text-[#c9c9c9] stroke-[3]" aria-hidden="true" />
    <span className="sr-only">No</span>
  </>
);

const ROWS: { feature: string; maukerja: ReactNode; others: ReactNode }[] = [
  { feature: "Chat with candidates in the platform", maukerja: <Yes />, others: <No /> },
  { feature: "View candidate profile while chatting", maukerja: <Yes />, others: <No /> },
  { feature: "Send interview invites in chat", maukerja: <Yes />, others: "Manual" },
  { feature: "Bulk message many candidates", maukerja: <Yes />, others: <No /> },
  { feature: "AI writes your job ad (AI Job Ad)", maukerja: <Yes />, others: <No /> },
  {
    feature: "Job ad duration",
    maukerja: (
      <>
        <b>1 year</b>
        <small className="text-[11px] text-[#555555]">auto-refreshed monthly</small>
      </>
    ),
    others: "30 days",
  },
  { feature: "Job ad languages", maukerja: <b>English, BM &amp; Mandarin</b>, others: "English only" },
  { feature: "Posted to multiple platforms", maukerja: <b>Maukerja, Ricebowl &amp; Epicareer</b>, others: "Limited" },
  { feature: "AJobThing Care (expert support)", maukerja: <Yes />, others: <No /> },
];

const cell = "px-2.5 py-3 md:px-5 md:py-4 flex flex-col justify-center items-center text-center";
const mkCell = "bg-[#fff5f6] border-x-[1.5px] border-[#f6c2cc]";

export function Comparison({ onCta }: { onCta: () => void }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-5">
        <SectionHeading
          title={
            <>
              Why Choose <span className="text-primary">MauKerja</span> Over Other Job Platforms?
            </>
          }
        />
        <div role="table" aria-label="Maukerja compared with other job platforms" className={`max-w-[900px] mx-auto mt-11 bg-white rounded-[18px] ${cardShadow} overflow-hidden`}>
          <div role="row" className="grid grid-cols-[1.4fr_1fr_1fr]">
            <div role="columnheader" className={`${cell} !items-start`}>
              <span className="sr-only">Feature</span>
            </div>
            <div role="columnheader" className={`${cell} ${mkCell} text-[15px] md:text-xl font-bold text-primary !py-6`}>
              Maukerja
            </div>
            <div role="columnheader" className={`${cell} text-[15px] md:text-xl font-bold text-[#374B5C] !py-6`}>
              Other Job Platforms
            </div>
          </div>
          {ROWS.map((row) => (
            <div key={row.feature} role="row" className="grid grid-cols-[1.4fr_1fr_1fr] border-t border-[#ececec] text-[12.5px] md:text-sm">
              <div role="rowheader" className={`${cell} !items-start !text-left font-semibold`}>
                {row.feature}
              </div>
              <div role="cell" className={`${cell} ${mkCell}`}>
                {row.maukerja}
              </div>
              <div role="cell" className={cell}>
                {row.others}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-[30px]">
          <CtaButton onClick={onCta}>Post a Job Now</CtaButton>
        </div>
      </div>
    </section>
  );
}
