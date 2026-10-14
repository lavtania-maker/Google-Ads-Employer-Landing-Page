import { MessageSquareText, Sparkles, Users } from "lucide-react";
import { NewBadge, SectionHeading, cardShadow } from "./section-heading";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Post a Job with AI",
    isNew: true,
    desc: "Type the job title and AI writes your job ad in seconds, in English, BM or Mandarin.",
  },
  {
    icon: MessageSquareText,
    title: "Chat Directly with Candidates",
    desc: "Reply the moment they apply, view their profile in the chat and send interview invites in one tap.",
  },
  {
    icon: Users,
    title: "Reach 6M+ Jobseekers",
    desc: "One job post appears on Maukerja, Ricebowl and Epicareer. Your next hire is already here.",
  },
];

export function WhyHire() {
  return (
    <section className="py-20 bg-[#F8F9FA]">
      <div className="max-w-[1100px] mx-auto px-5">
        <SectionHeading
          title={
            <>
              Why Hire Top Talent on <span className="text-primary">Maukerja by AJobThing</span>
            </>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] mt-12">
          {FEATURES.map(({ icon: Icon, title, desc, isNew }) => (
            <div key={title} className={`bg-white rounded-[18px] ${cardShadow} px-[26px] py-[30px] text-center`}>
              <div className="w-[58px] h-[58px] rounded-2xl bg-[#fdeef1] text-primary grid place-items-center mx-auto mb-[18px]">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-[19px] font-bold leading-[1.3]">
                {title}
                {isNew && <NewBadge />}
              </h3>
              <p className="text-sm text-[#555555] mt-2.5 leading-[1.55]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
