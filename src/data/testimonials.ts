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
import t33 from "@/assets/testimonials/t33.jpeg.asset.json";
import t34 from "@/assets/testimonials/t34.jpeg.asset.json";
import t35 from "@/assets/testimonials/t35.jpeg.asset.json";
import t36 from "@/assets/testimonials/t36.jpeg.asset.json";
import t37 from "@/assets/testimonials/t37.jpeg.asset.json";
import t38 from "@/assets/testimonials/t38.jpeg.asset.json";
import t39 from "@/assets/testimonials/t39.jpeg.asset.json";
import t40 from "@/assets/testimonials/t40.jpeg.asset.json";
import t41 from "@/assets/testimonials/t41.jpeg.asset.json";
import t42 from "@/assets/testimonials/t42.jpeg.asset.json";
import t43 from "@/assets/testimonials/t43.jpeg.asset.json";
import t44 from "@/assets/testimonials/t44.jpeg.asset.json";
import t45 from "@/assets/testimonials/t45.jpeg.asset.json";
import t46 from "@/assets/testimonials/t46.jpeg.asset.json";
import t47 from "@/assets/testimonials/t47.jpeg.asset.json";
import t48 from "@/assets/testimonials/t48.jpeg.asset.json";
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
  { image: t5.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 5 من إنستجرام عن تجربتها مع ملاك عرنوس في التحرر من الأكل العاطفي" },
  { image: t6.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 6 من إنستجرام عن تجربتها مع ملاك عرنوس في خسارة الوزن من الجذور" },
  { image: t7.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 7 من إنستجرام عن تجربتها مع ملاك عرنوس في تهدئة الجهاز العصبي" },
  { image: t8.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 8 من إنستجرام عن تجربتها مع ملاك عرنوس في إيقاف نوبات الأكل الليلي" },
  { image: t9.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 9 من إنستجرام عن تجربتها مع ملاك عرنوس في السلام مع الجسد" },
  { image: t10.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 10 من إنستجرام عن تجربتها مع ملاك عرنوس في تحسين علاقتها بالطعام" },
  { image: t3.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 3 من إنستجرام عن تجربتها مع ملاك عرنوس في جلسات التابنج" },
  { image: t4.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 4 من إنستجرام عن تجربتها مع ملاك عرنوس في برنامج The Weight Shift" },
  { image: t11.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 11 من إنستجرام عن تجربتها مع ملاك عرنوس في بناء عادات مستقرة" },
  { image: t12.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 12 من إنستجرام عن تجربتها مع ملاك عرنوس في الثقة بالنفس والصورة الذاتية" },
  { image: t13.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 13 من إنستجرام عن تجربتها مع ملاك عرنوس في التحرر من الأكل العاطفي" },
  { image: t14.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 14 من إنستجرام عن تجربتها مع ملاك عرنوس في خسارة الوزن من الجذور" },
  { image: t15.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 15 من إنستجرام عن تجربتها مع ملاك عرنوس في تهدئة الجهاز العصبي" },
  { image: t16.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 16 من إنستجرام عن تجربتها مع ملاك عرنوس في إيقاف نوبات الأكل الليلي" },
  { image: t17.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 17 من إنستجرام عن تجربتها مع ملاك عرنوس في السلام مع الجسد" },
  { image: t18.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 18 من إنستجرام عن تجربتها مع ملاك عرنوس في تحسين علاقتها بالطعام" },
  { image: t19.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 19 من إنستجرام عن تجربتها مع ملاك عرنوس في جلسات التابنج" },
  { image: t20.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 20 من إنستجرام عن تجربتها مع ملاك عرنوس في برنامج The Weight Shift" },
  { image: t21.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 21 من إنستجرام عن تجربتها مع ملاك عرنوس في بناء عادات مستقرة" },
  { image: t22.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 22 من إنستجرام عن تجربتها مع ملاك عرنوس في الثقة بالنفس والصورة الذاتية" },
  { image: t23.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 23 من إنستجرام عن تجربتها مع ملاك عرنوس في التحرر من الأكل العاطفي" },
  { image: t24.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 24 من إنستجرام عن تجربتها مع ملاك عرنوس في خسارة الوزن من الجذور" },
  { image: t25.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 25 من إنستجرام عن تجربتها مع ملاك عرنوس في تهدئة الجهاز العصبي" },
  { image: t26.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 26 من إنستجرام عن تجربتها مع ملاك عرنوس في إيقاف نوبات الأكل الليلي" },
  { image: t27.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 27 من إنستجرام عن تجربتها مع ملاك عرنوس في السلام مع الجسد" },
  { image: t28.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 28 من إنستجرام عن تجربتها مع ملاك عرنوس في تحسين علاقتها بالطعام" },
  { image: t29.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 29 من إنستجرام عن تجربتها مع ملاك عرنوس في جلسات التابنج" },
  { image: t30.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 30 من إنستجرام عن تجربتها مع ملاك عرنوس في برنامج The Weight Shift" },
  { image: t31.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 31 من إنستجرام عن تجربتها مع ملاك عرنوس في بناء عادات مستقرة" },
  { image: t32.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 32 من إنستجرام عن تجربتها مع ملاك عرنوس في الثقة بالنفس والصورة الذاتية" },
  { image: t33.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 33 من إنستجرام عن تجربتها مع ملاك عرنوس في التحرر من الأكل العاطفي" },
  { image: t34.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 34 من إنستجرام عن تجربتها مع ملاك عرنوس في خسارة الوزن من الجذور" },
  { image: t35.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 35 من إنستجرام عن تجربتها مع ملاك عرنوس في تهدئة الجهاز العصبي" },
  { image: t36.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 36 من إنستجرام عن تجربتها مع ملاك عرنوس في إيقاف نوبات الأكل الليلي" },
  { image: t37.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 37 من إنستجرام عن تجربتها مع ملاك عرنوس في السلام مع الجسد" },
  { image: t38.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 38 من إنستجرام عن تجربتها مع ملاك عرنوس في تحسين علاقتها بالطعام" },
  { image: t39.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 39 من إنستجرام عن تجربتها مع ملاك عرنوس في جلسات التابنج" },
  { image: t40.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 40 من إنستجرام عن تجربتها مع ملاك عرنوس في برنامج The Weight Shift" },
  { image: t41.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 41 من إنستجرام عن تجربتها مع ملاك عرنوس في بناء عادات مستقرة" },
  { image: t42.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 42 من إنستجرام عن تجربتها مع ملاك عرنوس في الثقة بالنفس والصورة الذاتية" },
  { image: t43.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 43 من إنستجرام عن تجربتها مع ملاك عرنوس في التحرر من الأكل العاطفي" },
  { image: t44.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 44 من إنستجرام عن تجربتها مع ملاك عرنوس في خسارة الوزن من الجذور" },
  { image: t45.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 45 من إنستجرام عن تجربتها مع ملاك عرنوس في تهدئة الجهاز العصبي" },
  { image: t46.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 46 من إنستجرام عن تجربتها مع ملاك عرنوس في إيقاف نوبات الأكل الليلي" },
  { image: t47.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 47 من إنستجرام عن تجربتها مع ملاك عرنوس في السلام مع الجسد" },
  { image: t48.url, instagramUrl: brand.instagram, alt: "شهادة عميلة رقم 48 من إنستجرام عن تجربتها مع ملاك عرنوس في تحسين علاقتها بالطعام" },
];
