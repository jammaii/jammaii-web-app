"use client";

export function AuthBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <video
        autoPlay
        muted
        loop
        playsInline // Keeps video playing in its container on iOS
        className="h-full w-full object-cover"
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>
      <div className="backdrop-blur-xs absolute inset-0 bg-background/15" />
    </div>
  );
}
