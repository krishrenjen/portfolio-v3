import { getExperience, getSkills, getStaticText } from '@/common/utils/LoadData';
import Chip from '@/components/Chip/Chip';
import IconLink from '@/components/IconLink/IconLink';
import LogoWithPane from '@/components/Visual/Logo';
import StarrySky from '@/components/Visual/StarrySky';
import Image from 'next/image';
import { FaLocationDot } from "react-icons/fa6";
import ExperienceCard, { CommonItem } from "@/components/Experience/ExperienceCard";
import TabbedMenu from '@/components/TabbedMenu/TabbedMenu';
import LocationDisplay from '@/components/ClientComponents/Location';
import { Skills } from '@/common/types/Skills';
import SkillChip from '@/components/Chip/SkillChip';



export default async function Home() {
  const experience = await getExperience();
  const work = experience.work_experience;
  const education = experience.education;

  const skills : Skills = await getSkills();
    
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

  const staticText = await getStaticText();
  return (
    <>
      <StarrySky />
      <div className="mx-auto mt-6 max-w-2xl px-6 flex flex-col items-center justify-center bg-[#0a0a0a70] backdrop-filter backdrop-blur-lg backdrop-opacity-50">
        <div className="h-fit flex flex-col items-center justify-start py-14 gap-6 w-full">
          
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
                  <h1 className="font-light text-2xl">Hey there! I'm</h1>
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
            <p className="font-normal text-l">{staticText.biography}</p>
          </div>

          {/* Socials section */}
          <div className="min-w-full">
            <div className="flex flex-col items-center justify-center gap-2 min-w-full">
              <div className="flex flex-row grow items-center justify-center gap-2 min-w-full">
                <IconLink
                  icon="/social_logos/githublogo.svg"
                  text="krishrenjen"
                  href="https://github.com/krishrenjen"
                  className="grow flex-1 basis-0 border-2 border-[#1f1e1e]"
                />
                <IconLink
                  icon="/social_logos/linkedinlogo.svg"
                  text="in/krishrenjen"
                  href="https://linkedin.com/in/krishrenjen"
                  className="grow flex-1 basis-0 border-2 border-[#1f1e1e]"
                />
                <IconLink
                  icon="/social_logos/resume.svg"
                  icon_scale={0.9}
                  text="Resume"
                  href="/resume.pdf"
                  className="grow flex-1 basis-0 border-2 border-[#1f1e1e]"
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
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {skills.skills_list.slice(0, skills.display).map((skill, index) => (
              <SkillChip key={index} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
