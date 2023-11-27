import "./project-work-card.css";
import VStack from "../ui/v-stack/v-stack";
function ProjectWorkCard() {
  return (
    <VStack size="3col">
      <div className=" project-work-card">
        <div className="h6">Project Workspace</div>
        <div className="project-work-card__list">
          <span>Slack</span>
          <span>Git</span>
          <span>GitHub Project</span>
          <span>Slack</span>
        </div>
      </div>
    </VStack>
  );
}
export default ProjectWorkCard;
