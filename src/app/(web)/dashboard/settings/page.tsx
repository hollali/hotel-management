export const dynamic = "force-dynamic";

import { getCurrentUserProfile } from "@/actions/users";
import { UserProfile } from "@clerk/nextjs";

const SettingsPage = async () => {
  await getCurrentUserProfile();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
      <UserProfile />
    </div>
  );
};

export default SettingsPage;
