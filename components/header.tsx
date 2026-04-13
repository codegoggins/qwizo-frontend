"use client"

import { RiMenuLine, RiNotification3Line, RiUserLine } from "react-icons/ri"

function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-4 z-30 mx-4 flex items-center justify-between rounded-xl border-2 border-neo-black bg-background px-5 py-3 shadow-[4px_4px_0px_0px_#1B1B1B]">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex size-9 items-center justify-center border-2 border-neo-black hover:bg-muted lg:hidden"
      >
        <RiMenuLine className="size-5" />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold">John Doe</span>
        <button
          type="button"
          className="relative flex size-9 items-center justify-center border-2 border-neo-black bg-background hover:bg-muted"
        >
          <RiNotification3Line className="size-4" />
          <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-primary" />
        </button>
        <div className="flex size-9 items-center justify-center border-2 border-neo-black bg-primary shadow-[2px_2px_0px_0px_#1B1B1B]">
          <RiUserLine className="size-4 text-primary-foreground" />
        </div>
      </div>
    </header>
  )
}

export { Header }
