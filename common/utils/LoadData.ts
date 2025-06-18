import experience from "@/common/local_data/experience.json";
import skills from "@/common/local_data/skills.json";
import projects from "@/common/local_data/projects.json";
import text from "@/common/local_data/text.json";

const urlRoute = "https://krishrenjen.github.io/portfolio-data";
const static_text_revalidate = 10 * 60; // 10 minutes
const projects_revalidate = 5 * 60; // 5 minutes
const experience_revalidate = 5 * 60; // 5 minutes
const devMode = process.env.DEVMODE === 'true';


export async function getStaticText(){
  if(devMode){
    return text;
  }
  try {
    const response = await fetch(`${urlRoute}/data/text.json`, {
      next: { revalidate: static_text_revalidate, tags: ['text'] }, // Revalidate every 10 minutes
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching biography:", error);
    return null;
  }
}

export async function getExperience() {
  if(devMode){
    return experience;
  }
  
  try {
    const response = await fetch(`${urlRoute}/data/experience.json`, {
      next: { revalidate: experience_revalidate, tags: ['experience'] }, // Revalidate every 5 minutes
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching experience:", error);
    return [];
  }
}

export async function getSkills(){
  if(devMode){
    return skills;
  }
  
  try {
    const response = await fetch(`${urlRoute}/data/skills.json`, {
      next: { revalidate: projects_revalidate, tags: ['skills'] }, // Revalidate every 5 minutes
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

export async function getProjects(){
  if(devMode){
    return projects;
  }
  
  try {
    const response = await fetch(`${urlRoute}/data/projects.json`, {
      next: { revalidate: projects_revalidate, tags: ['projects'] }, // Revalidate every 5 minutes
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}