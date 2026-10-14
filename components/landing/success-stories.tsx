import { useState } from "react";
import { Play, Star } from "lucide-react";
import { SectionHeading, cardShadow } from "./section-heading";

const VIDEO_ID = "2D5_9AYVjBQ";

const STORIES = [
  {
    company: "AEON CO.",
    person: "Recruitment Team",
    logo: "https://www.maukerja.my/mkt/images/testi/aeon.webp",
    stat: "200+",
    statLabel: "applicants vs. 100 target",
    quote: "Of course capai; kita cari 100 orang, kita dapat 200 lebih, boleh dapat sekali ganda so memang sangat puas hati.",
  },
  {
    company: "BASKIN ROBBINS",
    person: "Ms Kamales – Human Resource Manager",
    logo: "https://www.maukerja.my/mkt/images/testi/baskin.webp",
    stat: "50%",
    statLabel: "of candidates hired on the spot",
    quote: "The response was very good! We managed to get 50% of candidates who came in who have been hired on the spot.",
  },
  {
    company: "GIBRALTAR BSN",
    person: "Mr Alvin – Team Head",
    logo: "https://www.maukerja.my/mkt/images/testi/gibraltar.webp",
    stat: "Since 2018",
    statLabel: "long-term hiring partner",
    quote: "The entire team is awesome and always provide their relentless support and commitment towards our recruitment.",
  },
];

export function SuccessStories() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="testimonials" className="py-20 bg-[#F8F9FA]">
      <div className="max-w-[1100px] mx-auto px-5">
        <SectionHeading
          title={
            <>
              Want to See Real Results? <span className="text-primary">Read Our Success Stories</span>
            </>
          }
          subtitle={
            <>
              HR teams across Malaysia hire better, faster with <span className="text-primary">Maukerja by AJobThing</span>
            </>
          }
        />

        <a
          href="https://www.google.com/search?kgmid=/g/11bymx0j2z&hl=en-ID&q=AJobThing+-+Your+Ultimate+Recruitment+%26+Hiring+Solution&shem=epsd1,esd2e,ltae,rimspwouoe,sdpie&shndl=30&source=sh/x/loc/osrp/m5/1&kgs=e2b38152e6c48b66&utm_source=epsd1,esd2e,ltae,rimspwouoe,sdpie,sh/x/loc/osrp/m5/1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-wrap items-center justify-center gap-3 bg-white rounded-[18px] md:rounded-full shadow-[0_6px_18px_-10px_rgba(0,0,0,0.25)] px-[22px] py-2.5 w-fit max-w-full mx-auto mt-6 text-xs text-center"
        >
          <img src="https://www.ajobthing.com/mkt/images/ajt/google.svg" alt="" className="h-[18px] w-[18px]" referrerPolicy="no-referrer" />
          <span className="flex gap-0.5" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-[#FFC107] text-[#FFC107]" />
            ))}
          </span>
          <b className="text-base">4.9</b>
          <em className="not-italic font-bold text-[10.5px] tracking-[0.08em] text-[#374B5C]">BEST RECRUITMENT PORTAL IN MALAYSIA</em>
          <span>2,600+ reviews</span>
        </a>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-9">
          {STORIES.map((s) => (
            <figure key={s.company} className={`bg-white rounded-[18px] ${cardShadow} p-6`}>
              <div className="flex gap-3 items-center mb-3.5">
                <img src={s.logo} alt="" className="w-[42px] h-[42px] rounded-full object-contain border border-[#ececec]" referrerPolicy="no-referrer" />
                <figcaption>
                  <h3 className="text-sm font-bold">{s.company}</h3>
                  <small className="text-[11px] text-primary font-semibold">{s.person}</small>
                </figcaption>
              </div>
              <div className="text-[30px] font-bold text-primary leading-none">{s.stat}</div>
              <small className="block text-[#555555] text-xs font-semibold mt-1 mb-3">{s.statLabel}</small>
              <blockquote className="text-[13px] text-[#555555] leading-[1.6]">{`“${s.quote}”`}</blockquote>
            </figure>
          ))}
        </div>

        <div className="max-w-[640px] mx-auto mt-9 rounded-[18px] overflow-hidden shadow-[0_14px_34px_-16px_rgba(0,0,0,0.4)]">
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Maukerja by AJobThing success story"
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              className="block w-full aspect-video border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play success story video"
              className="group relative block w-full cursor-pointer"
            >
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                alt="Maukerja by AJobThing success story video"
                className="w-full aspect-video object-cover"
              />
              <span className="absolute inset-0 m-auto w-[68px] h-[68px] rounded-full bg-primary text-white grid place-items-center shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110">
                <Play className="h-6 w-6 fill-white" aria-hidden="true" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
