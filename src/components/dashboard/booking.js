"use client";
import { useActionState } from "react";
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
  "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
  "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30",
];

export default function Booking({ func }) {
  const [state, action, isPending] = useActionState(func, null);
  const [selectedTime, setSelectedTime] = useState("");

  // 今日以降の日付のみ選択可能にする
  const today = new Date().toISOString().split("T")[0];

  return (
    <form action={action} className="space-y-8">

      {/* エラー表示 */}
      {state?.error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{state.error}</p>
        </div>
      )}

      <div className="p-6 space-y-6">

        {/* 相談内容 */}
        <div>
          <label htmlFor="title" className="flex items-center gap-2 text-lg font-bold mb-2">
            相談内容 <span className="text-red-500">*</span>
          </label>
          <select
            id="title"
            name="title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          >
            <option value="">選択してください</option>
            {consultationTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* 詳細 */}
        <div>
          <label htmlFor="description" className="block text-lg font-bold mb-2">
            詳細
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="例：地方の公立高校に通っていて、東大を目指しています。どのように情報収集すればいいか相談したいです。"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>

      </div>

      {/* 送信ボタン */}
      <div className="px-6">
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPending ? "送信中..." : "登録する"}
        </button>
      </div>

    </form>
  );
}