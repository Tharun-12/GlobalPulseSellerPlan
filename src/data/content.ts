import {
  GraduationCap,
  Users,
  Briefcase,
  Globe,
  Factory,
  Package,
  Ship,
  Compass,
  BookOpen,
  Search,
  Presentation,
  Building2,
} from 'lucide-react';

export type Benefit = {
  icon: typeof GraduationCap;
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    icon: GraduationCap,
    title: 'Export-Import Course',
    description:
      'Recorded Export-Import Course access through the LMS to help you understand the fundamentals of international trade.',
  },
  {
    icon: Users,
    title: '50 Buyer Credits',
    description:
      'Access buyer opportunities through GlobPulse. [PRODUCT TEAM CONFIRMATION REQUIRED — exact functionality of Buyer Credits to be confirmed]',
  },
  {
    icon: Briefcase,
    title: 'Logo + Letterhead + Website',
    description:
      'Professional business assets including a custom logo, letterhead, and 1-month website access to present your business.',
  },
  {
    icon: Globe,
    title: 'GlobPulse Free Plan',
    description:
      '1 year of GlobPulse Free Plan access to build your presence on the B2B marketplace and explore global business opportunities.',
  },
];

export type Audience = {
  icon: typeof Factory;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const audiences: Audience[] = [
  {
    icon: Factory,
    title: 'Manufacturers',
    description: 'Showcase your products beyond your existing market and reach international buyers on a B2B marketplace for manufacturers.',
    image: 'https://images.pexels.com/photos/2760286/pexels-photo-2760286.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Industrial manufacturing facility with stainless steel tanks',
  },
  {
    icon: Package,
    title: 'Suppliers',
    description: 'Explore new buyer and business opportunities on a B2B marketplace for suppliers and connect with global trade partners.',
    image: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Workers handling packages in a large warehouse',
  },
  {
    icon: Ship,
    title: 'Exporters',
    description: 'Expand your international business reach and find buyers for export products through a B2B platform for exporters in India.',
    image: 'https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Cargo ship loaded with containers at sunset',
  },
  {
    icon: Compass,
    title: 'Businesses Exploring Exports',
    description: 'Build your foundation before entering international markets with the tools and knowledge to start exploring global opportunities.',
    image: 'https://images.pexels.com/photos/7792841/pexels-photo-7792841.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Business handshake in a professional office setting',
  },
];

export type JourneyStep = {
  icon: typeof BookOpen;
  label: string;
  title: string;
  description: string;
};

export const journeySteps: JourneyStep[] = [
  {
    icon: BookOpen,
    label: 'LEARN',
    title: 'Export-Import Course',
    description: 'Build your trade knowledge with a recorded Export-Import Course through the LMS.',
  },
  {
    icon: Search,
    label: 'EXPLORE',
    title: 'Buyer Opportunities',
    description: 'Use your 50 Buyer Credits to explore buyer and business opportunities on GlobPulse.',
  },
  {
    icon: Presentation,
    label: 'PRESENT',
    title: 'Logo + Letterhead + Website',
    description: 'Present a professional business identity with custom assets and 1-month website access.',
  },
  {
    icon: Building2,
    label: 'ACCESS',
    title: '1-Year GlobPulse Free Plan',
    description: 'Build your presence on the GlobPulse B2B marketplace with 1 year of Free Plan access.',
  },
];

export type HowItWorksStep = {
  number: string;
  title: string;
  description: string;
};

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: '01',
    title: 'Register',
    description: 'Create your seller account on GlobPulse to get started.',
  },
  {
    number: '02',
    title: 'Pay ₹999',
    description: 'Complete secure payment through the Razorpay payment gateway.',
  },
  {
    number: '03',
    title: 'Activate',
    description: 'Access the benefits included with your ₹999 Seller Plan.',
  },
];

export type Screenshot = {
  title: string;
  description: string;
  image: string;
  placeholder: boolean;
};

