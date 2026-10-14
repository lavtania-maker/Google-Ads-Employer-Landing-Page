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
import { Hero } from "@/components/landing/hero";
import { WhyHire } from "@/components/landing/why-hire";
import { ChatSection } from "@/components/landing/chat-section";
import { SuccessStories } from "@/components/landing/success-stories";
import { Comparison } from "@/components/landing/comparison";
import { Solutions } from "@/components/landing/solutions";
import { Steps, Faq, CtaBanner } from "@/components/landing/steps-faq-cta";
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
      ...utmData
    };

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let errorMsg = "Submission failed";
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errorMsg = errData.error;
          }
        } catch (_) {
          const errText = await response.text();
          if (errText) errorMsg = errText;
        }
        throw new Error(errorMsg);
      }

      // Track successful hiring form submission in GA4
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "submit_employer_lp");
      }

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
          
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <Separator className="bg-slate-100" />
            <p>
              Already have an AJobThing account?<br />
              <a href="https://www.ajobthing.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">Log in to AJobThing</a> and post your job.
            </p>
            <p>
              Don’t have an account yet?<br />
              No worries! We can help you create one.<br />
              <a href="https://wa.me/60189666610?text=Hi+admin%2C+I+just+filled+out+the+form+on+Google+Ads+and+would+like+to+know+more+about+your+hiring+packages.+Could+you+share+more+info%3F" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">Contact us</a> on WhatsApp for help.
            </p>
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
              width="10"
              height="10"
              loading="eager"
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
                          width="24"
                          height="16"
                          loading="eager"
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
                                  <img 
                                    src={c.flag} 
                                    alt={c.iso} 
                                    className="w-5 h-3.5 object-cover rounded-sm shadow-sm" 
                                    width="20"
                                    height="14"
                                    loading="lazy"
                                  />
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
  const [isHiringModalOpen, setIsHiringModalOpen] = React.useState(false);
  const openForm = () => setIsHiringModalOpen(true);

  React.useEffect(() => {
    (window as any).openHiringModal = () => setIsHiringModalOpen(true);
    return () => {
      delete (window as any).openHiringModal;
    };
  }, []);

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
                  width="168"
                  height="40"
                  loading="eager"
                />
              </a>
              
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  className="text-xs font-black text-white uppercase tracking-widest hover:bg-white/10 rounded-xl" 
                  onClick={openForm}
                >
                  Post a Job Now
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer to prevent fixed header from overlapping content */}
      <div className="h-[92px] md:h-[104px]" />

      <main>
        <Hero onCta={openForm} />
        <WhyHire />
        <ChatSection />
        <SuccessStories />
        <Comparison onCta={openForm} />
        <Solutions onCta={openForm} />
        <Steps onCta={openForm} />
        <Faq />
        <CtaBanner onCta={openForm} />
      </main>

      {/* Hiring Modal */}
      <Dialog open={isHiringModalOpen} onOpenChange={setIsHiringModalOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 border-none bg-transparent shadow-none overflow-hidden rounded-[2.5rem] max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogTitle className="sr-only">Hiring Form</DialogTitle>
          <HiringForm 
            isOpen={isHiringModalOpen}
            onSuccess={() => setIsHiringModalOpen(false)}
            onScrollToTestimonials={() => {
              setIsHiringModalOpen(false);
              setTimeout(() => document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" }), 300);
            }}
          />
        </DialogContent>
      </Dialog>
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
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Google Play" 
                    className="h-[42px] w-auto" 
                    width="135"
                    height="42"
                    loading="lazy"
                  />
                </a>
                <a href="https://apps.apple.com/my/app/maukerja-malaysia-job-search/id1383614538" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105">
                  <img 
                    src="https://www.maukerja.my/mkt/images/appstore.png" 
                    alt="App Store" 
                    className="h-[40px] w-auto" 
                    width="135"
                    height="40"
                    loading="lazy"
                  />
                </a>
                <a href="https://news.google.com/publications/CAAqBwgKMPiIoQswkJO5Aw?hl=en-ID&gl=ID&ceid=ID:en" target="_blank" rel="noopener noreferrer" className="block mt-4 transition-transform hover:scale-105">
                  <img 
                    src="https://www.maukerja.my/mkt/images/googlenews.png" 
                    alt="Google News" 
                    className="h-8 w-auto" 
                    width="142"
                    height="32"
                    loading="lazy"
                  />
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


