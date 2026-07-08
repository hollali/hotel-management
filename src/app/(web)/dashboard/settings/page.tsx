export const dynamic = "force-dynamic";

import { UserProfile } from "@clerk/nextjs";
import SettingsActions from "./SettingsActions";

const SettingsPage = async () => {
  return (
    <div>
      <h2 className="font-heading text-xl font-medium mb-6 text-stellar-blue">Account Settings</h2>

      <div className="mb-8">
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none border border-stellar-light-grey rounded-none",
              headerTitle: "font-heading text-stellar-blue",
              headerSubtitle: "text-stellar-grey",
              formButtonPrimary: "bg-stellar-blue hover:bg-brand text-sm uppercase tracking-[0.07em] rounded-none",
              formFieldLabel: "text-xs uppercase tracking-[0.08em] text-stellar-grey",
              formFieldInput: "border-stellar-light-grey rounded-none focus:border-brand",
              navbarButton: "text-stellar-grey hover:text-stellar-blue hover:bg-beige",
              menuButton: "text-stellar-grey hover:text-stellar-blue",
            },
          }}
        />
      </div>

      <SettingsActions />
    </div>
  );
};

export default SettingsPage;
