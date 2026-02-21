import { Summary } from "@/components/persona-view/recruiter/summary";
import { ImpactMetrics } from "@/components/persona-view/recruiter/impact-metrics";
import { Experience } from "@/components/persona-view/recruiter/experience";
import { KeyAchievements } from "@/components/persona-view/recruiter/key-achievements";
import { Skills } from "@/components/persona-view/recruiter/skills";

export const TimelineView = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Summary />
      <Experience />
      <KeyAchievements />
      <ImpactMetrics />
      <Skills />
    </div>
  );
};
