"use client"

import { useEffect, type ComponentProps, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { RiCloseLine } from "react-icons/ri"

import { cn } from "@/lib/utils"

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-neo-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg border-2 border-neo-black bg-background shadow-[8px_8px_0px_0px_#1B1B1B]">
        {children}
      </div>
    </div>,
    document.body
  )
}

function ModalHeader({ className, children, ...props }: ComponentProps<"div"> & { onClose?: () => void }) {
  const { onClose, ...rest } = props as { onClose?: () => void } & ComponentProps<"div">
  return (
    <div
      data-slot="modal-header"
      className={cn("flex items-center justify-between border-b-2 border-neo-black px-6 py-4", className)}
      {...rest}
    >
      <div>{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex size-8 items-center justify-center border-2 border-neo-black bg-background font-bold hover:bg-muted"
        >
          <RiCloseLine className="size-5" />
        </button>
      )}
    </div>
  )
}

function ModalTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      data-slot="modal-title"
      className={cn("text-lg font-bold tracking-tight", className)}
      {...props}
    />
  )
}

function ModalDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="modal-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function ModalContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-content"
      className={cn("px-6 py-4", className)}
      {...props}
    />
  )
}

function ModalFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-footer"
      className={cn("flex items-center justify-end gap-3 border-t-2 border-neo-black px-6 py-4", className)}
      {...props}
    />
  )
}

export { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter }
