import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function Home() {
  revalidatePath("/dahsboard");
  redirect("/dashboard");
}
