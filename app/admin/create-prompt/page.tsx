import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CreatePromptClient from "@/app/admin/create-prompt/createPromptClient";

export default async function CreatePromptPage() {
  const session = await getServerSession(authOptions);

  // 🔒 Must be logged in
  if (!session) {
    redirect("/");
  }

  // 🔒 Must accept terms before accessing
  if (!(session.user as any).termsAccepted) {
    redirect("/admin/profile");
  }

  return (
    <div className="container-app pt-20">
      <CreatePromptClient />
    </div>
  );
}
