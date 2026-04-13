import Image from "next/image";
import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 items-center justify-center p-12 lg:flex">
        <Logo className="absolute top-8 left-8 z-10" />
        <Image
          src="/assets/auth_bg.png"
          alt="Qwizo"
          width={500}
          height={500}
          className="max-h-[90vh] w-full object-contain"
          priority
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="lg:hidden mb-8">
          <Logo />
        </div>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
