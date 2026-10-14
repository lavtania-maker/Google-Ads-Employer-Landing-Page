import { Star } from "lucide-react";
import { CtaButton } from "./section-heading";

const ROLES = ["MARKETING EXECUTIVE", "LIVE HOST", "CONTENT CREATOR", "RETAIL MANAGER", "RETAIL ASSISTANT", "CASHIER"];

const LOGOS = ["shopee", "mcd", "starbucks", "pizzahut", "lazada", "concentrix", "watsons", "foodpanda", "flash", "kfc", "dhl"];

export function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section id="start" className="pt-10 pb-[60px] bg-white">
      <div className="max-w-[1100px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="min-w-0 bg-white rounded-[22px] shadow-[0_12px_40px_-14px_rgba(0,0,0,0.18)] px-6 py-8 md:px-[34px] md:py-9">
          <h1 className="text-[32px] md:text-[40px] font-bold leading-[1.2] text-[#1A1A1A] text-balance">
            Award-winning Recruitment Site: Post a Job &amp;{" "}
            <em className="italic text-primary underline decoration-[3px] underline-offset-[6px]">Hire Within 72 Hours</em>
          </h1>
          <p className="text-[15.5px] text-[#555555] leading-relaxed mt-4 mb-[18px]">
            Chat with candidates the moment they apply. AI writes your job ad for you. All in one place.
          </p>
          <p className="text-[10px] font-bold tracking-[0.14em] text-[#555555] mb-2">HIRING FOR ROLES LIKE:</p>
          <ul className="flex flex-wrap gap-2 mb-6">
            {ROLES.map((role) => (
              <li key={role} className="border border-[#ececec] rounded-full text-[10.5px] font-bold px-3 py-1.5 tracking-[0.03em]">
                {role}
              </li>
            ))}
          </ul>
          <CtaButton onClick={onCta}>Post a Job Now</CtaButton>
          <div className="flex flex-wrap items-center gap-2.5 text-xs mt-[22px] pt-[18px] border-t border-[#ececec]">
            <img src="https://www.ajobthing.com/mkt/images/ajt/google.svg" alt="Google" className="h-4 w-4" referrerPolicy="no-referrer" />
            <span className="flex gap-0.5" aria-label="5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#FFC107] text-[#FFC107]" aria-hidden="true" />
              ))}
            </span>
            <b className="font-bold">4.9 RATING</b>
            <a
              href="https://www.google.com/search?kgmid=/g/11bymx0j2z&hl=en-ID&q=AJobThing+-+Your+Ultimate+Recruitment+%26+Hiring+Solution&shem=epsd1,esd2e,ltae,rimspwouoe,sdpie&shndl=30&source=sh/x/loc/osrp/m5/1&kgs=e2b38152e6c48b66&utm_source=epsd1,esd2e,ltae,rimspwouoe,sdpie,sh/x/loc/osrp/m5/1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555555] font-semibold hover:text-primary transition-colors"
            >
              ON GOOGLE REVIEWS &middot; 2,600+
            </a>
          </div>
        </div>

        <div className="min-w-0">
          <img
            src="https://images.prismic.io/maukerja/agKfiaYofJOwHGsx_marketingretailandsalesstaff.png?auto=format,compress"
            alt="Marketing, retail and sales staff"
            className="w-full rounded-[22px]"
            referrerPolicy="no-referrer"
          />
          <div className="mt-[26px] text-center">
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#374B5C] mb-3.5">TRUSTED BY OVER 15,000+ TOP EMPLOYERS</p>
            <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
              <div className="flex gap-4 w-max animate-[marquee_30s_linear_infinite]">
                {[...LOGOS, ...LOGOS].map((logo, i) => (
                  <img
                    key={`${logo}-${i}`}
                    src={`https://www.maukerja.my/mkt/images/mkrb-companies/${logo}.png`}
                    alt={i < LOGOS.length ? logo : ""}
                    aria-hidden={i >= LOGOS.length}
                    className="h-[46px] w-auto rounded-lg bg-white shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
