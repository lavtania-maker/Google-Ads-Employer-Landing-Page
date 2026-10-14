import { useState } from "react";
import { Check } from "lucide-react";
import { CtaButton, NewBadge, SectionHeading, cardShadow } from "./section-heading";

const PRODUCTS = [
  {
    tab: "AI Job Ad",
    isNew: true,
    title: "Write your job ad in seconds",
    sub: "Just type the job title. AI writes the full job ad for you.",
    points: [
      ["Job description in 1 click", "Duties, requirements and qualifications, written for the Malaysian market."],
      ["Salary guide in RM", "See the usual salary range and skills for the role before you post."],
      ["English, BM & Mandarin", "Switch your job ad language in one click to reach more candidates."],
    ],
    cta: "Try AI Job Ad",
    img: "/images/proposal/product-0.png",
  },
  {
    tab: "AI Candidate Search",
    isNew: true,
    title: "Find candidates yourself",
    sub: "Search 250,000+ candidate profiles. No need to wait for applications.",
    points: [
      ["Filter by location & salary", "Also by experience, language and when they can start work."],
      ["New matches every day", "AI recommends suitable candidates daily, with a match score."],
      ["Save and chat in one place", "Keep your shortlist in folders and message candidates directly."],
    ],
    cta: "Search Candidates",
    img: "/images/proposal/product-1.png",
  },
  {
    tab: "Smart Walk-In",
    isNew: true,
    title: "Walk-in interviews, made easy",
    sub: "Post your walk-in interview day online. Candidates check in with a QR code.",
    points: [
      ["Live in 5 minutes", "Just add the date, venue and the roles you are hiring for."],
      ["Seen by 2.5M+ active jobseekers", "Featured on the Maukerja & Ricebowl homepage and Walk-In page."],
      ["No more paper forms", "See who came, who is interviewing and who is shortlisted, live."],
    ],
    cta: "Create Walk-In Day",
    img: "/images/proposal/product-2.png",
  },
  {
    tab: "Company Branding",
    title: "Show why people love working with you",
    sub: "Your own company page on Maukerja & Ricebowl, plus social media promotion by our creative team.",
    points: [
      ["Show your culture & open jobs", "Photos, benefits, office locations and all your vacancies in one page."],
      ["Easier to find online", "Better company visibility on Google Search and ChatGPT."],
      ["Jobseekers can follow you", "Followers get your updates, can drop their resume and chat with you."],
    ],
    cta: "Build Company Page",
    img: "https://www.maukerja.my/mkt/images/mk/hiringsol_1.png",
  },
  {
    tab: "AJobThing Care",
    title: "Not enough applicants? We help you.",
    sub: "AJobThing Care is included with every job ad and candidate search.",
    points: [
      ["Expert review of your job ad", "Our hiring experts suggest changes to attract the right candidates."],
      ["Extra help when results are slow", "We optimise and boost your job ad to get more applicants."],
      ["Dedicated support", "A real person to guide your hiring from start to finish."],
    ],
    cta: "Post a Job Now",
    img: "/images/proposal/product-4.png",
  },
];

export function Solutions({ onCta }: { onCta: () => void }) {
  const [active, setActive] = useState(0);
  const product = PRODUCTS[active];

  return (
    <section className="py-20 bg-[#F8F9FA]">
      <div className="max-w-[1100px] mx-auto px-5">
        <SectionHeading
          title={
            <>
              Our Hiring <span className="text-primary">Solutions</span>
            </>
          }
          subtitle="Everything you need to post, find, chat and hire, in one platform."
        />
        <div className={`bg-white rounded-[22px] ${cardShadow} p-[26px] mt-11`}>
          <div role="tablist" aria-label="Hiring solutions" className="flex gap-2 flex-wrap border-b border-[#ececec] pb-[18px] mb-7">
            {PRODUCTS.map((p, i) => {
              const selected = i === active;
              return (
                <button
                  key={p.tab}
                  type="button"
                  role="tab"
                  id={`solution-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="solution-panel"
                  onClick={() => setActive(i)}
                  className={`px-4 py-2.5 rounded-full text-sm font-bold transition cursor-pointer ${
                    selected ? "bg-primary text-white" : "bg-[#F8F9FA] text-[#555555] hover:bg-slate-200"
                  }`}
                >
                  {p.tab}
                  {p.isNew && <NewBadge inverted={selected} />}
                </button>
              );
            })}
          </div>

          <div
            id="solution-panel"
            role="tabpanel"
            aria-labelledby={`solution-tab-${active}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-9 items-center"
          >
            <div className="min-w-0">
              <h3 className="text-[28px] font-bold leading-[1.25] text-balance">{product.title}</h3>
              <p className="text-base text-[#555555] mt-2.5 mb-[22px]">{product.sub}</p>
              <ul className="grid gap-4 mb-[26px]">
                {product.points.map(([title, desc]) => (
                  <li key={title} className="flex gap-2.5">
                    <span className="mt-px w-6 h-6 shrink-0 rounded-full bg-primary text-white grid place-items-center" aria-hidden="true">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                    <span>
                      <b className="block text-base font-bold">{title}</b>
                      <span className="block text-[13.5px] text-[#555555] mt-0.5">{desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <CtaButton onClick={onCta}>{product.cta}</CtaButton>
            </div>
            <div className="min-w-0">
              <img src={product.img} alt={`${product.tab} preview`} className="w-full rounded-[14px]" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
