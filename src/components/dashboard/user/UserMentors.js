"use client";

import { useState } from "react";
import { Search, MapPin, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Icon from "../profile/icon";

const REGIONS = ["すべて", "北海道・東北", "関東", "中部", "関西", "中国・四国", "九州・沖縄"];

export default function UserMentors({ mentors }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("すべて");

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "すべて" || mentor.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="bg-white">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="名前、大学、専門分野で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          {REGIONS.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <p className="text-gray-600 mb-4">{filteredMentors.length}名のメンターが見つかりました</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div key={mentor.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-shadow text-center">
            {/* <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" /> */}
            <Icon size={100} url={mentor?.icon} />
            <h3 className="text-xl font-bold mb-2">{mentor.name}</h3>
            <div className="flex items-center justify-center gap-2 mb-2">
              <GraduationCap size={16} className="text-gray-600" />
              <p className="text-gray-700">{mentor.university} {mentor.faculty}</p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin size={16} className="text-gray-600" />
              <p className="text-sm text-gray-600">出身：{mentor.region}</p>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{mentor.bio}</p>
            <Button variant="default" className="bg-blue-500" asChild>
              <Link href={`/dashboard/booking/${mentor.id}`}>相談する</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
