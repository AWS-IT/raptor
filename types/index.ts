export interface Review {
  companyLogo?: string;
  text: string;
  authorName: string;
  authorPosition: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
  review: Review;
}

export interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}
