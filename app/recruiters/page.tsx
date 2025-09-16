"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function recruitersDashboard() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/recruiters/dashboard");
  }, [router]);

  return null;
}
