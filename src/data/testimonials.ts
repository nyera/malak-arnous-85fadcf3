import t3 from "@/assets/testimonials/t3.jpeg.asset.json";
import t4 from "@/assets/testimonials/t4.jpeg.asset.json";
import t5 from "@/assets/testimonials/t5.jpeg.asset.json";
import t6 from "@/assets/testimonials/t6.jpeg.asset.json";
import t7 from "@/assets/testimonials/t7.jpeg.asset.json";
import t8 from "@/assets/testimonials/t8.jpeg.asset.json";
import t9 from "@/assets/testimonials/t9.jpeg.asset.json";
import t10 from "@/assets/testimonials/t10.jpeg.asset.json";
import t11 from "@/assets/testimonials/t11.jpeg.asset.json";
import t12 from "@/assets/testimonials/t12.jpeg.asset.json";
import { brand } from "@/data/content";

export type Testimonial = {
  image: string;
  /** Link to the original Instagram post. Defaults to the profile link. */
  instagramUrl: string;
  alt: string;
};

// To add a new testimonial:
// 1. Upload the image via lovable-assets and import the .asset.json file.
// 2. Add a new object below. Replace `instagramUrl` with the Instagram post URL.
export const testimonials: Testimonial[] = [
  { image: t5.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t6.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t7.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t8.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t9.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t10.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t3.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t4.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t11.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t12.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
];
