"use client";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient(); // コンポーネントの外

export default function Icon({ size, url }) {
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
        onError={(e) => { e.currentTarget.src = "/default.jpg"; }}
        alt="Avatar"
        className="rounded-full mx-auto mb-3"
        style={{ height: size, width: size }}
      />
    </div>
  );
}