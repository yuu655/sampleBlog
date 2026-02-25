"use client";
import { Calendar, Clock } from "lucide-react";

export default function AppointmentUnitPast({ appointment }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0"></div>
          <div>
            <h3 className="font-bold text-lg">{appointment.mentorName}</h3>
            <p className="text-sm text-gray-600">
              {appointment.mentorUniversity}
            </p>
          </div>
        </div>
        {/* <div className="flex gap-1">
          {[...Array(appointment.rating)].map((_, i) => (
            <span key={i} className="text-yellow-400">
              ★
            </span>
          ))}
        </div> */}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar size={18} className="text-gray-400" />
          <span className="text-sm">{appointment.date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={18} className="text-gray-400" />
          <span className="text-sm">{appointment.time}</span>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded mb-4">
        <p className="text-sm text-gray-600 mb-1">相談内容</p>
        <p className="font-medium">{appointment.topic}</p>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          レビューを書く
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          もう一度予約
        </button>
      </div>
    </div>
  );
}
