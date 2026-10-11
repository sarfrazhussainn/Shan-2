import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/shared/Grids";
import { PageHero } from "@/components/ui/PageHero";
import { getProjects } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Our Projects",
  description: "Selected testing, inspection, calibration and trading projects delivered across Saudi Arabia.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title="Work we are proud of"
        description="A selection of projects delivered across the Eastern Province and beyond."
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
        <ProjectsGrid projects={projects} />
      </section>
    </>
  );
}
