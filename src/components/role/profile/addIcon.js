"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import AvatarUpload from "./AvatarUpload";

import Image from "next/image";

const supabase = createClient();
export default function AddIcon({ format, uid, onUpload, profile }) {
  const [uploading, setUploading] = useState(false);
  const [inputFilesPath, setInputFilesPath] = useState(null);
  const [prevFilesPath, setPrevFilesPath] = useState(null);
  const [inputFiles, setInputFiles] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    profile.icon
      ? supabase.storage.from("avatars").getPublicUrl(profile.icon).data
          .publicUrl
      : null,
  );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExt = file.name.split(".").pop();
      const filePath = `${format}/${uid}/${Math.random()}.${fileExt}`;
      setInputFilesPath(filePath);
      setInputFiles(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const deleteAvatar = async (path) => {
    console.log("削除対象のパス:", path); // ← 追加
    const { data, error } = await supabase.storage.from("avatars").remove([path]); // 配列で渡す必要がある点に注意！
    console.log("削除結果:", data, error); // ← 追加
    if (error) console.error("削除失敗:", error.message);
  };

  const uploadAvatar = async () => {
    try {
      // console.log(inputFilesPath)
      setUploading(true);
      if (inputFiles === null) {
        throw new Error("You must select an image to upload.");
      }
      const { error: uploadError } = await supabase.storage
        .from(`avatars`)
        .upload(inputFilesPath, inputFiles, {
          upsert: true,
        });
      if (uploadError) {
        throw uploadError;
      }
      onUpload(inputFilesPath);
      if (prevFilesPath) deleteAvatar(prevFilesPath);
    } catch (error) {
      console.log(error);
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
      setPrevFilesPath(inputFilesPath);
    }
  };
  return (
    <AvatarUpload
      handleFileChange={handleFileChange}
      uploadAvatar={uploadAvatar}
      uploading={uploading}
      previewUrl={previewUrl}
      profile={profile}
    />
  );
}
