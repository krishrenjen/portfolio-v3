import Logo from '@/components/Visual/Logo';
import Link from 'next/link';
import MarkdownInline from '../Markdown/MarkdownInline';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import Chip from '../Chip/Chip';

type ProjectOverviewProps = {
  project: Project;
}

export default function ProjectOverview(props : ProjectOverviewProps){
  return(
    <Link href={`/projects/${props.project.id}`}>
      <div className="w-full h-full flex flex-col items-start justify-start gap-4 border-1 border-[#1f1e1e] hover:bg-[#1f1e1e] bg-[#111] transition duration-300 px-4 py-4 rounded-md">
        {/* pick first image if there is at least one image */}
        {props.project.images && props.project.images.length > 0 && (
        <div className="w-full h-40 relative">
          {props.project.current && (
            <div className="absolute top-2 right-2">
              <Chip className={"border border-brand-blue bg-brand-blue/50 flex flex-row gap-2 items-center justify-start text-xs"}>Current</Chip>
            </div>
          )}
          <img
            src={props.project.images[0]}
            alt={props.project.shortTitle ?? props.project.title}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
      )}

        
        
        <h1 className="text-xl font-medium">{props.project.shortTitle ?? props.project.title}</h1>
        <div className="flex flex-row items-center justify-start gap-2 cursor-default">
            {props.project.tags.map((tag, index) => (
              <Tooltip key={index}>
                <TooltipTrigger><Logo key={index} src={`${tag.icon}`} size={1.5} rgb="92, 91, 91" /></TooltipTrigger>
                <TooltipContent>
                  <p>{tag.title}</p>
                </TooltipContent>
              </Tooltip>
              
            ))}
        </div>
            
        {props.project.title_tags && props.project.title_tags.length > 0 && 
        <div className="flex flex-row justify-start flex-wrap gap-2 items-stretch">
          {props.project.title_tags?.map((tag, index) => (
            <Chip key={index} className={"border border-brand-pink bg-brand-pink/50 flex flex-row gap-2 items-center justify-start text-xs"}>{tag}</Chip>
          ))}
        </div>}
        
        <div className="flex flex-col justify-between h-full gap-4">
          <MarkdownInline className="text-base" content={props.project.short_description}/>
          <div className="flex flex-row items-center justify-start gap-2 w-full">
            <p className="text-sm text-gray-500">{props.project.date}</p>
            {(!props.project.images || props.project.images.length === 0) && props.project.current && (
            <Chip className={"border border-brand-blue bg-brand-blue/50 flex flex-row gap-2 items-center justify-start text-xs"}>Current</Chip>

            )}
          </div>
          
        </div>
      
      </div>
    </Link>
    
  )
  
}