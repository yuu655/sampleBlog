"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

import Image from "next/image";

export default function AddIcon({ format, uid, onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [inputFilesPath, setInputFilesPath] = useState(null);
  const [prevFilesPath, setPrevFilesPath] = useState(null);
  const [inputFiles, setInputFiles] = useState(null);

  const supabase = createClient();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExt = file.name.split(".").pop();
      const filePath = `${format}/${uid}/${Math.random()}.${fileExt}`;
      setInputFilesPath(filePath);
      setInputFiles(file);
    }
  };

  const deleteAvatar = async (path) => {
    const { error } = await supabase.storage.from("avatars").remove([path]); // 配列で渡す必要がある点に注意！

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
    } catch (error) {
      console.log(error);
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
      deleteAvatar(prevFilesPath);
      setPrevFilesPath(inputFilesPath);
    }
  };
  return (
    <form>
      {/* <label htmlFor="name">ユーザーネームを変更</label>
      <input
        id="name"
        name="name"
        type="text"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="山田 太郎"
      /> */}
      <label htmlFor="icon">アイコンを変更する</label>
      <input
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
        type="file"
        id="icon"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      <button formAction={uploadAvatar}>この画像で確定</button>
    </form>
  );
}
