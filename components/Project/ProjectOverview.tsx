import Logo from '@/components/Visual/Logo';
import Link from 'next/link';
import MarkdownInline from '../Markdown/MarkdownInline';

type ProjectOverviewProps = {
  project: Project;
}

export default function ProjectOverview(props : ProjectOverviewProps){
  return(
    <Link href={`/projects/${props.project.id}`}>
      <div className="h-full flex flex-col items-start justify-start gap-4 w-fit border-1 border-[#1f1e1e] hover:bg-[#1f1e1e] bg-[#111] transition duration-300 px-4 py-4 rounded-md">
      <h1 className="text-xl font-medium">{props.project.title}</h1>
      <div className="flex flex-row items-center justify-start gap-2">
          {props.project.tags.map((tag, index) => (
            <Logo alt={tag.title} key={index} src={`${tag.icon}`} size={1.5} rgb="92, 91, 91" />
          ))}
      </div>
      
      <div className="flex flex-col justify-between h-full gap-4">
        <MarkdownInline className="text-base" content={props.project.short_description}/>
        <p className="text-sm text-gray-500">{props.project.date}</p>
      </div>
      
    </div>
    </Link>
    
  )
  
}