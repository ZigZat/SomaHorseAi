"use server";

import { revalidatePath } from "next/cache";

import { isAdminUser } from "@/lib/auth/admin";
import type { TalentStage } from "@/lib/auth/types";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TRANSITIONS: Record<string, TalentStage[]> = {
  pending_review: ["assessment", "rejected"],
  assessment_review: ["interview", "rejected"],
  interview_review: ["approved", "rejected"],
};

export async function setTalentStage(
  talentId: string,
  fromStage: TalentStage,
  nextStage: TalentStage,
  notes?: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!(await isAdminUser(supabase, user))) {
    throw new Error("Not authorized");
  }

  const allowed = ALLOWED_TRANSITIONS[fromStage];
  if (!allowed || !allowed.includes(nextStage)) {
    throw new Error(`Cannot move ${fromStage} -> ${nextStage}`);
  }

  const { error } = await supabase
    .from("talent_onboarding")
    .update({
      stage: nextStage,
      admin_notes: notes ?? null,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", talentId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}
