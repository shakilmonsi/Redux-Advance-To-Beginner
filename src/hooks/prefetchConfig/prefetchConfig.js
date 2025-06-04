// src/config/prefetch-config.ts

export const prefetchConfig = [
  {
    key: ["homeData"],
    url: "/home",
    when: ["onHome", "onAbout"],
    requiresAuth: false,
  },
  {
    key: ["contactData"],
    url: "/contact",
    when: ["onHome", "onAbout"],
    requiresAuth: false,
  },
  {
    key: ["aboutData"],
    url: "/about",
    when: ["onHome"],
    requiresAuth: false,
  },
];