export const platformScreenshots: Screenshot[] = [
  {
    title: 'Seller Profile',
    description: 'Build and manage your seller profile on GlobPulse to present your business to international buyers.',
    image: 'https://images.pexels.com/photos/9034729/pexels-photo-9034729.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    placeholder: true,
  },
  {
    title: 'Product Listing',
    description: 'List your products on the GlobPulse B2B marketplace to showcase them to global buyers.',
    image: 'https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    placeholder: true,
  },
  {
    title: 'Buyer Opportunities',
    description: 'Explore buyer opportunities and connect with international businesses through GlobPulse.',
    image: 'https://images.pexels.com/photos/8555366/pexels-photo-8555366.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    placeholder: true,
  },
  {
    title: 'Platform Screens',
    description: 'Navigate the GlobPulse platform to manage your presence and explore global trade opportunities.',
    image: 'https://images.pexels.com/photos/4872021/pexels-photo-4872021.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    placeholder: true,
  },
];

export type Testimonial = {
  text: string;
  businessName: string;
  designation: string;
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    text: '[APPROVED SELLER TESTIMONIAL — Replace with genuine approved seller feedback]',
    businessName: '[Business Name]',
    designation: '[Designation]',
    placeholder: true,
  },
  {
    text: '[APPROVED SELLER TESTIMONIAL — Replace with genuine approved seller feedback]',
    businessName: '[Business Name]',
    designation: '[Designation]',
    placeholder: true,
  },
  {
    text: '[APPROVED SELLER TESTIMONIAL — Replace with genuine approved seller feedback]',
    businessName: '[Business Name]',
    designation: '[Designation]',
    placeholder: true,
  },
];

export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: 'Why should I pay ₹999 when other B2B platforms offer free registration?',
    answer:
      'The ₹999 is not simply a registration charge. The plan combines an Export-Import Course, 50 Buyer Credits, Logo + Letterhead + Website access and 1-year GlobPulse Free Plan access.',
  },
  {
    question: 'How will GlobPulse help me find buyers?',
    answer:
      'GlobPulse provides a B2B platform where sellers can build their business presence and explore buyer and business opportunities. The platform video and screenshots should show the actual seller and buyer journey.',
  },
  {
    question: 'Will I get guaranteed buyers or export orders?',
    answer:
      'No guaranteed orders should be promised. GlobPulse provides access to business opportunities and buyer-seller connections. Actual enquiries and orders depend on factors such as product demand, pricing, business profile and buyer requirements.',
  },
  {
    question: 'What exactly are the 50 Buyer Credits?',
    answer:
      '[PRODUCT TEAM CONFIRMATION REQUIRED] — What one credit allows the seller to access/do, whether credits expire, and whether additional credits can be purchased must be confirmed by the product team. This content is editable through configuration.',
  },
  {
    question: 'I have never exported before. Can I join?',
    answer:
      'Yes. The package includes a recorded Export-Import Course through the LMS to help you understand the fundamentals of international trade.',
  },
  {
    question: 'I already have a website and logo. Is the plan still useful for me?',
    answer:
      'Yes. The package also includes 50 Buyer Credits, the Export-Import Course and 1-year GlobPulse Free Plan access. The logo, letterhead and website are additional benefits.',
  },
  {
    question: 'What happens immediately after I pay ₹999?',
    answer:
      'Payment → Registration/Verification → Plan Activation → Access to Included Benefits. [CONFIRM EXACT ACTIVATION PROCESS AND TIMELINE]',
  },
  {
    question: 'How long do I get access to each benefit?',
    answer:
      'Website: 1 month. GlobPulse Free Plan: 1 year. Export-Import Course: as per LMS terms. Buyer Credits: as per package terms.',
  },
  {
    question: 'Are there any additional charges?',
    answer:
      '[COMMERCIAL CONFIRMATION REQUIRED] — Clearly state whether any renewal, upgrade or additional service charges apply.',
  },
  {
    question: 'Is the payment secure?',
    answer:
      'Payment will be processed through the integrated Razorpay payment gateway.',
  },
];

export const navLinks = [
  { label: 'What You Get', href: '#what-you-get' },
  { label: "Who It's For", href: '#who-its-for' },
  { label: 'Why GlobPulse', href: '#why-globpulse' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

export const planBenefits = [
  'Export-Import Course',
  '50 Buyer Credits',
  'Logo + Letterhead + Website',
  '1-Year GlobPulse Free Plan',
];

export const trustItems = [
  { label: '[Approved GlobPulse Figure]', placeholder: true },
  { label: '[Certification / Credential]', placeholder: true },
  { label: '[Platform Verification]', placeholder: true },
  { label: '[Business Information]', placeholder: true },
];
