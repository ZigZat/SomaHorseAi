export type UserRole = "client" | "talent";
export type OnboardingStatus = "pending" | "complete";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: UserRole;
  onboarding_status: OnboardingStatus;
}

export interface ClientOnboarding {
  id: string;
  current_step: number;
  company_name: string | null;
  sector: string | null;
  project_type: string | null;
  problem: string | null;
  timeline: string | null;
  budget_range: string | null;
  submitted: boolean;
}

export type TalentStage =
  | "profile"
  | "pending_review"
  | "assessment"
  | "assessment_review"
  | "interview"
  | "interview_review"
  | "approved"
  | "rejected";

export interface TalentAssessment {
  problem_solving?: string;
  technical_build?: string;
  agri_context?: string;
}

export interface TalentOnboarding {
  id: string;
  current_step: number;
  stage: TalentStage;
  headline: string | null;
  primary_role: string | null;
  years_experience: number | null;
  skills: string[];
  bio: string | null;
  portfolio_url: string | null;
  github_url: string | null;
  country: string | null;
  agri_experience: string | null;
  assessment: TalentAssessment | null;
  admin_notes: string | null;
}
