"use client";

import Booking from "@/components/role/booking";
import { use } from "react";
import { submitBooking } from "./actions";
export default function BookingPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-center font-bold text-3xl py-20">予約フォーム</h1>
        {/* ここに予約用フォームを置く */}
        <Booking func={submitBooking} mentorId={id} />
      </div>
    </div>
  );
}
