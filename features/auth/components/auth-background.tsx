'use client';

export function AuthBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/15 backdrop-blur-xs" />
    </div>
  );
}
