"use client"

import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function Icon({ size, url }) {
  const isValidUrl = typeof url === "string" && url.length > 0;

  let avatarUrl = "/default.jpg";
  if (isValidUrl) {
    const supabase = createClient();
    avatarUrl = supabase.storage.from("avatars").getPublicUrl(url).data.publicUrl;
  }

  return (
    <div style={{ height: size, width: size }} className="relative mx-auto mb-3">
      <Image
        loading="eager"
        width={size}
        height={size}
        src={avatarUrl}
        onError={(e) => { e.currentTarget.src = "/default.jpg"; }}
        alt="Avatar"
        className="rounded-full mx-auto mb-3 object-cover"
        style={{ height: size, width: size }}
      />
    </div>
  );
}
