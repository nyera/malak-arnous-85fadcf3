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
import t13 from "@/assets/testimonials/t13.jpeg.asset.json";
import t14 from "@/assets/testimonials/t14.jpeg.asset.json";
import t15 from "@/assets/testimonials/t15.jpeg.asset.json";
import t16 from "@/assets/testimonials/t16.jpeg.asset.json";
import t17 from "@/assets/testimonials/t17.jpeg.asset.json";
import t18 from "@/assets/testimonials/t18.jpeg.asset.json";
import t19 from "@/assets/testimonials/t19.jpeg.asset.json";
import t20 from "@/assets/testimonials/t20.jpeg.asset.json";
import t21 from "@/assets/testimonials/t21.jpeg.asset.json";
import t22 from "@/assets/testimonials/t22.jpeg.asset.json";
import t23 from "@/assets/testimonials/t23.jpeg.asset.json";
import t24 from "@/assets/testimonials/t24.jpeg.asset.json";
import t25 from "@/assets/testimonials/t25.jpeg.asset.json";
import t26 from "@/assets/testimonials/t26.jpeg.asset.json";
import t27 from "@/assets/testimonials/t27.jpeg.asset.json";
import t28 from "@/assets/testimonials/t28.jpeg.asset.json";
import t29 from "@/assets/testimonials/t29.jpeg.asset.json";
import t30 from "@/assets/testimonials/t30.jpeg.asset.json";
import t31 from "@/assets/testimonials/t31.jpeg.asset.json";
import t32 from "@/assets/testimonials/t32.jpeg.asset.json";
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
  { image: t13.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t14.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t15.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t16.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t17.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t18.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t19.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t20.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t21.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t22.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t23.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t24.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t25.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t26.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t27.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t28.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t29.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t30.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t31.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
  { image: t32.url, instagramUrl: brand.instagram, alt: "شهادة عميلة من إنستجرام" },
];
