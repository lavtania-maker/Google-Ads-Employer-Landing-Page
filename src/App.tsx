import * as React from "react";
import { 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Target,
  ShieldCheck,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Quote,
  Building2,
  Globe,
  Briefcase,
  Zap,
  MessageSquareText,
  FilePlus,
  UserPlus,
  X,
  Check
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MultiSelect, Option } from "@/components/MultiSelect";
import { COUNTRIES } from "./constants/countries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

const SUGGESTED_POSITIONS: Option[] = [
  { label: "Marketing Executive", value: "Marketing Executive" },
  { label: "Social Media Executive", value: "Social Media Executive" },
  { label: "Digital Marketing Executive", value: "Digital Marketing Executive" },
  { label: "Marketing Specialist", value: "Marketing Specialist" },
  { label: "Marketing Campaign Specialist", value: "Marketing Campaign Specialist" },
  { label: "Marketing (General)", value: "Marketing (General)" },
  { label: "Others", value: "Others" },
];

const TESTIMONIALS = [
  {
    company: "Gibraltar BSN",
    name: "Mr Alvin – Team Head",
    quote: "We have been working with AJobThing since 2018. The entire team is awesome and always provide their relentless support and commitment towards our recruitment. Lately, we successfully launched a Virtual Career Open day session with AJobThing and the turn up rate is relatively positive! Keep it up!",
    img: "https://www.maukerja.my/mkt/images/testi/gibraltar.webp"
  },
  {
    company: "AEON Co.",
    name: "Recruitment Team",
    quote: "Of course capai; kita cari 100 orang, kita dapat 200 lebih, boleh dapat sekali ganda so memang sangat puas hati.",
    img: "https://www.maukerja.my/mkt/images/testi/aeon.webp"
  },
  {
    company: "PADINI",
    name: "Ms Eunice – Senior HR Executive",
    quote: "The response is very good… we get a lot of candidates, that's the reason we continue using SHOUTOUT. From morning until now, we still have many candidates queuing up for interviews.",
    img: "https://www.maukerja.my/mkt/images/testi/padini.webp"
  },
  {
    company: "Foodpanda Malaysia",
    name: "Ms Suruthi – Recruiter",
    quote: "AJobThing has always been accommodating. Their Account Managers and Customer Service are always ready to serve. Using their platform has been an added advantage to our hiring.",
    img: "https://www.maukerja.my/mkt/images/testi/foodpanda.webp"
  },
  {
    company: "McDonald's",
    name: "En Shahrul – Restaurant General Manager",
    quote: "For me, this two days event using SHOUTOUT is very encouraging and reliable, we can attract more people from the community to work at McDonald's.",
    img: "https://www.maukerja.my/mkt/images/testi/mcd.png"
  },
  {
    company: "Baskin Robbins",
    name: "Ms Kamales – Human Resource Manager",
    quote: "The response was very good! We managed to get 50% of candidates who came in who have been hired on the spot.",
    img: "https://www.maukerja.my/mkt/images/testi/baskin.webp"
  }
];

const TRUSTED_LOGOS = [
  // Line 1
  { name: "Shopee", url: "https://www.maukerja.my/mkt/images/mkrb-companies/shopee.png", isBig: true },
  { name: "McDonald's", url: "https://www.maukerja.my/mkt/images/mkrb-companies/mcd.png", isBig: true },
  { name: "Starbucks", url: "https://www.maukerja.my/mkt/images/mkrb-companies/starbucks.png", isBig: true },
  { name: "Pizza Hut", url: "https://www.maukerja.my/mkt/images/mkrb-companies/pizzahut.png", isBig: true },
  // Line 2
  { name: "Lazada", url: "https://www.maukerja.my/mkt/images/mkrb-companies/lazada.png", isBig: true },
  { name: "Concentrix", url: "https://www.maukerja.my/mkt/images/mkrb-companies/concentrix.png" },
  { name: "Watsons", url: "https://www.maukerja.my/mkt/images/mkrb-companies/watsons.png", isBig: true },
  { name: "Foodpanda", url: "https://www.maukerja.my/mkt/images/mkrb-companies/foodpanda.png", isBig: true },
  // Line 3
  { name: "Flash Express", url: "https://www.maukerja.my/mkt/images/mkrb-companies/flash.png", isBig: true },
  { name: "Pizza Hut", url: "https://www.maukerja.my/mkt/images/mkrb-companies/pizzahut.png", isBig: true },
  { name: "KFC", url: "https://www.maukerja.my/mkt/images/mkrb-companies/kfc.png", isBig: true },
  { name: "DHL", url: "https://www.maukerja.my/mkt/images/mkrb-companies/dhl.png" },
];

interface HiringFormProps {
  onSuccess: () => void;
  onScrollToTestimonials: () => void;
  isOpen: boolean;
}

