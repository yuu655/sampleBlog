// app/robots.js

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [], // クロール拒否するパス
    },
    sitemap: "https://sampleblog-iota.vercel.app",
  };
}