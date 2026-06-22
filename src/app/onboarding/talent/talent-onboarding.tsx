"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Clock,
  ClipboardCheck,
  Video,
  Trophy,
  XCircle,
  CheckCircle2,
  Plus,
  Check,
} from "lucide-react";

import type { TalentOnboarding, TalentStage } from "@/lib/auth/types";
import {
  TALENT_EXPERIENCE,
  TALENT_ROLES,
  TALENT_SKILLS,
} from "@/lib/onboarding/options";
import {
  OnboardingCard,
  OnboardingShell,
  OptionGrid,
  StepHeading,
  StepNav,
  StepProgress,
} from "@/components/onboarding/onboarding-ui";

import {
  confirmTalentInterview,
  saveTalentProgress,
  submitTalentAssessment,
  submitTalentProfile,
} from "./actions";

const PROFILE_STEPS = ["Role", "Experience", "Skills", "About", "Links"];

interface ProfileForm {
  primary_role: string | null;
  years_experience: number | null;
  skills: string[];
  headline: string;
  bio: string;
  agri_experience: string;
  country: string;
  portfolio_url: string;
  github_url: string;
}

export function TalentOnboarding({
  initial,
  firstName,
}: {
  initial: TalentOnboarding;
  firstName: string | null;
}) {
  if (initial.stage === "profile") {
    return <TalentProfileFlow initial={initial} firstName={firstName} />;
  }
  return <TalentPipeline initial={initial} firstName={firstName} />;
}

