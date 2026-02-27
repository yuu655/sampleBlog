"use client";
import { useActionState } from "react";

export default function AddMentorProfile({ profile, onUpload }) {
  const [state, action, isPending] = useActionState(onUpload, null);

  return (
    <>
      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      <form action={action}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            ユーザーネーム
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="山田 太郎"
            defaultValue={profile.name || ""}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="university"
            className="block text-sm font-medium mb-2"
          >
            大学
          </label>
          <input
            type="text"
            id="university"
            name="university"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="某大学"
            defaultValue={profile.university || ""}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="faculty" className="block text-sm font-medium mb-2">
            学部
          </label>
          <input
            type="text"
            id="faculty"
            name="faculty"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="工学部"
            defaultValue={profile.faculty || ""}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            詳細
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={profile.description || ""}
            rows={5}
            placeholder="例：地方の公立高校に通っていて、東大を目指しています。どのように情報収集すればいいか相談したいです。"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="region" className="block text-sm font-medium mb-2">
            出身地域
          </label>
          <select
            id="region"
            name="region"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            defaultValue={profile.region || ""}
          >
            <option value="">選択してください</option>
            <option>北海道・東北</option>
            <option>関東</option>
            <option>中部</option>
            <option>関西</option>
            <option>中国・四国</option>
            <option>九州・沖縄</option>
          </select>
        </div>

        <div className="mb-6">
          <button
            type="submit"
            disabled={isPending}
            className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {isPending ? "送信中..." : "登録する"}
          </button>
        </div>
      </form>
    </>
  );
}
