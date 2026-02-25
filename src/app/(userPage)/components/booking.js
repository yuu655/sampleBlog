"use client";
import { useState } from "react";

const consultationTypes = [
  "受験勉強全般",
  "志望校選び",
  "学部選択",
  "勉強方法",
  "モチベーション",
  "地方からの受験",
  "その他",
];

const timeSlots = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

export default function Booking({ func, mentorId }) {
  const [details, setDetails] = useState();
  return (
    <form className="space-y-8">
      {/* Contact Information */}
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="flex items-center gap-2 text-lg font-bold mb-4"
            >
              相談内容 *
            </label>
            <select
              id="title"
              name="title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-4"
              required
            >
              <option value="">選択してください</option>
              {consultationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <input type="hidden" id="mentorId" name="mentorId" value={mentorId} />
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              詳細
            </label>
            <textarea
              id="description"
              name="description"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={5}
              placeholder="例：地方の公立高校に通っていて、東大を目指しています。どのように情報収集すればいいか相談したいです。"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>
        </div>
      </div>

      {/* Terms */}
      {/* <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <label className="flex items-start gap-3">
          <input type="checkbox" required className="mt-1" />
          <span className="text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              利用規約
            </a>
            および
            <a href="#" className="text-blue-600 hover:underline">
              プライバシーポリシー
            </a>
            に同意します
          </span>
        </label>
      </div> */}

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors"
          formAction={func}
        >
          登録する
        </button>
        {/* <p className="text-sm text-gray-600 text-center mt-4">
          送信後、メンターが確認し、24時間以内にメールでご連絡します。
        </p> */}
      </div>
    </form>
  );
}
