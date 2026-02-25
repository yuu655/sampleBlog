"use client";
import { useEffect, useState } from "react";
import { Calendar, Plus } from "lucide-react";
import Link from "next/link";
import AppointmentUnit from "./appointmentUnit";
import AppointmentUnitPast from "./appointmentUnitPast";
import Mentors from "../mentors";
import { createClient } from "@/lib/supabase/client";

// Mock data
const upcomingAppointments = [
  {
    id: 1,
    mentorName: "田中 太郎",
    mentorUniversity: "東京大学 工学部",
    date: "2026年2月20日",
    time: "19:00 - 19:40",
    topic: "志望校選びについて",
    status: "confirmed",
    meetingLink: "https://zoom.us/j/example1",
  },
  {
    id: 2,
    mentorName: "佐藤 花子",
    mentorUniversity: "早稲田大学 政治経済学部",
    date: "2026年2月25日",
    time: "20:00 - 20:40",
    topic: "小論文の書き方",
    status: "pending",
    meetingLink: null,
  },
];

const pastAppointments = [
  {
    id: 3,
    mentorName: "鈴木 一郎",
    mentorUniversity: "京都大学 医学部",
    date: "2026年2月10日",
    time: "18:00 - 18:40",
    topic: "医学部受験について",
    rating: 5,
  },
  {
    id: 4,
    mentorName: "田中 太郎",
    mentorUniversity: "東京大学 工学部",
    date: "2026年2月5日",
    time: "19:00 - 19:40",
    topic: "数学の勉強法",
    rating: 5,
  },
];

export default function AppointmentContent({ isActive, mentors, isMentor, meetings }) {
  return (
    <div className="p-6">
      {isActive === "upcoming" && (
        <div className="space-y-4">
          {meetings.next.length > 0 ? (
            meetings.next.map((appointment) => (
              <AppointmentUnit key={appointment.id} appointment={appointment} mentors={mentors} isMentor={isMentor} />
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">予定中の相談はありません</p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                新しい相談を予約
              </Link>
            </div>
          )}
        </div>
      )}

      {isActive === "past" && (
        <div className="space-y-4">
          {meetings.past.map((appointment) => (
            <AppointmentUnitPast key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}

      {(!isMentor && isActive === "mentor") && (
        <div className="space-y-4">
          <Mentors mentors={mentors}/>
        </div>
      )}
    </div>
  );
}