function TalentProfileFlow({
  initial,
  firstName,
}: {
  initial: TalentOnboarding;
  firstName: string | null;
}) {
  const [step, setStep] = useState(
    Math.min(initial.current_step ?? 0, PROFILE_STEPS.length - 1)
  );
  const [form, setForm] = useState<ProfileForm>({
    primary_role: initial.primary_role,
    years_experience: initial.years_experience,
    skills: initial.skills ?? [],
    headline: initial.headline ?? "",
    bio: initial.bio ?? "",
    agri_experience: initial.agri_experience ?? "",
    country: initial.country ?? "",
    portfolio_url: initial.portfolio_url ?? "",
    github_url: initial.github_url ?? "",
  });
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const payload = (nextStep: number) => ({
    current_step: nextStep,
    primary_role: form.primary_role,
    years_experience: form.years_experience,
    skills: form.skills,
    headline: form.headline || null,
    bio: form.bio || null,
    agri_experience: form.agri_experience || null,
    country: form.country || null,
    portfolio_url: form.portfolio_url || null,
    github_url: form.github_url || null,
  });

  const goTo = (nextStep: number, persist: boolean) => {
    setError("");
    setStep(nextStep);
    if (persist) {
      startTransition(async () => {
        try {
          await saveTalentProgress(payload(nextStep));
        } catch (e) {
          setError(e instanceof Error ? e.message : "Could not save progress.");
        }
      });
    }
  };

  const submit = () => {
    setError("");
    startTransition(async () => {
      try {
        await submitTalentProfile(payload(PROFILE_STEPS.length - 1));
        window.location.reload();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not submit application.");
      }
    });
  };

  const toggleSkill = (skill: string) =>
    setForm((f) => ({
      ...f,
      skills: f.skills.includes(skill)
        ? f.skills.filter((s) => s !== skill)
        : [...f.skills, skill],
    }));

  const canAdvance = (() => {
    switch (step) {
      case 0:
        return Boolean(form.primary_role);
      case 1:
        return form.years_experience !== null;
      case 2:
        return form.skills.length > 0;
      case 3:
        return form.bio.trim().length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  })();

  return (
    <OnboardingShell eyebrow="Talent onboarding" accent="blue">
      <StepProgress steps={PROFILE_STEPS} current={step} />
      <OnboardingCard>
        {error ? (
          <div className="mb-5 rounded-xl border border-accent-amber/20 bg-accent-amber/10 p-3 text-center text-xs font-medium text-accent-amber">
            {error}
          </div>
        ) : null}

        {step === 0 ? (
          <>
            <StepHeading
              title={`Let's build your profile${firstName ? `, ${firstName}` : ""}`}
              subtitle="What's your primary discipline? You'll add specific skills next."
            />
            <OptionGrid
              options={TALENT_ROLES}
              value={form.primary_role}
              onSelect={(value) => setForm((f) => ({ ...f, primary_role: value }))}
            />
          </>
        ) : null}

        {step === 1 ? (
          <>
            <StepHeading
              title="How much experience do you have?"
              subtitle="Be honest — our Certification Agent verifies this through real builds."
            />
            <OptionGrid
              options={TALENT_EXPERIENCE}
              value={form.years_experience ? String(form.years_experience) : null}
              onSelect={(value) =>
                setForm((f) => ({ ...f, years_experience: Number(value) }))
              }
            />
          </>
        ) : null}

        {step === 2 ? (
          <>
            <StepHeading
              title="Select your skills"
              subtitle="Pick everything you're strong in. This drives how the Matching Agent scores you."
            />
            <div className="flex flex-wrap gap-2">
              {TALENT_SKILLS.map((skill) => {
                const selected = form.skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                      selected
                        ? "border-navy-mid bg-navy-mid text-white shadow-soft"
                        : "border-border-strong bg-white/70 text-navy-mid hover:bg-white"
                    }`}
                  >
                    {selected ? (
                      <Check className="size-3.5 stroke-[3]" />
                    ) : (
                      <Plus className="size-3.5" />
                    )}
                    {skill}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              {form.skills.length} selected
            </p>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <StepHeading
              title="Tell us about your work"
              subtitle="Agricultural context is a real advantage at Somahorse.ai."
            />
            <div className="space-y-4">
              <Field
                id="headline"
                label="Headline"
                value={form.headline}
                onChange={(v) => setForm((f) => ({ ...f, headline: v }))}
                placeholder="e.g. Full-stack engineer focused on data platforms"
              />
              <TextAreaField
                id="bio"
                label="Short bio"
                value={form.bio}
                onChange={(v) => setForm((f) => ({ ...f, bio: v }))}
                placeholder="What have you built? What are you best at?"
                rows={4}
              />
              <TextAreaField
                id="agri"
                label="Agricultural / supply-chain experience (optional)"
                value={form.agri_experience}
                onChange={(v) => setForm((f) => ({ ...f, agri_experience: v }))}
                placeholder="Any farming, logistics, or supply-chain context you understand."
                rows={3}
              />
              <Field
                id="country"
                label="Country"
                value={form.country}
                onChange={(v) => setForm((f) => ({ ...f, country: v }))}
                placeholder="e.g. South Africa"
              />
            </div>
          </>
        ) : null}

        {step === 4 ? (
          <>
            <StepHeading
              title="Show us your work"
              subtitle="Optional links that help our team review your application."
            />
            <div className="space-y-4">
              <Field
                id="portfolio"
                label="Portfolio / website"
                value={form.portfolio_url}
                onChange={(v) => setForm((f) => ({ ...f, portfolio_url: v }))}
                placeholder="https://"
              />
              <Field
                id="github"
                label="GitHub"
                value={form.github_url}
                onChange={(v) => setForm((f) => ({ ...f, github_url: v }))}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="mt-6 rounded-2xl border border-blue-vivid/15 bg-blue-light/40 p-4 text-xs text-navy-mid">
              When you submit, your application goes to our team for review. You&apos;ll
              be guided through a technical assessment and an interview before joining
              the network.
            </div>
          </>
        ) : null}

        <StepNav
          showBack={step > 0}
          onBack={() => goTo(step - 1, false)}
          onNext={() =>
            step === PROFILE_STEPS.length - 1 ? submit() : goTo(step + 1, true)
          }
          nextLabel={
            step === PROFILE_STEPS.length - 1 ? "Submit for review" : "Continue"
          }
          nextDisabled={!canAdvance}
          loading={pending}
        />
      </OnboardingCard>
    </OnboardingShell>
  );
}

const PIPELINE: { stage: TalentStage; label: string }[] = [
  { stage: "pending_review", label: "Application review" },
  { stage: "assessment", label: "Technical assessment" },
  { stage: "interview", label: "Interview" },
  { stage: "approved", label: "Approved" },
];

function pipelineIndex(stage: TalentStage): number {
  switch (stage) {
    case "pending_review":
      return 0;
    case "assessment":
    case "assessment_review":
      return 1;
    case "interview":
    case "interview_review":
      return 2;
    case "approved":
      return 3;
    default:
      return 0;
  }
}

function TalentPipeline({
  initial,
  firstName,
}: {
  initial: TalentOnboarding;
  firstName: string | null;
}) {
  const stage = initial.stage;
  const activeIndex = pipelineIndex(stage);

  return (
    <OnboardingShell eyebrow="Application status" accent="blue">
      <PipelineTracker activeIndex={activeIndex} rejected={stage === "rejected"} />
      <OnboardingCard>
        {stage === "pending_review" ? (
          <StatusScreen
            icon={Clock}
            tone="amber"
            title="Your application is under review"
            body="Our team is reviewing your profile. We'll unlock your technical assessment as soon as you're approved — check back here or watch your inbox."
          />
        ) : null}

        {stage === "assessment" ? (
          <AssessmentStep initial={initial} firstName={firstName} />
        ) : null}

        {stage === "assessment_review" ? (
          <StatusScreen
            icon={ClipboardCheck}
            tone="amber"
            title="Assessment submitted"
            body="Thanks — your technical assessment is being reviewed. If you pass, we'll invite you to the interview stage."
          />
        ) : null}

        {stage === "interview" ? (
          <InterviewStep />
        ) : null}

        {stage === "interview_review" ? (
          <StatusScreen
            icon={Video}
            tone="amber"
            title="Interview in progress"
            body="Your interview stage is being finalised by our team. We'll let you know the outcome shortly."
          />
        ) : null}

        {stage === "approved" ? (
          <StatusScreen
            icon={Trophy}
            tone="teal"
            title="Welcome to the network!"
            body="You've been certified and promoted to the talent dashboard."
            action={{ href: "/dashboard/talent", label: "Go to your dashboard" }}
          />
        ) : null}

        {stage === "rejected" ? (
          <StatusScreen
            icon={XCircle}
            tone="amber"
            title="Application not successful this time"
            body={
              initial.admin_notes ??
              "Thank you for applying. Unfortunately we're not moving forward right now. You're welcome to apply again in the future."
            }
          />
        ) : null}
      </OnboardingCard>
    </OnboardingShell>
  );
}

function PipelineTracker({
  activeIndex,
  rejected,
}: {
  activeIndex: number;
  rejected: boolean;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
      {PIPELINE.map((item, index) => {
        const done = index < activeIndex || (activeIndex === 3 && index <= 3);
        const active = index === activeIndex && !rejected;
        return (
          <div key={item.stage} className="flex items-center gap-2">
            <span
              className={`flex size-7 items-center justify-center rounded-full border text-xs font-bold ${
                done
                  ? "border-accent-teal bg-accent-teal text-white"
                  : active
                    ? "border-navy-mid bg-navy-mid text-white shadow-glow"
                    : "border-border-strong bg-white/70 text-muted-foreground"
              }`}
            >
              {done ? <Check className="size-3.5 stroke-[3]" /> : index + 1}
            </span>
            <span
              className={`text-xs font-semibold ${
                active ? "text-navy" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
            {index < PIPELINE.length - 1 ? (
              <span className="mx-1 hidden h-0.5 w-6 rounded-full bg-border sm:block" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function StatusScreen({
  icon: Icon,
  title,
  body,
  tone,
  action,
}: {
  icon: typeof Clock;
  title: string;
  body: string;
  tone: "amber" | "teal";
  action?: { href: string; label: string };
}) {
  const toneClass =
    tone === "teal"
      ? "bg-accent-teal/15 text-accent-teal"
      : "bg-accent-amber/15 text-accent-amber";
  return (
    <div className="py-6 text-center">
      <div
        className={`mx-auto mb-5 flex size-14 items-center justify-center rounded-full ${toneClass}`}
      >
        <Icon className="size-7" />
      </div>
      <h1 className="font-display text-2xl font-bold text-navy">{title}</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{body}</p>
      {action ? (
        <Link
          href={action.href}
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-navy-mid px-7 text-sm font-semibold text-white shadow-glow transition hover:bg-navy"
        >
          {action.label}
        </Link>
      ) : (
        <p className="mt-6 text-xs text-muted-foreground">
          You can safely close this page — your progress is saved.
        </p>
      )}
    </div>
  );
}

function AssessmentStep({
  initial,
  firstName,
}: {
  initial: TalentOnboarding;
  firstName: string | null;
}) {
  const [answers, setAnswers] = useState({
    problem_solving: initial.assessment?.problem_solving ?? "",
    technical_build: initial.assessment?.technical_build ?? "",
    agri_context: initial.assessment?.agri_context ?? "",
  });
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const ready =
    answers.problem_solving.trim().length > 0 &&
    answers.technical_build.trim().length > 0 &&
    answers.agri_context.trim().length > 0;

  const submit = () => {
    setError("");
    startTransition(async () => {
      try {
        await submitTalentAssessment(answers);
        window.location.reload();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not submit assessment.");
      }
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-start gap-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-accent-teal/15 text-accent-teal">
          <CheckCircle2 className="size-6" />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-navy">
            You&apos;re approved{firstName ? `, ${firstName}` : ""} — technical assessment
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            This adapts to how you think and build. Answer in your own words.
          </p>
        </div>
      </div>

      {error ? (
        <div className="mb-5 rounded-xl border border-accent-amber/20 bg-accent-amber/10 p-3 text-center text-xs font-medium text-accent-amber">
          {error}
        </div>
      ) : null}

      <div className="space-y-5">
        <TextAreaField
          id="q1"
          label="1. Walk us through how you'd debug a system that's silently dropping 20% of records."
          value={answers.problem_solving}
          onChange={(v) => setAnswers((a) => ({ ...a, problem_solving: v }))}
          rows={4}
        />
        <TextAreaField
          id="q2"
          label="2. Describe a technically hard system you built and the key decisions you made."
          value={answers.technical_build}
          onChange={(v) => setAnswers((a) => ({ ...a, technical_build: v }))}
          rows={4}
        />
        <TextAreaField
          id="q3"
          label="3. How would you design data capture for smallholder farms with patchy connectivity?"
          value={answers.agri_context}
          onChange={(v) => setAnswers((a) => ({ ...a, agri_context: v }))}
          rows={4}
        />
      </div>

      <StepNav
        showBack={false}
        onNext={submit}
        nextLabel="Submit assessment"
        nextDisabled={!ready}
        loading={pending}
      />
    </div>
  );
}

function InterviewStep() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const confirm = () => {
    setError("");
    startTransition(async () => {
      try {
        await confirmTalentInterview();
        window.location.reload();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not confirm.");
      }
    });
  };

  return (
    <div className="py-2 text-center">
      <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-accent-teal/15 text-accent-teal">
        <Video className="size-7" />
      </div>
      <h1 className="font-display text-2xl font-bold text-navy">
        You passed the assessment
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        The final step is an interview with our team. Confirm below and we&apos;ll
        coordinate a time. Once you confirm, your interview moves to final review.
      </p>
      {error ? (
        <div className="mx-auto mt-5 max-w-sm rounded-xl border border-accent-amber/20 bg-accent-amber/10 p-3 text-xs font-medium text-accent-amber">
          {error}
        </div>
      ) : null}
      <button
        type="button"
        onClick={confirm}
        disabled={pending}
        className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-navy-mid px-7 text-sm font-semibold text-white shadow-glow transition hover:bg-navy disabled:opacity-50"
      >
        {pending ? "Confirming…" : "Confirm interview availability"}
      </button>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="font-display text-xs font-bold uppercase tracking-wide text-navy-mid/80"
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-11 rounded-xl border border-border-strong bg-white/50 px-4 text-sm text-navy placeholder-muted-foreground/50 transition focus:border-blue-vivid focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-vivid/10"
      />
    </div>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="font-display text-xs font-bold uppercase tracking-wide text-navy-mid/80"
      >
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-xl border border-border-strong bg-white/50 px-4 py-3 text-sm text-navy placeholder-muted-foreground/50 transition focus:border-blue-vivid focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-vivid/10"
      />
    </div>
  );
}
