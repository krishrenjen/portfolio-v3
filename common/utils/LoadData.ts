import experience from "@/common/local_data/experience.json";
import skills from "@/common/local_data/skills.json";

const urlRoute = "https://krishrenjen.github.io/portfolio-data";
const static_text_revalidate = 10 * 60; // 10 minutes
const projects_revalidate = 5 * 60; // 5 minutes
const experience_revalidate = 5 * 60; // 5 minutes
const production = false;


export async function getStaticText(){
  if(!production){
    return {
      "biography": "This is a sample biography. This will be fetched during production.",
    };
  }
  try {
    const response = await fetch(`${urlRoute}/data/text.json`, {
      next: { revalidate: static_text_revalidate }, 
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching biography:", error);
    return null;
  }
}

export async function getExperience() {
  if(!production){
    return experience;
  }
  
  try {
    const response = await fetch(`${urlRoute}/data/experience.json`, {
      next: { revalidate: experience_revalidate }, 
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching experience:", error);
    return [];
  }
}

export async function getProjects() {
  try {
    const response = await fetch(`${urlRoute}/data/projects.json`, {
      next: { revalidate: projects_revalidate }, 
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getSkills(){
  if(!production){
    return skills;
  }
  
  try {
    const response = await fetch(`${urlRoute}/data/skills.json`, {
      next: { revalidate: projects_revalidate }, 
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}