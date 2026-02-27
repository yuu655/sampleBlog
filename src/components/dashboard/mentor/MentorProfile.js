"use client";

import AddIcon from "../profile/addIcon";
import { updateMentorIcon, updateMentorProfile } from "../profile/actions";
import AddMentorProfile from "./addMentorProfile";

export default function MentorProfile({ profile }) {
  return (
    <section className="py-16">
      <h3 className="text-2xl font-bold text-center mb-15">プロフィール編集</h3>
      <div className="max-w-3xl mx-auto px-4 my-8 sm:px-6 lg:px-8">
        <label className="block text-sm font-medium mb-2">
          プロフィール情報
        </label>
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <AddMentorProfile onUpload={updateMentorProfile} profile={profile} />
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AddIcon
          format="public/mentor"
          uid={profile.id}
          onUpload={(inputFiles) => updateMentorIcon(inputFiles)}
          profile={profile}
        />
      </div>
    </section>
  );
}
