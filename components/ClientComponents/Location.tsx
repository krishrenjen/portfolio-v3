"use client";
import useScreenSize from "@/common/hooks/useScreenSize";

export default function LocationDisplay() {
  const { isMobile } = useScreenSize();

  return (
    <p className="text-xl font-light">
      {isMobile ? "NJ/NY" : "New Jersey/New York"}
    </p>
  );
}
