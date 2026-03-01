"use client";
import { useState } from "react";
import { submitMentor, submitUser } from "./actions";

import SetupMentor from "../../../components/dashboard/setup/setupMentor";
import SetupUser from "../../../components/dashboard/setup/setupUser";

export default function SetAccount() {
  const [role, setRole] = useState("user");
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-24 bg-linear-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">アカウント登録</h1>
          <p className="text-xl text-gray-600">
            相談はユーザーで登録してください。
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <button className={`py-4 font-medium border-b-2 transition-colors ${
        role === "user"
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-600 hover:text-gray-900"
      }`} onClick={() => setRole("user")}>User</button>
            <button className={`py-4 font-medium border-b-2 transition-colors ${
        role === "mentor"
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-600 hover:text-gray-900"
      }`} onClick={() => setRole("mentor")}>Mentor</button>
          </div>
          {role === "user" && <SetupUser func={submitUser} />}

          {role === "mentor" && <SetupMentor func={submitMentor} />}
        </div>
      </section>

      {/* Info Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">予約の流れ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">予約リクエスト</h3>
              <p className="text-sm text-gray-600">
                フォームから希望の日時とメンターを選択
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">メンター確認</h3>
              <p className="text-sm text-gray-600">
                メンターが日程を確認し、メールで返信
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">オンライン相談</h3>
              <p className="text-sm text-gray-600">
                ZoomやGoogle Meetで相談開始
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
