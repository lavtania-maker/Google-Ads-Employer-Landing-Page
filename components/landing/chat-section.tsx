import { useState } from "react";
import { SectionHeading } from "./section-heading";

const CHAT_TABS = [
  {
    title: "Reach candidates instantly",
    desc: "Get notified the moment someone applies and start chatting right away. Check their profile and resume inside the chat.",
    img: "/images/proposal/chat-0.png",
    alt: "Employer chatting with a new applicant, with their profile shown in the chat",
  },
  {
    title: "Invite to interview in one tap",
    desc: "Send interview invites in the chat and see who accepted. Message many candidates at once for walk-ins.",
    img: "/images/proposal/chat-1.png",
    alt: "Interview invite sent inside a candidate chat",
  },
  {
    title: "All chats in the AJobThing App",
    desc: "Chat with candidates from your phone. No need to switch to WhatsApp or email, so you reach candidates faster.",
    img: "/images/proposal/chat-2.png",
    alt: "Candidate chats in the AJobThing mobile app",
  },
];

export function ChatSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-5">
        <SectionHeading
          title={
            <>
              Chat Direct. <span className="text-primary">Hire 2X Faster.</span>
            </>
          }
          subtitle="No more chasing candidates by phone or email. Talk to them, screen them and book interviews in one place."
        />
        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 items-center mt-12">
          <div className="min-w-0 grid gap-3" role="tablist" aria-label="Chat features">
            {CHAT_TABS.map((tab, i) => {
              const selected = i === active;
              return (
                <button
                  key={tab.title}
                  type="button"
                  role="tab"
                  id={`chat-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="chat-panel"
                  onClick={() => setActive(i)}
                  className={`flex gap-3.5 text-left bg-white border-[1.5px] rounded-2xl p-[18px] transition cursor-pointer ${
                    selected ? "border-primary shadow-[0_10px_24px_-14px_rgba(237,53,84,0.5)]" : "border-[#ececec] hover:border-slate-300"
                  }`}
                >
                  <span className={`font-bold text-sm ${selected ? "text-primary" : "text-[#bbb]"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <b className="block text-[17px] font-bold">{tab.title}</b>
                    {selected && <span className="block text-sm text-[#555555] mt-1.5 leading-[1.55]">{tab.desc}</span>}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="min-w-0" id="chat-panel" role="tabpanel" aria-labelledby={`chat-tab-${active}`}>
            <img src={CHAT_TABS[active].img} alt={CHAT_TABS[active].alt} className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
