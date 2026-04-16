"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiMailLine,
  RiLockLine,
  RiShieldKeyholeLine,
  RiNotification3Line,
  RiPaletteLine,
  RiGlobalLine,
  RiLinksLine,
  RiDownloadLine,
  RiDeleteBinLine,
  RiCheckLine,
  RiEyeLine,
  RiEyeOffLine,
  RiSmartphoneLine,
} from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from "@/components/ui/modal";

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "hi", label: "Hindi" },
];

export default function SettingsPage() {
  const [email, setEmail] = useState("john@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaModalOpen, setMfaModalOpen] = useState(false);

  const [emailAttempts, setEmailAttempts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const [publicProfile, setPublicProfile] = useState(true);
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account, security, and preferences.</p>
      </motion.div>

      <SectionCard title="Account" icon={RiMailLine} delay={0.1}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold">Email Address</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold">Account Type</label>
            <div className="flex h-10 items-center gap-2">
              <Badge variant="default" className="px-2.5 py-1">Free Plan</Badge>
              <Button variant="ghost" size="sm">Upgrade</Button>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Change Password" icon={RiLockLine} delay={0.15}>
        <div className="flex flex-col gap-4">
          <PasswordField
            label="Current Password"
            value={currentPassword}
            onChange={setCurrentPassword}
            show={showCurrent}
            onToggle={() => setShowCurrent(!showCurrent)}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <PasswordField
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              show={showNew}
              onToggle={() => setShowNew(!showNew)}
            />
            <PasswordField
              label="Confirm New Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showConfirm}
              onToggle={() => setShowConfirm(!showConfirm)}
            />
          </div>
          <Button variant="success" className="self-start">Update Password</Button>
        </div>
      </SectionCard>

      <SectionCard title="Two-Factor Authentication" icon={RiShieldKeyholeLine} delay={0.2}>
        <div className="flex flex-col gap-4">
          <ToggleRow
            label="Enable 2FA"
            description="Require an authenticator code in addition to your password"
            checked={mfaEnabled}
            onChange={(v) => { setMfaEnabled(v); if (v) setMfaModalOpen(true); }}
          />
          {mfaEnabled && (
            <div className="grid gap-3 border-t-2 border-border pt-4 md:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border-2 border-border p-4">
                <div>
                  <p className="text-sm font-semibold">Authenticator App</p>
                  <p className="text-xs text-muted-foreground">Google Authenticator, Authy, etc.</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border-2 border-border p-4">
                <div>
                  <p className="text-sm font-semibold">Recovery Codes</p>
                  <p className="text-xs text-muted-foreground">Backup codes for emergency access</p>
                </div>
                <Button variant="outline" size="sm">View Codes</Button>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Active Sessions" icon={RiSmartphoneLine} delay={0.25}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-lg border-2 border-border p-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold">
                MacBook Pro · Chrome
                <Badge variant="success">Current</Badge>
              </p>
              <p className="text-xs text-muted-foreground">San Francisco, CA · Last active now</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border-2 border-border p-4">
            <div>
              <p className="text-sm font-semibold">iPhone 15 · Safari</p>
              <p className="text-xs text-muted-foreground">San Francisco, CA · Last active 2 hours ago</p>
            </div>
            <Button variant="outline" size="sm">Revoke</Button>
          </div>
          <Button variant="destructive" size="sm" className="self-start">Sign out all other sessions</Button>
        </div>
      </SectionCard>

      <SectionCard title="Connected Accounts" icon={RiLinksLine} delay={0.3}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-lg border-2 border-border p-4">
            <div className="flex items-center gap-3">
              <FcGoogle className="size-8" />
              <div>
                <p className="text-sm font-semibold">Google</p>
                <p className="text-xs text-muted-foreground">Connected as john@gmail.com</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Disconnect</Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border-2 border-border p-4">
            <div className="flex items-center gap-3">
              <FaGithub className="size-8" />
              <div>
                <p className="text-sm font-semibold">GitHub</p>
                <p className="text-xs text-muted-foreground">Not connected</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Notifications" icon={RiNotification3Line} delay={0.35}>
        <div className="grid gap-4 md:grid-cols-2">
          <ToggleRow
            label="Quiz Attempts"
            description="When someone takes your quiz"
            checked={emailAttempts}
            onChange={setEmailAttempts}
          />
          <ToggleRow
            label="Push Notifications"
            description="Real-time alerts on your device"
            checked={pushNotifications}
            onChange={setPushNotifications}
          />
        </div>
      </SectionCard>

      <SectionCard title="Preferences" icon={RiPaletteLine} delay={0.4}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold">Theme</label>
            <Select options={themeOptions} value={theme} onValueChange={setTheme} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold">Language</label>
            <Select options={languageOptions} value={language} onValueChange={setLanguage} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Privacy" icon={RiGlobalLine} delay={0.45}>
        <div className="grid gap-4 md:grid-cols-2">
          <ToggleRow
            label="Public Profile"
            description="Allow others to view your profile"
            checked={publicProfile}
            onChange={setPublicProfile}
          />
          <ToggleRow
            label="Show on Leaderboards"
            description="Display your name on public leaderboards"
            checked={showOnLeaderboard}
            onChange={setShowOnLeaderboard}
          />
        </div>
      </SectionCard>

      <SectionCard title="Data & Export" icon={RiDownloadLine} delay={0.5}>
        <div className="flex flex-col gap-2 rounded-lg border-2 border-border p-4">
          <p className="text-sm font-semibold">Download Your Data</p>
          <p className="text-xs text-muted-foreground">Get a copy of all your quizzes, attempts, and profile data.</p>
          <Button variant="outline" size="sm" className="self-start gap-1.5">
            <RiDownloadLine className="size-4" />
            Export as JSON
          </Button>
        </div>
      </SectionCard>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55 }}
        className="rounded-xl border-2 border-destructive bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
      >
        <h2 className="mb-2 text-lg font-bold text-destructive">Danger Zone</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Permanently delete your account and all associated data. This cannot be undone.
        </p>
        <Button variant="destructive" className="gap-2" onClick={() => setDeleteOpen(true)}>
          <RiDeleteBinLine className="size-4" />
          Delete Account
        </Button>
      </motion.div>

      <Modal open={mfaModalOpen} onClose={() => setMfaModalOpen(false)}>
        <ModalHeader onClose={() => setMfaModalOpen(false)}>
          <ModalTitle>Set Up Two-Factor Authentication</ModalTitle>
          <ModalDescription>Scan the QR code with your authenticator app.</ModalDescription>
        </ModalHeader>
        <ModalContent>
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-48 items-center justify-center rounded-lg border-2 border-neo-black bg-secondary text-xs font-semibold text-muted-foreground">
              QR Code Placeholder
            </div>
            <div className="w-full">
              <p className="mb-1 text-xs font-semibold">Or enter this code manually:</p>
              <div className="flex items-center gap-2 rounded-md border-2 border-border bg-secondary p-2">
                <code className="flex-1 font-mono text-xs">JBSWY3DPEHPK3PXP</code>
                <Button variant="ghost" size="sm">Copy</Button>
              </div>
            </div>
            <Input placeholder="Enter 6-digit code" className="text-center" maxLength={6} />
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => { setMfaModalOpen(false); setMfaEnabled(false); }}>Cancel</Button>
          <Button variant="success" className="gap-1.5" onClick={() => setMfaModalOpen(false)}>
            <RiCheckLine className="size-4" />
            Verify & Enable
          </Button>
        </ModalFooter>
      </Modal>

      <Modal open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleteConfirmText(""); }}>
        <ModalHeader onClose={() => { setDeleteOpen(false); setDeleteConfirmText(""); }}>
          <ModalTitle>Delete Account</ModalTitle>
          <ModalDescription>This action is permanent and cannot be undone.</ModalDescription>
        </ModalHeader>
        <ModalContent>
          <div className="flex flex-col gap-4">
            <p className="text-sm">
              All your quizzes, attempts, leaderboard data, and profile will be permanently deleted.
            </p>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold">
                Type <span className="font-mono text-destructive">{email}</span> to confirm
              </label>
              <Input
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder={email}
              />
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => { setDeleteOpen(false); setDeleteConfirmText(""); }}>Cancel</Button>
          <Button
            variant="destructive"
            disabled={deleteConfirmText !== email}
            onClick={() => { setDeleteOpen(false); setDeleteConfirmText(""); }}
          >
            Delete Forever
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  children,
  delay,
}: {
  title: string;
  icon: typeof RiMailLine;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
    >
      <div className="mb-5 flex items-center gap-2">
        <Icon className="size-5 text-primary" />
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border-2 border-border p-4">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold">{label}</label>
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pr-10"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {show ? <RiEyeOffLine className="size-4" /> : <RiEyeLine className="size-4" />}
        </button>
      </div>
    </div>
  );
}
