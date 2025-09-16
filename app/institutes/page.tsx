"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InstitutesDashboard() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/institutes/dashboard");
  }, [router]);

  return null;
}
