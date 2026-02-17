// app/robots.js

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"], // クロール拒否するパス
    },
    sitemap: "https://sampleblog-iota.vercel.app",
  };
}