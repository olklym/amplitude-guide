import { AppShell } from "@/components/app-shell";
import { ProfileForm } from "@/components/profile-form";

export default function ProfilePage() {
  return (
    <AppShell activeNav="profile" title="Profile">
      <ProfileForm />
    </AppShell>
  );
}
