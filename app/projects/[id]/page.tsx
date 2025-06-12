// No "use client" — this is a server component by default

import { getProjects } from "@/common/utils/LoadData";
import ImageCarousel from "@/components/Carousel/Carousel";
import Chip from "@/components/Chip/Chip";
import SkillChip from "@/components/Chip/SkillChip";
import MarkdownBlock from "@/components/Markdown/MarkdownBlock";
import Image from "next/image";


export default async function Page({params}: {params: Promise<{ id: string }>
}) {
  const {id} = await params;
  const projects : Project[] = await getProjects();
  const project = projects.find((p) => p.id === id);

  if(project === undefined){
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-2">Project Not Found</h1>
        <p className="text-sm text-gray-400">The project you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-6 max-w-2xl px-6 flex flex-col items-start justify-center bg-[#0a0a0a70] backdrop-filter backdrop-blur-lg backdrop-opacity-50">
      <a href={project.primaryHref} target="_blank" className="text-4xl font-bold mb-2">{project.title}</a>
      <p className="text-sm text-gray-400 mb-4">{project.date}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, index) => (
          <SkillChip key={index} skill={{
            name: tag.title,
            color: tag.color,
            icon: tag.icon
          }}/>
        ))}
      </div>

      {project.images && project.images.length > 0 && (
        <ImageCarousel images={project.images} title={project.title} />
      )}

      <div className="">
        <MarkdownBlock content={project.description} />
      </div>

      {project.links && project.links.length > 0 &&
        <div className="flex flex-row items-center justify-start gap-2 flex-wrap">
        {project.links?.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-medium text-sm max-w-fit inline-block"
          >
            <Chip className="bg-white flex flex-row gap-1 items-center justify-start hover:bg-[#f0f0f0] transition duration-300">
              <div>
                {link.icon ? 
                <Image src={link.icon} alt={link.text} width={24} height={24} className="brightness-0" /> :
                <Image src={"/local_icons/link.svg"} alt={link.text} width={24} height={24} className="brightness-0" />
                }
                
              </div>
            
            {link.text}
            </Chip>
          </a>
        ))}
        </div>
      }
    </div>
  );
}
