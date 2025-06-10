import { Skill } from "@/common/types/Skills"
import LogoWithPane from "../Visual/LogoWithPane";

type SkillChipProps = {
  skill: Skill;
};

export default function SkillChip({ skill }: SkillChipProps) {
  return (
    <div className="border-1 border-[#1f1e1e] bg-[#111] py-2 px-2 flex flex-row justify-start items-center gap-3 rounded-md">
      <LogoWithPane src={skill.icon ?? ""} rgb={skill.color} size={1.6}/>
      <span className="text-l font-medium text-center">{skill.name}</span>
    </div>
  );
}