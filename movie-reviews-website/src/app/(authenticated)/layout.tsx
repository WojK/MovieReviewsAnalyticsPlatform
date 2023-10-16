import { initialProfile } from "@/utils/initial-profile";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await initialProfile();
  return <>{children}</>;
}
