import { TProjectInfo } from "@/types/types";
import VStack from "../ui/v-stack/v-stack";
import "./project-desc-card.css";
type ProjectDescCardProps = {
  desc: string;
  info: string;
};

function ProjectDescCard({ desc, info }: ProjectDescCardProps) {
  return (
    <VStack size="9col">
      <div className="project-desc-card">
        <div>
          <h2 className="project-desc-card__title">Project description</h2>
          <p className="bodytext3 bodytext3_semibold project-desc-card__type">
            {desc}
          </p>
          <h2 className="project-desc-card__title">Additional info</h2>
          <p className="bodytext3 bodytext3_semibold project-desc-card__type">
            {info}
          </p>
        </div>
      </div>
    </VStack>
  );
}
export default ProjectDescCard;
