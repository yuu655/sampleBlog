"use client";
import { createClient } from "@/lib/supabase/client";
import Icon from "./icon";
import AddIcon from "./addIcon";
import { updateUserProfile } from "./actions";
import { useState } from "react";

export default function Profile({ profile, isMentor }) {
//   const [avatarUrl, setAvatarUrl] = useState();
  

  return (
    <>
        <Icon size={100} url={profile.icon}/>
        <AddIcon format={"private/user"} uid={profile.id} onUpload={(inputFiles) => {
            updateUserProfile(inputFiles)
        }}/>
    </>
  );
}
