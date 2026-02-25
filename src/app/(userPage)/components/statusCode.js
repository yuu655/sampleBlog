"use client";
import { Calendar, User, CheckCircle } from "lucide-react";
import StatusUnit from "./statusUnit";

export default function StatusCode({ meetings, isMentor }) {
  // console.log(meetings)
  return (
    <>
      <StatusUnit
        name="予定中の相談"
        icon={<Calendar size={20} className="text-blue-600" />}
        length={meetings.next.length}
        unit="件"
      />
      <StatusUnit
        name="相談履歴"
        icon={<CheckCircle size={20} className="text-green-600" />}
        length={meetings.past.length}
        unit="件"
      />
      <StatusUnit
        name="お気に入りメンター"
        icon={<User size={20} className="text-purple-600" />}
        length={2}
        unit="人"
      />
    </>
  );
}
