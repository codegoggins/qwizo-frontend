"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  RiDashboardLine,
  RiFileListLine,
  RiAddCircleLine,
  RiUploadCloud2Line,
  RiBarChartLine,
  RiTrophyLine,
  RiSettingsLine,
  RiUserLine,
  RiCloseLine,
  RiVipCrownLine,
  RiSwordLine,
} from "react-icons/ri"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

const sections = [
  {
    label: "Main",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: RiDashboardLine },
      { name: "My Quizzes", href: "/dashboard/quizzes", icon: RiFileListLine },
      { name: "Arena", href: "/arena", icon: RiSwordLine },
    ],
  },
  {
    label: "Create",
    items: [
      { name: "New Quiz", href: "/dashboard/quizzes/create", icon: RiAddCircleLine },
      { name: "Upload Document", href: "/dashboard/upload", icon: RiUploadCloud2Line },
    ],
  },
  {
    label: "Analytics",
    items: [
      { name: "Overview", href: "/dashboard/analytics", icon: RiBarChartLine },
      { name: "Leaderboard", href: "/dashboard/leaderboard", icon: RiTrophyLine },
    ],
  },
  {
    label: "Pricing",
    items: [
      { name: "Plans", href: "/dashboard/pricing", icon: RiVipCrownLine },
    ],
  },
  {
    label: "Settings",
    items: [
      { name: "Profile", href: "/dashboard/profile", icon: RiUserLine },
      { name: "Settings", href: "/dashboard/settings", icon: RiSettingsLine },
    ],
  },
]

function Sidebar({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-neo-black/50 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r-2 border-neo-black bg-background transition-transform duration-300 ease-out lg:sticky lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center border-2 border-neo-black hover:bg-muted lg:hidden"
          >
            <RiCloseLine className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: sectionIndex * 0.06 }}
              className="mb-6"
            >
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {section.label}
              </p>
              <div className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute inset-0 rounded-md bg-primary"
                          transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-3">
                        <item.icon className="size-4" />
                        {item.name}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </nav>
      </aside>
    </>
  )
}

export { Sidebar }
