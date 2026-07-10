"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { deleteAccount } from "@/actions/users";
import toast from "react-hot-toast";
import * as Sentry from "@sentry/nextjs";

const SettingsActions = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleSignOut = () => {
    signOut({ redirectUrl: "/" });
  };

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE") return;
    setDeleting(true);
    try {
      await deleteAccount();
      toast.success("Account deleted");
      signOut({ redirectUrl: "/" });
    } catch (error) {
      Sentry.captureException(error);
      toast.error(error instanceof Error ? error.message : "Failed to delete account");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border border-stellar-light-grey p-6">
        <h3 className="font-heading text-lg font-medium text-stellar-blue mb-2">Sign Out</h3>
        <p className="text-stellar-grey text-sm mb-4">Sign out of your account on this device.</p>
        <button
          onClick={handleSignOut}
          className="px-6 py-2 text-sm font-medium uppercase tracking-[0.07em] border border-stellar-light-grey text-stellar-grey hover:text-stellar-blue hover:border-stellar-blue transition-colors rounded-full"
        >
          Sign Out
        </button>
      </div>

      <div className="border border-red-200 p-6">
        <h3 className="font-heading text-lg font-medium text-red-600 mb-2">Delete Account</h3>
        <p className="text-stellar-grey text-sm mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>

        {!showDelete ? (
          <button
            onClick={() => setShowDelete(true)}
            className="px-6 py-2 text-sm font-medium uppercase tracking-[0.07em] bg-red-600 text-white hover:bg-red-700 transition-colors rounded-full"
          >
            Delete Account
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-stellar-grey">
              Type <strong>DELETE</strong> to confirm.
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE"
              className="w-full max-w-xs border border-red-300 px-3 py-2 text-sm text-stellar-blue focus:outline-none focus:border-red-500 rounded-full"
            />
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={confirmText !== "DELETE" || deleting}
                className="px-6 py-2 text-sm font-medium uppercase tracking-[0.07em] bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 rounded-full"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
              <button
                onClick={() => { setShowDelete(false); setConfirmText(""); }}
                className="px-4 py-2 text-sm text-stellar-grey hover:text-stellar-blue transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsActions;
