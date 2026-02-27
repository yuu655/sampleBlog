"use client"

import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

// StorageのURL計算はサーバーでできるのでServerComponentに
export default function Icon({ size, url }) {
  const supabase = createClient();
  const avatarUrl = url
    ? supabase.storage.from("avatars").getPublicUrl(url).data.publicUrl
    : "/default.jpg";

  return (
    <div style={{ height: size, width: size }} className="relative mx-auto mb-3">
      <Image
        loading="eager"
        width={size}
        height={size}
        src={avatarUrl}
        alt="Avatar"
        className="rounded-full object-cover border-2 border-gray-200 mx-auto mb-3"
        style={{ height: size, width: size }}
      />
    </div>
  );
}
