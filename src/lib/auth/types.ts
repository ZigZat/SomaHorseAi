export type UserRole = "client" | "talent";
export type OnboardingStatus = "pending" | "complete";

export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
  onboarding_status: OnboardingStatus;
}
