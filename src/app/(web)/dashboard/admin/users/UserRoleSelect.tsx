"use client";

import { useState } from "react";
import { updateUserRole } from "@/actions/admin";
import toast from "react-hot-toast";

const roles = [
  { value: "guest", label: "Guest" },
  { value: "receptionist", label: "Receptionist" },
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Admin" },
] as const;

type Props = {
  userId: string;
  currentRole: string;
};

const UserRoleSelect = ({ userId, currentRole }: Props) => {
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setRole(newRole);
    setLoading(true);
    try {
      await updateUserRole(userId, newRole);
      toast.success("Role updated");
    } catch {
      setRole(currentRole);
      toast.error("Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={role}
      onChange={handleChange}
      disabled={loading}
      className="border border-stellar-light-grey px-2 py-1 text-xs bg-white text-stellar-blue focus:outline-none focus:border-brand disabled:opacity-50"
    >
      {roles.map((r) => (
        <option key={r.value} value={r.value}>
          {r.label}
        </option>
      ))}
    </select>
  );
};

export default UserRoleSelect;
