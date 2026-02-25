"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

import Image from "next/image";

export default function Icon({ size, url }) {
  const [avatarUrl, setAvatarUrl] = useState("/default.jpg");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();
  useEffect(() => {
    async function getImagePath(path) {
      try {
        setLoading(true);
        const { data, error } = await supabase.storage
          .from("avatars")
          .createSignedUrl(path, 60);
        if (data?.signedUrl) {
          setAvatarUrl(data.signedUrl);
        }
      } catch (error) {
        console.log("Error downloading image: ", error);
        setAvatarUrl("/default.jpg");
      } finally{
        setLoading(false);
      }
    }
    if (url) {
      getImagePath(url);
    } else {
      setAvatarUrl("/default.jpg"); // url が無い場合は即座にデフォルト
    }
  }, [url]);

  if (loading) return <div>読み込み中...</div>;
  return (
    <div style={{ height: size, width: size }} className="relative mx-auto mb-3">
      {avatarUrl && (
        <Image
          loading="eager"
          width={size}
          height={size}
          src={avatarUrl}
          onError={() => setAvatarUrl("/default.jpg")}
          alt="Avatar"
          className="avatar image rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold"
          style={{ height: size, width: size }}
        />
      )}
    </div>
  );
}
