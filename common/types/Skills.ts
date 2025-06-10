export type Skill = {
  name: string;
  color?: string;
  icon?: string;
}

export type Skills = {
  display: number;
  skills_list: Skill[];
}