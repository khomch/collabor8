import ProfileCard from "@/components/profile-card/profile-card";
import "./projects.css";
import { projects } from "@/_MOCK-DATA_/mock-data";
import ProjectCard from "@/components/project-card/project-card";
import ProfileDetailCard from "@/components/project-detail-card/project-detail-card";
import ProjectDescCard from "@/components/project-desc-card/project-desc-card";
import ProfileBtnCard from "@/components/profile-btn-card/profile-btn-card";
import ProjectWorkCard from "@/components/project-work-card/project-work-card";

export default function MyProjects() {
  const tempData = {
    desc: "Instructors, students, and admins can create, edit and follow courses, assign roles, request help. Instructors can keep track of student performance, feedback on assessments.",
    info: "We well sell our project to Codeworks and become billionaires.",
  };

  const tempFinishUser = [
    {
      username: "Kamil Zmuda",
      role: "Fullstack Developer",
    },
  ];

  const tempJoinUser = [
    {
      username: "Kamil Zmuda",
      role: "Fullstack Developer",
    },
    {
      username: "Jin Lee",
      role: "Fullstack Developer",
    },
  ];

  return (
    // <section className="projects-page">
    //   <div className="projects">
    //     <div className="projects__content">
    //       <div className="projects-page__filters">
    //         <ProfileDetailCard />
    //       </div>
    //       <div className="projects-page__projects">
    //         <ProjectCard btnLabel="Apply" project={projects[0]} />
    //         <ProjectDescCard desc={tempData.desc} info={tempData.info} />
    //       </div>
    //     </div>
    //   </div>
    // </section>

    // if owner project
    <section className="projects-page">
      <div className="projects">
        <div className="projects__content">
          <div className="projects-page__filters">
            <ProfileBtnCard
              title={"Finished"}
              status={"finished"}
              data={tempFinishUser}
            />
            <ProfileBtnCard
              title={"Want to Join"}
              status={"join"}
              data={tempJoinUser}
            />
            <ProfileDetailCard />
            <ProjectWorkCard />
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
