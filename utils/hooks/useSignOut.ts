import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import supabase from "../supabase/client";

export default function useSignOut(router: AppRouterInstance) {
  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  signOut();
};