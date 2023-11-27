import ProfileCard from "@/components/profile-card/profile-card";
import Link from "next/link";
import "./projects.css";
import { projects } from "@/_MOCK-DATA_/mock-data";
import VStack from "@/components/ui/v-stack/v-stack";
import ProjectCard from "@/components/project-card/project-card";
import IconOwner from "../../../public/icon-owner.svg";
import IconTeamMember from "../../../public/icon-teammember.svg";
import Image from "next/image";
import ProfileDetailCard from "@/components/project-detail-card/project-detail-card";
import ProjectDescCard from "@/components/project-desc-card/project-desc-card";

export default function MyProjects() {
  const tempData = {
    desc: "Instructors, students, and admins can create, edit and follow courses, assign roles, request help. Instructors can keep track of student performance, feedback on assessments.",
    info: "We well sell our project to Codeworks and become billionaires.",
  };

  return (
    <section className="projects-page">
      <div className="projects">
        <div className="projects__content">
          <div className="projects-page__filters">
            <ProfileDetailCard />
          </div>
          <div className="projects-page__projects">
            <ProjectCard btnLabel="Apply" project={projects[0]} />
            <ProjectDescCard desc={tempData.desc} info={tempData.info} />
          </div>
        </div>
      </div>
    </section>
  );
}
