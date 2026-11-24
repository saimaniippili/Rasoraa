export type DietaryType = 'vegetarian' | 'vegan' | 'non-vegetarian' | 'gluten-free' | 'chef-signature';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'starters' | 'mains' | 'desserts' | 'beverages' | 'tasting';
  price: string;
  image: string;
  dietary: DietaryType[];
  calories?: string;
  allergens?: string[];
  pairing?: string;
  isFeatured?: boolean;
}

export interface Branch {
  id: string;
  name: string;
  subtitle: string;
  address: string;
  neighborhood: string;
  city: string;
  phone: string;
  email: string;
  hours: {
    lunch: string;
    dinner: string;
    weekend?: string;
  };
  image: string;
  features: string[];
  mapEmbedUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  rating: number;
  date: string;
  branch: string;
}

export interface ExperienceCardData {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  linkText: string;
  linkTo: string;
}

export interface ReservationState {
  branchId: string;
  date: string; // YYYY-MM-DD
  session: 'lunch' | 'dinner';
  guests: number;
  timeSlot: string;
  customer: {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests?: string;
    seatingPreference?: string;
    occasion?: string;
    rememberDetails: boolean;
    receiveUpdates: boolean;
  };
}

export interface EventEnquiryData {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  guestCount: number;
  branchId: string;
  budget?: string;
  additionalRequirements?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  branchId: string;
  message: string;
}
