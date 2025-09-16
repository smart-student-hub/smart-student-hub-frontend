"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudentsDashboard() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/students/dashboard");
  }, [router]);

  return null;
}
