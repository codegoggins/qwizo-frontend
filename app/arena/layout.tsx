import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function ArenaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-4 z-30 mx-4 flex items-center justify-between rounded-xl border-2 border-neo-black bg-background px-5 py-3 shadow-[4px_4px_0px_0px_#1B1B1B]">
        <Link href="/arena">
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline" size="sm">Log In</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 px-6 pt-10 pb-8">{children}</main>
    </div>
  );
}
