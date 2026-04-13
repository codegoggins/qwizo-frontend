import { GiBowlSpiral } from "react-icons/gi";
import { cn } from "@/lib/utils";

function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <GiBowlSpiral className="size-8 text-primary" />
      <span className="text-2xl font-extrabold tracking-tight">qwizo</span>
    </div>
  );
}

export { Logo };
