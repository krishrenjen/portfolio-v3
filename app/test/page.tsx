import { getExperience } from "@/common/utils/LoadData";
import ExperienceCard, { CommonItem } from "@/components/Experience/ExperienceCard";

export default async function Page() {
  const experience = await getExperience();
  const work = experience.work_experience;
  const education = experience.education;

  return <div className="flex flex-col gap-2 px-6 py-52">
    {work.map((item : CommonItem, index : number) => (
      <ExperienceCard key={index} {...item} />
    ))}
    {education.map((item : CommonItem, index : number) => (
      <ExperienceCard key={index} {...item} />
    ))}
  </div>
  
}
