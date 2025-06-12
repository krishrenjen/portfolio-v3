import { getProjects } from "@/common/utils/LoadData";
import ProjectOverview from "@/components/Project/ProjectOverview";

export default async function Page(){
  const projects : Project[] = await getProjects();
  
  return(
    <div className="mx-auto mb-6 max-w-2xl px-6 flex flex-col items-center justify-center bg-[#0a0a0a70] backdrop-filter backdrop-blur-lg backdrop-opacity-50">

    
      <div className="w-full mt-6">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <ProjectOverview key={index} project={project} />
            ))}
        </div>

        
      </div>
    </div>
  );
}