const HiringForm = ({ onSuccess, onScrollToTestimonials, isOpen }: HiringFormProps) => {
  const [loading, setLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [phoneCode, setPhoneCode] = React.useState("+60");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [formData, setFormData] = React.useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    headcount: "",
    hiring_timeline: ""
  });

  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: "",
        workEmail: "",
        companyName: "",
        headcount: "",
        hiring_timeline: ""
      });
      setPhoneNumber("");
      setShowSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !phoneNumber || !formData.companyName || !formData.headcount || !formData.hiring_timeline) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Capture UTMs from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      "utm_special note": urlParams.get("utm_special_note") || urlParams.get("note") || ""
    };

    const payload = {
      timestamp: new Date().toLocaleString(),
      company_name: formData.companyName,
      full_name: formData.fullName,
      email: formData.workEmail,
      phone_number: `${phoneCode}${phoneNumber}`,
      headcount: formData.headcount,
      hiring_timeline: formData.hiring_timeline,
      sheet_id: import.meta.env.VITE_SHEET_ID || "",
      sheet_name: import.meta.env.VITE_SHEET_NAME || "",
      ...utmData
    };

    try {
      const appsScriptUrl = import.meta.env.VITE_GOOGLEADS_APPS_SCRIPT_URL;
      if (!appsScriptUrl) {
        throw new Error("Google Apps Script URL is not configured. Please check environment variables.");
      }

      // Google Apps Script web apps do not return CORS headers, and an
      // "application/json" content type would trigger a CORS preflight that
      // Apps Script cannot answer. Sending a "simple request" with a
      // text/plain body and mode: "no-cors" lets the browser submit the data
      // without being blocked. Apps Script still receives the raw JSON via
      // e.postData.contents. The response is opaque, so we treat a completed
      // request as success.
      await fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        mode: "no-cors",
        redirect: "follow"
      });

      // Reset form state
      setFormData({
        fullName: "",
        workEmail: "",
        companyName: "",
        headcount: "",
        hiring_timeline: ""
      });
      setPhoneNumber("");
      
      setShowSuccess(true);
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(`Error submitting form: ${error.message || "Please check your network and try again."}`);
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <Card className="border-none shadow-none rounded-[2.5rem] overflow-hidden bg-white relative">
        <CardContent className="p-8 md:p-12 text-center flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
            >
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </motion.div>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight">Thank You for Submitting!</h3>
            <p className="text-slate-600 font-medium leading-relaxed md:px-4">
              Our hiring support will get in touch with you soon for your hiring needs.
            </p>
          </div>
          
          <div className="bg-[#ED3554]/5 rounded-3xl p-6 md:p-8 border border-[#ED3554]/10 w-full mt-2 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
               <Zap className="h-24 w-24 text-primary" />
            </div>
            <p className="text-[10px] font-black text-[#555555] uppercase tracking-[0.2em] mb-4">Special Promotion</p>
            <p className="text-sm md:text-base font-bold text-slate-800 mb-6 leading-relaxed">
              To see more promotion, you can join on AJobThing WhatsApp Channel here.
            </p>
            <Button 
              className="w-full h-14 bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-lg rounded-2xl shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
              onClick={() => window.open("https://whatsapp.com/channel/0029VadYIsPB4hdYGIn57X2H", "_blank")}
            >
              <MessageSquareText className="h-6 w-6" />
              Join WhatsApp Channel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-none rounded-[2.5rem] overflow-hidden bg-white">
      <div className="bg-primary pt-5 pb-3 px-5 text-white text-center flex flex-col items-center">
          <button 
            onClick={onScrollToTestimonials}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-3 hover:bg-white/20 transition-all cursor-pointer"
          >
            <img 
              src="https://www.ajobthing.com/mkt/images/ajt/google.svg" 
              alt="Google" 
              className="h-2.5 w-2.5 brightness-0 invert" 
              referrerPolicy="no-referrer"
            />
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-2 w-2 fill-[#FFC107] text-[#FFC107]" />)}
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider">4.9 Google Reviews</span>
          </button>
        <h3 className="text-xl font-black tracking-tight">Start Hiring Now</h3>
      </div>
      <CardContent className="pt-2 px-6 pb-6 md:pt-3 md:px-8 md:pb-8 space-y-4 bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="fullName" className="text-sm font-semibold text-slate-700">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="fullName" 
                required
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                placeholder="Enter your full name" 
                className="h-10 border-slate-200 bg-white rounded-xl focus-visible:ring-primary font-medium placeholder:text-slate-400 placeholder:font-normal shadow-sm" 
                autoFocus={isOpen}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="workEmail" className="text-sm font-semibold text-slate-700">
                Work Email <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="workEmail" 
                type="email" 
                required
                value={formData.workEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, workEmail: e.target.value }))}
                placeholder="Enter your work email" 
                className="h-10 border-slate-200 bg-white rounded-xl focus-visible:ring-primary font-medium placeholder:text-slate-400 placeholder:font-normal shadow-sm" 
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <div className="flex h-10 w-full rounded-xl border border-slate-200 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 transition-all group/phone shadow-sm">
                <div className="flex items-center border-r border-slate-200 bg-slate-100/30">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-full px-3 gap-1 rounded-none hover:bg-slate-100/50 border-none transition-colors group/trigger"
                      >
                        <img 
                          src={COUNTRIES.find(c => c.code === phoneCode)?.flag} 
                          alt="Flag" 
                          className="w-6 h-4 object-cover rounded-sm ring-1 ring-black/5" 
                        />
                        <ChevronDown className="h-3 w-3 text-slate-400 group-hover/trigger:text-primary transition-colors" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search country..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {COUNTRIES.map((c) => (
                              <CommandItem
                                key={`${c.iso}-${c.code}`}
                                value={`${c.name} ${c.code}`}
                                onSelect={() => {
                                  setPhoneCode(c.code);
                                }}
                                className="gap-3 py-2 cursor-pointer"
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  <img src={c.flag} alt={c.iso} className="w-5 h-3.5 object-cover rounded-sm shadow-sm" />
                                  <span className="font-bold text-sm text-slate-700 min-w-[40px]">{c.code}</span>
                                  <span className="text-xs text-slate-500 font-medium truncate">{c.name}</span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center px-0 bg-white">
                  <span className="font-extrabold text-slate-800 text-sm whitespace-nowrap pl-3 pr-1">{phoneCode}</span>
                </div>
                <Input 
                  id="phone" 
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="123 456 789"
                  className="flex-1 border-none shadow-none focus-visible:ring-0 rounded-none bg-transparent h-full font-bold text-slate-900 px-1 placeholder:text-slate-300 transition-all font-mono" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="companyName" className="text-sm font-semibold text-slate-700">
                  Company Name <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="companyName" 
                required
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                placeholder="Enter Company Name" 
                className="h-10 border-slate-200 bg-white rounded-xl focus-visible:ring-primary font-medium placeholder:text-slate-400 placeholder:font-normal shadow-sm" 
              />
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-semibold text-slate-700">How many headcount are you planning to hire? <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.headcount}
                onValueChange={(val) => setFormData(prev => ({ ...prev, headcount: val }))}
              >
                <SelectTrigger className="w-full h-10 border-slate-200 bg-white rounded-xl font-medium text-slate-700 shadow-sm">
                  <SelectValue placeholder="Select headcount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-6 headcount">1-6 headcount</SelectItem>
                  <SelectItem value="7-15 headcount">7-15 headcount</SelectItem>
                  <SelectItem value="16-30 headcount">16-30 headcount</SelectItem>
                  <SelectItem value="More than 30 headcount">More than 30 headcount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-semibold text-slate-700">Are you currently hiring? <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.hiring_timeline}
                onValueChange={(val) => setFormData(prev => ({ ...prev, hiring_timeline: val }))}
              >
                <SelectTrigger className="w-full h-10 border-slate-200 bg-white rounded-xl font-medium text-slate-700 shadow-sm">
                  <SelectValue placeholder="Select a timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes, I'm hiring now">Yes, I'm hiring now</SelectItem>
                  <SelectItem value="Within 3 months">Within 3 months</SelectItem>
                  <SelectItem value="Within this year">Within this year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-1">
            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-white hover:brightness-90 text-lg font-black shadow-xl shadow-primary/10 rounded-2xl group transition-all"
            >
              {loading ? "Submitting..." : "Start Hiring"}
              {!loading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </div>
        </form>
        
        <div className="space-y-2">
          <p className="text-[9px] text-center text-[#555555] leading-normal font-medium px-4 tracking-tighter">
            We value your privacy. By completing this form, you consent to us reaching out regarding our products and services as outlined in our privacy policy.
          </p>
          <Separator className="bg-slate-100" />
          <p className="text-[10px] text-center font-bold text-slate-400 flex items-center justify-center gap-1 uppercase tracking-tight">
            Are you a jobseeker? <a href="https://www.maukerja.my/register" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Sign up here instead</a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function App() {
  const [selectedPositions, setSelectedPositions] = React.useState<string[]>([]);
  const [isHiringModalOpen, setIsHiringModalOpen] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth;
      const index = Math.round(scrollPosition / cardWidth);
      setActiveSlide(index);
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.offsetWidth,
        behavior: "smooth"
      });
    }
  };

  const prevSlide = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A1A] overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <header className="fixed top-0 left-0 right-0 z-[100] w-full shadow-sm shadow-slate-100/50">
        {/* SECTION 1 — TOP NAV (Jobseeker link) */}
        <div className="bg-[#F8F9FA] py-2 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
            <a href="https://www.maukerja.my/" target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-xs font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-1">
              Looking for a Job? <span className="text-primary">(I'm a Jobseeker)</span>
            </a>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="bg-[#ED3554]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-14 md:h-16 items-center">
              <a href="https://www.maukerja.my/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-90 transition-opacity">
                <img 
                  src="https://www.maukerja.my/mkt/images/logo-mk.png" 
                  alt="Maukerja" 
                  className="h-10 w-auto"
                  referrerPolicy="no-referrer"
                />
              </a>
              
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  className="text-xs font-black text-white uppercase tracking-widest hover:bg-white/10 rounded-xl" 
                  onClick={() => setIsHiringModalOpen(true)}
                >
                  Start Hiring Now
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer to prevent fixed header from overlapping content */}
      <div className="h-[92px] md:h-[104px]" />

      {/* SECTION 1 — HERO */}
      <section className="relative pt-0 pb-12 md:pb-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="relative z-10 pt-1 md:pt-2 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-16">
            {/* LEFT COLUMN: Main Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-[52%] w-full bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_45px_90px_-25px_rgba(0,0,0,0.05)] border border-slate-100/80 flex flex-col gap-5 md:gap-6"
            >
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-[2.25rem] xl:text-[2.65rem] font-black leading-[1.3] md:leading-tight tracking-normal md:tracking-tight text-slate-900">
                  Award-winning Recruitment Site: <br className="hidden lg:block" />
                  <span className="italic text-primary underline underline-offset-[10px] md:underline-offset-[12px] decoration-primary/30 block mt-3 lg:inline lg:mt-0">Hire Within 72 Hours</span>
                </h1>
              </div>
              
              <div>
                <span className="text-[10px] font-extrabold text-[#7C8CA1] tracking-[0.2em] uppercase mb-2 block">
                  Hiring for roles like:
                </span>
                <div className="flex flex-wrap gap-2 max-w-xl">
                  {[
                    "MARKETING EXECUTIVE",
                    "LIVE HOST",
                    "CONTENT CREATOR",
                    "RETAIL MANAGER",
                    "RETAIL ASSISTANT",
                    "CASHIER"
                  ].map((role) => (
                    <span 
                      key={role} 
                      className="inline-flex items-center bg-white border border-slate-100/80 shadow-sm hover:shadow-md hover:border-slate-200 transition-all text-[#374B5C] font-extrabold text-[9px] sm:text-[10px] tracking-wide uppercase px-2.5 py-1.5 rounded-lg cursor-default"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button 
                  onClick={() => setIsHiringModalOpen(true)}
                  className="w-full sm:w-auto bg-primary hover:brightness-90 text-white px-8 h-12 md:h-14 rounded-xl text-sm md:text-base font-black shadow-lg shadow-primary/15 transition-all transform hover:scale-105"
                >
                  Start Hiring Now
                </Button>
              </div>

              {/* Google Rating Below Button */}
              <div className="border-t border-slate-100/80 pt-4 mt-2 flex flex-col items-center sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2">
                  <img 
                    src="https://www.ajobthing.com/mkt/images/ajt/google.svg" 
                    alt="Google" 
                    className="h-4 w-4" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3 w-3 fill-[#FFC107] text-[#FFC107]" />)}
                  </div>
                </div>
                <div className="hidden sm:block h-4 w-px bg-slate-200" />
                <p className="text-[10px] md:text-xs font-black text-slate-800 uppercase tracking-wider text-center sm:text-left">
                  4.9 Rating <a 
                    href="https://www.google.com/search?q=ajobthing+malaysia#lrd=0x31cc4986cfea123b:0xf231fba79e701aaf,1,,,," 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-400 font-bold ml-1 hover:text-primary transition-colors underline decoration-slate-200 underline-offset-2"
                  >
                    on Google reviews
                  </a>
                </p>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Proportional Hero Image & Logo Marquee */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:w-[48%] w-full flex flex-col items-center lg:items-end gap-12"
            >
              <img 
                src="https://images.prismic.io/maukerja/agKfiaYofJOwHGsx_marketingretailandsalesstaff.png?auto=format,compress" 
                alt="Marketing Talent" 
                className="w-full max-w-[540px] h-auto object-contain transition-transform duration-700 hover:scale-[1.02] order-2 lg:order-1"
                referrerPolicy="no-referrer"
              />

              {/* Infinite Logo Marquee integrated within the column */}
              <div className="w-full max-w-[540px] overflow-hidden whitespace-nowrap py-4 relative group/marquee order-1 lg:order-2">
                {/* Fade overlays */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />
                
                <p className="text-xs md:text-sm font-black text-slate-500 uppercase tracking-[0.3em] mb-6 text-center px-4 leading-relaxed">
                  Trusted by Over <br className="sm:hidden" /> 15,000+ Top Employers
                </p>

                <motion.div 
                  className="inline-flex gap-20 items-center"
                  animate={{
                    x: [0, -1600],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 40,
                      ease: "linear",
                    },
                  }}
                >
                  {/* Duplicating logos for infinite scroll effect */}
                  {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo: any, i) => (
                    <div key={i} className="flex-none opacity-80 hover:opacity-100 transition-all duration-300">
                      <img 
                        src={logo.url} 
                        alt={logo.name} 
                        className={`${logo.isBig ? "h-10 md:h-16" : "h-9 md:h-14"} w-auto object-contain`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hiring Modal */}
        <Dialog open={isHiringModalOpen} onOpenChange={setIsHiringModalOpen}>
          <DialogContent className="sm:max-w-[480px] p-0 border-none bg-transparent shadow-none overflow-hidden rounded-[2.5rem] max-h-[90vh] overflow-y-auto custom-scrollbar">
            <DialogTitle className="sr-only">Hiring Form</DialogTitle>
            <HiringForm 
              isOpen={isHiringModalOpen}
              onSuccess={() => setIsHiringModalOpen(false)}
              onScrollToTestimonials={() => {
                setIsHiringModalOpen(false);
                setTimeout(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }}
            />
          </DialogContent>
        </Dialog>
      </section>

      {/* SECTION 1.5 — WHY HIRE MARKETING */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-normal md:tracking-tight leading-[1.3] md:leading-tight">
              Why Hire Top Talent on <span className="text-[#ED3554]">Maukerja by AJobThing</span>
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mt-6 mb-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Post Job and Get Recommended Talent Instantly",
                desc: "Your job goes live and the right talent comes to you.",
                icon: <FilePlus className="h-8 w-8 text-primary" />,
                bgColor: "bg-orange-50",
                iconColor: "bg-orange-100"
              },
              {
                title: "Chat Directly with Jobseeker",
                desc: "Message candidates in-app and use template to make hiring quick and easy.",
                icon: <MessageSquareText className="h-8 w-8 text-primary" />,
                bgColor: "bg-blue-50",
                iconColor: "bg-blue-100"
              },
              {
                title: "Over 5 million candidate profiles",
                desc: "Your next great talent is already here. Just waiting to be found.",
                icon: <Users className="h-8 w-8 text-primary" />,
                bgColor: "bg-green-50",
                iconColor: "bg-green-100"
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(237,53,84,0.15)] transition-all duration-500 flex flex-col items-center text-center"
              >
                <div className={`w-20 h-20 ${card.iconColor} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-black mb-4 text-slate-800 leading-tight">{card.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-[#1A1A1A] leading-[1.3] md:leading-tight tracking-normal md:tracking-tight">Want to See Real Results? Read from Our Success Stories</h2>
            <p className="text-lg md:text-xl text-[#555555] max-w-3xl mx-auto font-medium">
              HR teams across Malaysia have been hiring better, faster with <span className="text-[#ED3554]">Maukerja by AJobThing</span>
            </p>
            
            {/* Horizontal Badge */}
            <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-4 bg-white px-8 py-4 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-50">
              <img 
                src="https://www.ajobthing.com/mkt/images/ajt/google.svg" 
                alt="Google" 
                className="h-5 w-5" 
                referrerPolicy="no-referrer"
              />
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-5 w-5 fill-[#FFC107] text-[#FFC107]" />)}
              </div>
              <span className="text-xl font-black text-[#1A1A1A]">4.9</span>
              <div className="h-6 w-px bg-slate-200 sm:block hidden" />
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">Best Recruitment Portal in Malaysia</span>
              <div className="h-6 w-px bg-slate-200 sm:block hidden" />
              <a 
                href="https://www.google.com/search?q=ajobthing+malaysia#lrd=0x31cc4986cfea123b:0xf231fba79e701aaf,1,,,," 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium text-slate-400 hover:text-primary transition-colors underline decoration-slate-200 underline-offset-4"
              >
                See all our reviews (2,600+ Reviews)
              </a>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-6xl mx-auto">
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start">
                  <Card className="h-full border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-[1.5rem] bg-white group/card">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-center gap-6 mb-6">
                        <img src={t.img} alt={t.company} className="h-16 w-auto object-contain shrink-0" />
                        <div>
                          <h4 className="font-black text-[#1A1A1A] tracking-tight text-base uppercase">{t.company}</h4>
                          <p className="text-xs font-bold text-slate-400">{t.name}</p>
                        </div>
                      </div>
                      <p className="text-[#555555] text-sm leading-relaxed relative z-10 font-medium">
                        {t.quote}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute -left-4 md:-left-12 top-[40%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-xl z-20 hover:bg-primary transition-all disabled:opacity-30"
              disabled={activeSlide === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute -right-4 md:-right-12 top-[40%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-xl z-20 hover:bg-primary transition-all disabled:opacity-30"
              disabled={activeSlide >= Math.ceil(TESTIMONIALS.length / 1) - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: Math.ceil(TESTIMONIALS.length) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSlide === i ? "bg-primary w-4" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>

            {/* Video Embed */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/60 border-8 border-white bg-white"
            >
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/DHLsrfdWvUs"
                  title="Maukerja Success Story"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHY MAUKERJA */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] leading-[1.3] md:leading-tight tracking-normal md:tracking-tight">
              Why <span className="text-[#ED3554]">Maukerja by AJobThing</span> Makes Hiring Easy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                stat: "Get 3x More Visibility",
                desc: "Cross-publish your job ad on multiple job platforms to attract more candidates.",
                img: "https://www.maukerja.my/mkt/images/mk/reason_get3x.png",
              },
              {
                stat: "AI Instant Match",
                desc: "Get matched with the right talent instantly.",
                img: "https://www.maukerja.my/mkt/images/mk/reason_over5mil.png",
              },
              {
                stat: "Hire Faster with AI-Powered Solution",
                desc: "Less effort and simplify your recruiting process to find top talents in just 72 hours!",
                img: "https://www.maukerja.my/mkt/images/mk/reason_hirefaster.png",
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-10 transition-transform duration-500 group-hover:scale-105">
                  <img 
                    src={card.img} 
                    alt={card.stat} 
                    className="h-36 md:h-44 w-auto object-contain" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <h3 className="text-2xl font-black mb-4 text-[#334155] leading-tight">{card.stat}</h3>
                <p className="text-slate-600 leading-relaxed max-w-[280px] font-medium">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON RANGE — MAUKERJA VS OTHERS */}
      <section className="py-24 bg-[#FCFCFD] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-normal md:tracking-tight leading-[1.3] md:leading-tight">
              Why Choose <span className="text-[#ED3554]">MauKerja</span> Over Other Job Platforms?
            </h2>
          </div>

          {/* Table Container - Custom crafted responsive comparison card */}
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="p-4 sm:p-8 text-xs sm:text-sm font-semibold text-slate-500 w-[42%]"></th>
                    <th className="p-4 sm:p-8 text-center w-[29%]">
                      <span className="text-lg sm:text-3xl font-black text-[#ED3554] tracking-tight block">
                        Maukerja
                      </span>
                    </th>
                    <th className="p-4 sm:p-8 text-center w-[29%]">
                      <span className="text-lg sm:text-3xl font-black text-[#64748B] tracking-tight block">
                        Other Job Platforms
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Category Header Row - Job Posting */}
                  <tr className="bg-slate-50/70 border-b border-slate-100">
                    <td colSpan={3} className="p-4 sm:p-5 px-6 sm:px-8">
                      <div className="flex items-center justify-between text-sm sm:text-lg font-black text-[#1E293B]">
                        <span className="tracking-tight">Job Posting</span>
                        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 transform rotate-180 transition-transform" />
                      </div>
                    </td>
                  </tr>

                  {/* Row 1: Job Ad (Single job posting) */}
                  <tr className="border-b border-slate-100/70 hover:bg-slate-50/20 transition-colors">
                    <td className="p-4 sm:p-7 px-6 sm:px-8 text-xs sm:text-base font-bold text-slate-700 leading-snug">
                      Job Ad (Single job posting)
                    </td>
                    <td className="p-4 sm:p-7 text-center border-l border-r border-[#ED3554] bg-[#ED3554]/[0.02]">
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <Check className="h-5 w-5 sm:h-6 sm:w-6 text-[#00C2A0] stroke-[3.5]" />
                        <span className="text-[9px] sm:text-[11px] font-black tracking-wide text-[#ED3554] bg-[#ED3554]/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          *Instant hiring within 72 hours
                        </span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-7 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 sm:h-6 sm:w-6 text-[#00C2A0] stroke-[3.5]" />
                      </div>
                    </td>
                  </tr>

                  {/* Row 2: Job Ad (Unlimited job posting yearly) */}
                  <tr className="border-b border-slate-100/70 hover:bg-slate-50/20 transition-colors">
                    <td className="p-4 sm:p-7 px-6 sm:px-8 text-xs sm:text-base font-bold text-slate-700 leading-snug">
                      Job Ad (Unlimited job posting yearly)
                    </td>
                    <td className="p-4 sm:p-7 text-center border-l border-r border-[#ED3554] bg-[#ED3554]/[0.02]">
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <Check className="h-5 w-5 sm:h-6 sm:w-6 text-[#00C2A0] stroke-[3.5]" />
                        <span className="text-[9px] sm:text-[11px] font-black tracking-wide text-[#ED3554] bg-[#ED3554]/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          *Instant hiring within 72 hours
                        </span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-7 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 sm:h-6 sm:w-6 text-[#00C2A0] stroke-[3.5]" />
                      </div>
                    </td>
                  </tr>

                  {/* Row 3: Job Posting Durations */}
                  <tr className="border-b border-slate-100/70 hover:bg-slate-50/20 transition-colors">
                    <td className="p-4 sm:p-7 px-6 sm:px-8 text-xs sm:text-base font-bold text-slate-700 leading-snug">
                      Job Posting Durations
                    </td>
                    <td className="p-4 sm:p-7 text-center border-l border-r border-[#ED3554] bg-[#ED3554]/[0.02] font-black text-[#1A1A1A] text-sm sm:text-lg">
                      45 days
                    </td>
                    <td className="p-4 sm:p-7 text-center text-slate-600 font-bold text-sm sm:text-lg">
                      30 days
                    </td>
                  </tr>

                  {/* Row 4: English Job Posting Languages */}
                  <tr className="border-b border-slate-100/70 hover:bg-slate-50/20 transition-colors">
                    <td className="p-4 sm:p-7 px-6 sm:px-8 text-xs sm:text-base font-bold text-slate-700 leading-snug">
                      English Job Posting Languages
                    </td>
                    <td className="p-4 sm:p-7 text-center border-l border-r border-[#ED3554] bg-[#ED3554]/[0.02]">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 sm:h-6 sm:w-6 text-[#00C2A0] stroke-[3.5]" />
                      </div>
                    </td>
                    <td className="p-4 sm:p-7 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 sm:h-6 sm:w-6 text-[#00C2A0] stroke-[3.5]" />
                      </div>
                    </td>
                  </tr>

                  {/* Row 5: Mandarin Job Posting Languages */}
                  <tr className="border-b border-slate-100/70 hover:bg-slate-50/20 transition-colors">
                    <td className="p-4 sm:p-7 px-6 sm:px-8 text-xs sm:text-base font-bold text-slate-700 leading-snug">
                      Mandarin Job Posting Languages
                    </td>
                    <td className="p-4 sm:p-7 text-center border-l border-r border-[#ED3554] bg-[#ED3554]/[0.02]">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 sm:h-6 sm:w-6 text-[#00C2A0] stroke-[3.5]" />
                      </div>
                    </td>
                    <td className="p-4 sm:p-7 text-center">
                      <div className="flex justify-center">
                        <X className="h-5 w-5 sm:h-6 sm:w-6 text-rose-500 stroke-[3.5]" />
                      </div>
                    </td>
                  </tr>

                  {/* Row 6: Malay Job Posting Languages */}
                  <tr className="border-b border-slate-100/70 hover:bg-slate-50/20 transition-colors">
                    <td className="p-4 sm:p-7 px-6 sm:px-8 text-xs sm:text-base font-bold text-slate-700 leading-snug">
                      Malay Job Posting Languages
                    </td>
                    <td className="p-4 sm:p-7 text-center border-l border-r border-[#ED3554] bg-[#ED3554]/[0.02]">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 sm:h-6 sm:w-6 text-[#00C2A0] stroke-[3.5]" />
                      </div>
                    </td>
                    <td className="p-4 sm:p-7 text-center">
                      <div className="flex justify-center">
                        <X className="h-5 w-5 sm:h-6 sm:w-6 text-rose-500 stroke-[3.5]" />
                      </div>
                    </td>
                  </tr>

                  {/* Row 7: Posted to Multiple Platforms */}
                  <tr className="hover:bg-slate-50/20 transition-colors">
                    <td className="p-4 sm:p-7 px-6 sm:px-8 text-xs sm:text-base font-bold text-slate-700 leading-snug">
                      Posted to Multiple Platforms
                    </td>
                    <td className="p-4 sm:p-7 text-center border-l border-r border-b border-[#ED3554] bg-[#ED3554]/[0.02]">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Check className="h-5 w-5 sm:h-6 sm:w-6 text-[#00C2A0] stroke-[3.5]" />
                        <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap max-w-[180px] sm:max-w-none">
                          {[
                            { name: "Maukerja", url: "https://files.ajobthing.com/assets/platform/maukerja-wave.png" },
                            { name: "Ricebowl", url: "https://files.ajobthing.com/assets/platform/ricebowl-wave.png" },
                            { name: "Epic", url: "https://d1l8l3rp33cdzs.cloudfront.net/images/ajobthingcomsmt/epic.png" },
                            { name: "Facebook", url: "https://files.ajobthing.com/assets/landing/ico-facebook.svg" },
                            { name: "LinkedIn", url: "https://files.ajobthing.com/assets/landing/ico-linkedin.svg" },
                            { name: "Google", url: "https://files.ajobthing.com/assets/landing/ico-google.svg" }
                          ].map((logo, idx) => (
                            <div key={idx} className="w-[22px] h-[22px] sm:w-[30px] sm:h-[30px] rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm overflow-hidden p-0.5 hover:scale-110 hover:shadow transition-all duration-300 animate-fade-in">
                              <img src={logo.url} alt={logo.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 sm:p-7 text-center">
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <X className="h-5 w-5 sm:h-6 sm:w-6 text-rose-500 stroke-[3.5]" />
                        <span className="text-[9px] sm:text-[11px] font-black tracking-wide text-slate-500 bg-slate-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase">
                          *Limited
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Button below table */}
          <div className="mt-12 text-center">
            <Button
              onClick={() => setIsHiringModalOpen(true)}
              className="w-full sm:w-auto bg-[#ED3554] hover:bg-[#d92241] text-white px-12 h-14 md:h-16 rounded-2xl text-lg font-black shadow-xl shadow-[#ED3554]/20 transition-all transform hover:scale-105"
            >
              Start Hiring Now
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HIRING SOLUTIONS */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">OUR HIRING SOLUTION</h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Personalized Employer Branding Profile",
                desc: "Show off your company's unique culture to attract young and talented marketing people by matching your brand with your hiring plans.",
                img: "https://www.maukerja.my/mkt/images/mk/hiringsol_1.png"
              },
              {
                title: "Social Media Presence",
                desc: "Let our creative team showcase your employer brand, making it easier for you to connect with and attract new marketing talents.",
                img: "https://www.maukerja.my/mkt/images/mk/hiringsol_2.png"
              }
            ].map((sol, i) => (
              <Card key={i} className="border-none shadow-sm h-full rounded-[3rem] overflow-hidden bg-white group">
                <div className={`aspect-[16/10] overflow-hidden ${sol.title === "Social Media Presence" ? "bg-slate-50" : ""}`}>
                  <img 
                    src={sol.img} 
                    alt={sol.title} 
                    className={`w-full h-full ${sol.title === "Social Media Presence" ? "object-contain p-4" : "object-cover group-hover:scale-110"} transition-transform duration-700`} 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <CardContent className="p-10">
                  <h3 className="text-2xl font-black mb-6 text-[#1A1A1A] group-hover:text-primary transition-colors">{sol.title}</h3>
                  <p className="text-[#555555] leading-relaxed mb-8 font-medium">
                    {sol.desc}
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary font-black uppercase text-xs tracking-widest gap-2 hover:no-underline group/link"
                    onClick={() => setIsHiringModalOpen(true)}
                  >
                    Find Out More <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-[1.3] md:leading-tight tracking-normal md:tracking-tight">Easy Hire in 3 Simple Steps</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
            <div className="hidden lg:block absolute top-24 left-1/4 right-1/4 h-px border-t-2 border-dashed border-slate-200 -z-10" />
            
            {[
              {
                step: "STEP 1",
                title: "Register on Our Platform",
                desc: "Fill the form and verify that you're really an employer from your company.",
                icon: <UserPlus className="h-8 w-8" />
              },
              {
                step: "STEP 2",
                title: "Advertise Your Job Opening",
                desc: "Follow our step-by-step instructions to craft an appealing job post.",
                icon: <Briefcase className="h-8 w-8" />
              },
              {
                step: "STEP 3",
                title: "Get Applications Instantly",
                desc: "Get relevant candidates that match with your job requirements with AI filtering.",
                icon: <Zap className="h-8 w-8" />
              }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="relative w-20 h-20 rounded-[1.5rem] bg-[#F8F9FA] border border-slate-100 shadow-xl shadow-slate-100 flex items-center justify-center mx-auto mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
                  {step.icon}
                </div>
                <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">{step.step}</h4>
                <h3 className="text-xl font-black mb-6 text-[#1A1A1A] leading-tight group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-[#555555] font-medium leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button 
              onClick={() => setIsHiringModalOpen(true)}
              className="bg-primary hover:brightness-90 text-white px-16 h-16 rounded-2xl text-xl font-black shadow-2xl shadow-primary/10 group animate-pulse hover:animate-none"
            >
              Start Hiring <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FAQs */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#1A1A1A]">FAQs</h2>
            <p className="text-lg text-[#555555] font-semibold italic">Frequently asked questions from employers</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "What is the pricing for Job Ads in Maukerja?",
                a: (
                  <>
                    Job Ads in Maukerja is a complimentary service for our existing customer, please contact your Account Manager, or reach out to 018-9666610 for further assistance. For new customers, kindly{" "}
                    <button 
                      onClick={() => setIsHiringModalOpen(true)}
                      className="text-[#ED3554] hover:underline font-bold cursor-pointer"
                    >
                      complete the form above
                    </button>{" "}
                    to be assigned a dedicated Account Manager.
                  </>
                )
              },
              {
                q: "From where do these relevant candidates originate?",
                a: "Utilizing AI technology, Maukerja by AJobThing provide you with instant access to applicants from Maukerja and Ricebowl Malaysia Job Portals who closely match your job criteria and are actively seeking employment."
              },
              {
                q: "Can small and medium-sized enterprises (SMEs) publish Job Ads in Maukerja?",
                a: "Job Ads are available to all businesses, including SMEs and large corporate companies, to swiftly fill their job positions."
              },
              {
                q: "What sets Job Ads apart from others?",
                a: "Unlike regular Job Ad, our platform significantly reduce the application duration and exclusively present applicants who meet your job requirements in a much shorter time compared to others."
              },
              {
                q: "How do I get started with Maukerja by AJobThing hiring tool for my job ads?",
                a: (
                  <>
                    Its easy! Just{" "}
                    <button 
                      onClick={() => setIsHiringModalOpen(true)}
                      className="text-[#ED3554] hover:underline font-bold cursor-pointer"
                    >
                      fill out the form above
                    </button>
                    , and our account manager will guide you through the process step by step to ensure you hire top talents within 72 hours! If you have any further questions, please feel free to contact us at 018-9666610 for assistance.
                  </>
                )
              },
              {
                q: "How many job applications can I received with Maukerja by AJobThing recruitment?",
                a: "Maukerja uses AI hiring help you reach up to 100 job seekers actively searching for jobs within 72 hours. They are a perfect match for your job in terms of skills, location, and more. This means you will receive more job applicants and hire the right talents within 72 hours."
              }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-none bg-white rounded-3xl px-8 shadow-sm">
                <AccordionTrigger className="text-lg font-black text-left hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#555555] text-base leading-relaxed pb-8 font-medium">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SECTION 7 — PERSONALIZED SOLUTION */}
      <section className="py-12 bg-[#FFF5F6] mb-24 rounded-[3rem] max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <img 
              src="https://www.maukerja.my/mkt/images/mk/cta.svg" 
              alt="Hiring Solution" 
              className="h-64 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-center md:text-left order-1 md:order-2">
            <h3 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-4 leading-tight">
              Need a personalized hiring solution? Contact us today!
            </h3>
            <p className="text-lg text-[#555555] mb-8 font-medium">
              We can design solutions that fit your goals and budget.
            </p>
            <Button 
              onClick={() => setIsHiringModalOpen(true)}
              className="bg-[#ED3554] hover:bg-[#D42F4B] text-white px-10 h-14 rounded-2xl text-lg font-black shadow-xl shadow-[#ED3554]/20 transition-all transform hover:scale-105"
            >
              Schedule A Call
            </Button>
          </div>
        </div>
      </section>

      {/* Final Footer */}
      <footer className="bg-white text-[#1A1A1A] pt-20 pb-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 mb-16">
            {/* Column 1 */}
            <div>
              <h4 className="font-black text-sm mb-6 text-[#1A1A1A]">Bagi Pekerja</h4>
              <ul className="space-y-3 text-[#007bff] text-[13px] font-medium">
                <li><a href="https://www.maukerja.my/category" target="_blank" rel="noopener noreferrer" className="hover:underline">Cari Kerja Berdasarkan Kategori</a></li>
                <li><a href="https://www.maukerja.my/states" target="_blank" rel="noopener noreferrer" className="hover:underline">Cari Kerja Berdasarkan Lokasi</a></li>
                <li><a href="https://www.maukerja.my/overseas" target="_blank" rel="noopener noreferrer" className="hover:underline">Cari Kerja Berdasarkan Negara</a></li>
                <li><a href="https://www.maukerja.my/jobseekers-testimonial" target="_blank" rel="noopener noreferrer" className="hover:underline">Testimoni</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-black text-sm mb-6 text-[#1A1A1A]">Syarikat-syarikat</h4>
              <ul className="space-y-3 text-[#007bff] text-[13px] font-medium">
                <li><a href="https://www.maukerja.my/company/all" target="_blank" rel="noopener noreferrer" className="hover:underline">Profil Syarikat</a></li>
                <li><a href="https://www.maukerja.my/company/all/by-location" target="_blank" rel="noopener noreferrer" className="hover:underline">Syarikat mengikuti Lokasi</a></li>
                <li><a href="https://www.maukerja.my/company/all/by-industry" target="_blank" rel="noopener noreferrer" className="hover:underline">Syarikat mengikuti Industri</a></li>
                <li><a href="https://www.maukerja.my/company/all/by-type" target="_blank" rel="noopener noreferrer" className="hover:underline">Syarikat mengikuti Jenis</a></li>
                <li><a href="https://www.maukerja.my/company/all/by-size" target="_blank" rel="noopener noreferrer" className="hover:underline">Syarikat mengikuti Saiz</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-black text-sm mb-6 text-[#1A1A1A]">Panduan Kerjaya</h4>
              <ul className="space-y-3 text-[#007bff] text-[13px] font-medium">
                <li><a href="https://www.maukerja.my/career-advice" target="_blank" rel="noopener noreferrer" className="hover:underline">Tip Kerjaya</a></li>
                <li><a href="https://www.maukerja.my/resume?entry_point=homepage" target="_blank" rel="noopener noreferrer" className="hover:underline">Muat Naik Resume</a></li>
                <li><a href="https://www.maukerja.my/career-advice/forum" target="_blank" rel="noopener noreferrer" className="hover:underline">Forum</a></li>
                <li><a href="https://www.maukerja.my/career-advice/blog" target="_blank" rel="noopener noreferrer" className="hover:underline">Blog</a></li>
                <li><a href="https://www.maukerja.my/career-advice/career-tools/salary-checker" target="_blank" rel="noopener noreferrer" className="hover:underline">Semak Gaji</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="font-black text-sm mb-6 text-[#1A1A1A]">Bagi Majikan</h4>
              <ul className="space-y-3 text-[#007bff] text-[13px] font-medium">
                <li><a href="https://www.ajobthing.com/register?utm_source=maukerjaLiteWebsite&utm_medium=footer" target="_blank" rel="noopener noreferrer" className="hover:underline">Iklan Jawatan Kosong</a></li>
                <li><a href="https://www.ajobthing.com/pricing" target="_blank" rel="noopener noreferrer" className="hover:underline">Harga Pakej</a></li>
                <li><a href="https://www.ajobthing.com/product/instant-job-ad" target="_blank" rel="noopener noreferrer" className="hover:underline">Cari Pekerja Dalam 72 Jam</a></li>
                <li><a href="https://www.ajobthing.com/resources/recruitment-tools/job-description" target="_blank" rel="noopener noreferrer" className="hover:underline">Kit HR</a></li>
                <li><a href="https://www.ajobthing.com/resources/recruiter-advice" target="_blank" rel="noopener noreferrer" className="hover:underline">Info Majikan</a></li>
                <li><a href="https://www.maukerja.my/employers-testimonial" target="_blank" rel="noopener noreferrer" className="hover:underline">Testimoni</a></li>
              </ul>
            </div>

            {/* Column 5 */}
            <div>
              <h4 className="font-black text-sm mb-6 text-[#1A1A1A]">Bantuan</h4>
              <ul className="space-y-3 text-[#007bff] text-[13px] font-medium">
                <li><a href="https://support.maukerja.my/hc/en-us" target="_blank" rel="noopener noreferrer" className="hover:underline">Soalan Lazim</a></li>
                <li><a href="https://www.maukerja.my/about" target="_blank" rel="noopener noreferrer" className="hover:underline">Tentang Kami</a></li>
                <li><a href="https://www.maukerja.my/settings/contact-us" target="_blank" rel="noopener noreferrer" className="hover:underline">Hubungi Kami</a></li>
                <li><a href="https://www.maukerja.my/company/maukerja-malaysia-agensi-pekerjaan-ajobthing-sdn-bhd/jobs" target="_blank" rel="noopener noreferrer" className="hover:underline">Kerja dengan Maukerja</a></li>
              </ul>
            </div>

            {/* Column 6: Apps */}
            <div className="col-span-2 lg:col-span-1">
              <h4 className="font-black text-sm mb-6 text-[#1A1A1A]">Download Our Apps</h4>
              <div className="space-y-3">
                <a href="https://play.google.com/store/apps/details?id=my.maukerja.applicant" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-[42px] w-auto" />
                </a>
                <a href="https://apps.apple.com/my/app/maukerja-malaysia-job-search/id1383614538" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105">
                  <img src="https://www.maukerja.my/mkt/images/appstore.png" alt="App Store" className="h-[40px] w-auto" />
                </a>
                <a href="https://news.google.com/publications/CAAqBwgKMPiIoQswkJO5Aw?hl=en-ID&gl=ID&ceid=ID:en" target="_blank" rel="noopener noreferrer" className="block mt-4 transition-transform hover:scale-105">
                  <img src="https://www.maukerja.my/mkt/images/googlenews.png" alt="Google News" className="h-8 w-auto" />
                </a>
              </div>
            </div>

            {/* Column 7: Social */}
            <div className="col-span-2 lg:col-span-1">
              <h4 className="font-black text-sm mb-6 text-[#1A1A1A]">Follow us</h4>
              <div className="flex gap-2">
                <a href="https://www.facebook.com/MauKerja" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#3B5998] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <Facebook className="h-4 w-4 fill-current" />
                </a>
                <a href="https://x.com/MauKerjaMY" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:opacity-80 transition-opacity p-2">
                  <svg viewBox="0 0 24 24" className="h-full w-full fill-current" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                <a href="https://www.youtube.com/c/MaukerjaMy" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <div className="h-4 w-4 fill-current"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></div>
                </a>
                <a href="https://www.instagram.com/maukerja.malaysia/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          
          <Separator className="bg-slate-100 mb-8" />
          
          <div className="text-center text-slate-400 font-bold text-[13px]">
            <p>Copyright Agensi Pekerjaan Ajobthing Sdn Bhd | SSM (1036935K) \ EA License Number JTKSM 232C</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


