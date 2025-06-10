'use client';
import TabbedMenu from "@/components/TabbedMenu/TabbedMenu"; // adjust the path as needed
import React, { useEffect, useState } from 'react';
import { getExperience } from "@/common/utils/LoadData";
import ExperienceCard, { CommonItem } from "@/components/Experience/ExperienceCard";

export default function ExamplePage() {
  const [workExperience, setWorkExperience] = useState<CommonItem[]>([]);
  const [education, setEducation] = useState<CommonItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const experience = await getExperience();
      const work = experience.work_experience;
      const education = experience.education;

      setWorkExperience(work);
      setEducation(education);
    }

    fetchData();
  }, []);

  const tabs = [
    {
      label: 'Work Experience',
      content: workExperience.map((item : CommonItem, index : number) => (
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
    <div className="max-w-xl mx-auto mt-10">
      <TabbedMenu tabs={tabs} />
    </div>
  );
}
