import { getExperience, getProjects, getSkills, getStaticText } from '@/common/utils/LoadData';
import IconLink from '@/components/IconLink/IconLink';
import Image from 'next/image';
import { FaLocationDot } from "react-icons/fa6";
import ExperienceCard, { CommonItem } from "@/components/Experience/ExperienceCard";
import TabbedMenu from '@/components/TabbedMenu/TabbedMenu';
import LocationDisplay from '@/components/ClientComponents/Location';
import { Skills } from '@/common/types/Skills';
import SkillChip from '@/components/Chip/SkillChip';
import ProjectOverview from '@/components/Project/ProjectOverview';
import MarkdownInline from '@/components/Markdown/MarkdownInline';
import Link from 'next/link';



export default async function Home() {
  const experience = await getExperience();
  const work = experience.work_experience;
  const education = experience.education;

  const skills : Skills = await getSkills();
  const projects : Project[] = await getProjects();
  const staticText = await getStaticText();
    
  const tabs = [
    {
      label: 'Work Experience',
      content: work.map((item : CommonItem, index : number) => (
            <ExperienceCard key={index} {...item} />
          )),
    },
    {
      label: 'Education',
      content: education.map((item : CommonItem, index : number) => (
            <ExperienceCard key={index} {...item} />
          )),
    }
  ];

  
  return (
    <>
      <div className="mx-auto mt-3 max-w-2xl px-6 flex flex-col items-center justify-center bg-[#0a0a0a70] backdrop-filter backdrop-blur-lg backdrop-opacity-50">
        <div className="h-fit pb-14 flex flex-col items-center justify-start gap-6 w-full">
          
          {/* Photo + name section */}
          <div className="flex flex-row items-center justify-start gap-0.5 w-full">
            <div className="w-[150px] h-[150px] flex items-center justify-center">
              <Image
                src="/profilepicture.jpg"
                alt="profile"
                width={150}
                height={150}
                className="w-24 h-24 object-cover rounded-full border-brand-pink border-opacity-50 block p-0.5 border-2"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
                <div className='flex flex-col items-start justify-center'>
                  <h1 className="font-light text-2xl">Hey there! I&apos;m</h1>
                  <h1 className="font-semibold text-3xl">Krish Renjen</h1>
                </div>
                <div className="flex flex-row items-center justify-start gap-2">
                  <FaLocationDot />
                  <LocationDisplay/>
                </div>
            </div>
          </div>
          
          {/* Biography section */}
          <div>
            <MarkdownInline content={staticText.biography}/>
          </div>

          {/* Socials section */}
          <div className="min-w-full">
            <div className="flex flex-col items-center justify-center gap-2 min-w-full">
              <div className="flex flex-row grow items-stretch justify-center gap-2 min-w-full">
                <IconLink
                  icon="/social_logos/githublogo.svg"
                  text="krishrenjen"
                  href="https://github.com/krishrenjen"
                  className="grow flex-1 basis-0 border-2 border-[#1f1e1e] h-full"
                />
                <IconLink
                  icon="/social_logos/linkedinlogo.svg"
                  text="in/krishrenjen"
                  href="https://linkedin.com/in/krishrenjen"
                  className="grow flex-1 basis-0 border-2 border-[#1f1e1e] h-full"
                />
                <IconLink
                  icon="/social_logos/resume.svg"
                  icon_scale={1}
                  text="Resume"
                  href="/resume.pdf"
                  className="grow flex-1 basis-0 border-2 border-[#1f1e1e] h-full"
                />
              </div>
                <IconLink
                  icon="/social_logos/email.svg"
                  icon_scale={1.1}
                  text="krish.renjen@gmail.com"
                  href="mailto:krish.renjen@gmail.com"
                  className="w-full border-2 border-[#1f1e1e] "
                />
            </div>
          </div>

          {/* Experience section */}
          <div className="w-full mt-6">
            <TabbedMenu tabs={tabs} />
          </div>

          {/* Skills section */}
          <div className="w-full mt-6">
            <h2 className="text-2xl font-semibold mb-4">Top Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {skills.skills_list.slice(0, skills.display).map((skill, index) => (
              <SkillChip key={index} skill={skill} />
              ))}
            </div>
          </div>

          {/* Projects section */}
          <div className="w-full mt-6">
            <div className="flex flex-row items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Pinned Projects</h2>
              {projects.length > 2 && (
              <div className="text-right align-middle h-full">
                <Link href="/projects" className="text-brand-pink font-medium group">
                  View {projects.length - 2} More <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.slice(0, 2).map((project, index) => (
                  <ProjectOverview key={index} project={project} />
                ))}
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
}
