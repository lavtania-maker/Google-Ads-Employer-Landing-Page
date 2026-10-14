import { FilePen, Handshake, MessageSquareText } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CtaButton, SectionHeading, cardShadow } from "./section-heading";

const STEPS = [
  { icon: FilePen, title: "Post Your Job with AI", desc: "Fill in the form and post your job. AI writes it for you, with a salary guide in RM." },
  { icon: MessageSquareText, title: "Chat with Candidates", desc: "Get AI-matched candidates and chat with them the moment they apply." },
  { icon: Handshake, title: "Hire Within 72 Hours", desc: "Send interview invites in chat and hire the right person, fast." },
];

export function Steps({ onCta }: { onCta: () => void }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-5">
        <SectionHeading
          title={
            <>
              <span className="text-primary">Easy Hire</span> in 3 Simple Steps
            </>
          }
        />
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-[22px] mt-12">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className={`bg-white rounded-[18px] ${cardShadow} overflow-hidden text-center`}>
              <div className="bg-primary text-white font-bold text-xs tracking-[0.12em] p-2.5">STEP {i + 1}</div>
              <div className="px-[22px] py-[26px]">
                <Icon className="h-8 w-8 mx-auto text-primary" aria-hidden="true" />
                <h3 className="text-lg font-bold mt-3">{title}</h3>
                <p className="text-sm text-[#555555] mt-2 leading-[1.55]">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="text-center mt-[34px]">
          <CtaButton onClick={onCta}>Post a Job Now</CtaButton>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "How much does it cost to post a job on Maukerja?",
    a: "Packages depend on how many roles you are hiring for and the products you need. Fill in the form and your dedicated Account Manager will send you a free quotation. Existing customers can contact their Account Manager or call 018-9666610.",
  },
  {
    q: "How does chatting with candidates work?",
    a: "When someone applies, you get a notification and can chat with them on the web or in the AJobThing app. View their profile, send interview invites and message many candidates at once.",
  },
  {
    q: "How does AI Job Ad work?",
    a: "Type your job title and AI writes the job description, suggests a salary range in RM and lets you switch between English, BM and Mandarin.",
  },
  {
    q: "Where do the candidates come from?",
    a: "Your job ad appears on Maukerja, Ricebowl and Epicareer. You can also search 250,000+ profiles with AI Candidate Search.",
  },
  {
    q: "What is AJobThing Care?",
    a: "AJobThing Care is included with every job ad. Our hiring experts review your job ad, help boost it when results are slow, and give you dedicated support.",
  },
];

export function Faq() {
  return (
    <section className="py-20 bg-[#F8F9FA]">
      <div className="max-w-[1100px] mx-auto px-5">
        <SectionHeading title="FAQs" subtitle="Frequently asked questions from employers" />
        <Accordion defaultValue={["faq-0"]} className="max-w-[780px] mx-auto mt-10 flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className="bg-white rounded-[14px] shadow-[0_6px_18px_-12px_rgba(0,0,0,0.25)] px-[22px] border-none"
            >
              <AccordionTrigger className="text-[15px] font-bold text-left hover:no-underline py-[18px] [&>svg]:text-primary">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-[#555555] leading-[1.6] pb-[18px]">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function CtaBanner({ onCta }: { onCta: () => void }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="bg-[#fdeef1] rounded-[22px] grid grid-cols-1 md:grid-cols-2 items-center gap-[30px] px-6 py-9 md:px-11">
          <img
            src="https://www.maukerja.my/mkt/images/mk/cta.svg"
            alt=""
            className="w-full max-h-72 object-contain"
            referrerPolicy="no-referrer"
          />
          <div>
            <h3 className="text-[30px] font-bold leading-[1.25] text-balance">Start your next hire with a message.</h3>
            <p className="text-[#555555] mt-3 mb-[22px]">
              Need a personalised hiring solution? We design one that fits your goals and budget.
            </p>
            <CtaButton onClick={onCta}>Post a Job Now</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
