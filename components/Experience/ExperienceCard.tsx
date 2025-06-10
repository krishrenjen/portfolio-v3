"use client";

import { useState } from "react";
import Image from "next/image";
import Chip from "../Chip/Chip";
import { marked } from "marked";
import clsx from "clsx";
import { motion, AnimatePresence } from 'framer-motion';
import MarkdownInline from "../Markdown/MarkdownInline";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";


type Tag = {
  title: string;
  type?: "Language" | "Tool" | string;
  icon?: string;
  bg_color?: string;
};

type Link = {
  text: string;
  href: string;
  icon?: string;
};

type Course =
  | string
  | {
      name: string;
      href: string;
      inProgress?: boolean;
      highlight?: boolean;
    };

type CourseGroup = Record<string, Course[]>;

export type CommonItem = {
  title?: string;
  company?: string;
  school?: string;
  degree?: string;
  logo?: string;
  date: string;
  bullets?: string[];
  primaryHref?: string;
  links?: Link[];
  tags?: Tag[];
  courses?: CourseGroup;
};

function getColor(type: string | undefined) {
  const tool_color = "bg-brand-cyan/50";
  const lang_color = "bg-brand-blue/50";
  const misc_color = "bg-brand-pink/50";

  if (type === undefined || type === null) {
    return misc_color;
  }
  if (type === "Language") {
    return lang_color;
  }
  if (type === "Tool") {
    return tool_color;
  }
  return misc_color;
}

function getBorderColor(type: string | undefined) {
  const tool_color = "border-brand-cyan";
  const lang_color = "border-brand-blue";
  const misc_color = "border-brand-pink";

  if (type === undefined || type === null) {
    return misc_color;
  }
  if (type === "Language") {
    return lang_color;
  }
  if (type === "Tool") {
    return tool_color;
  }
  return misc_color;
}

export default function ExperienceCard(props: CommonItem){
  const location = props.company ?? props.school;
  const title = props.title ?? props.degree;
  const [showAll, setShowAll] = useState(false);

  const highlightedCourses = props.courses ? Object.entries(props.courses).map(([key, courses]) => ({
    title: key,
    courses: courses.filter(course => typeof course !== "string" && course.highlight),
  })).filter(group => group.courses.length > 0) : [];
  
  return <div className="flex flex-col items-start justify-start gap-2 p-4">
    <div className="flex flex-row items-center justify-start gap-4 mb-2">
      {props.logo && (
        <a
          href={props.primaryHref ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-pink border-opacity-50">
            <Image
              fill
              src={props.logo}
              alt={location ?? ""}
              className="object-cover"
            />
          </div>
        </a>
      )}
      <div>
        <h3 className="text-sm">{props.date}</h3>
        {location && <h1 className="font-medium">{location}</h1>}
        {title && <h2 className=" text-sm">{title}</h2>}
      </div>
    </div>
    

    <ul className="list-disc list-inside pl-4 [&_strong]:font-semibold">
      {props.bullets?.map((bullet, index) => (
        <li key={index} className="text-sm leading-tight my-1">
          <MarkdownInline className="relative left-[-10px]" content={bullet}/>
        </li>
      ))}
    </ul>
    
    {props.tags && props.tags.length > 0 && 
    <div className="flex flex-row justify-start flex-wrap gap-2 items-stretch">
      {props.tags?.map((tag, index) => (
        <Chip key={index} className={clsx(getColor(tag.type), getBorderColor(tag.type), "border flex flex-row gap-2 items-center justify-start text-xs")}>{tag.title}</Chip>
      ))}
    </div>}
    
    {props.links && props.links.length > 0 &&
    <div className="flex flex-row items-center justify-start gap-2 flex-wrap">
    {props.links?.map((link, index) => (
      <a
        key={index}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black font-medium text-xs max-w-fit inline-block"
      >
        <Chip className="bg-white flex flex-row gap-1 items-center justify-start hover:bg-[#f0f0f0] transition duration-300">
          <div>
            {link.icon ? 
            <Image src={link.icon} alt={link.text} width={16} height={16} className="brightness-0" /> :
            <Image src={"/local_icons/link.svg"} alt={link.text} width={16} height={16} className="brightness-0" />
            }
            
          </div>
        
        {link.text}
        </Chip>
      </a>
    ))}
    </div>
    }
    

    {/* courses section */}
    {props.courses && (
      <div className="mt-2 w-full">
        {/* highlighted preview */}
        <h3 className="text-sm font-semibold mb-1">Courses</h3>
        {highlightedCourses.length > 0 && !showAll && (
          <div className="flex flex-wrap gap-1 text-sm text-white">
            {highlightedCourses.flatMap(group => group.courses.map((course, i) => {
              if (typeof course === "string" || !course.highlight) return null;
              const inProgress = typeof course !== "string" && course.inProgress;
              const href = typeof course === "string" ? undefined : course.href;
              const name = typeof course === "string" ? course : course.name;

              return (
                <span
                  key={`${group.title}-${i}`}
                  className="px-2 py-0.5 bg-gray-800 text-white rounded-full text-xs flex flex-row items-center justify-center gap-1"
                >
                  {inProgress && (
                    <Tooltip>
                      <TooltipTrigger><span className="w-1.5 h-1.5 bg-yellow-400 rounded-full inline-block ml-1" /></TooltipTrigger>
                      <TooltipContent>
                        <p>In Progress</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {name}
                    </a>
                  ) : (
                    name
                  )}
                </span>
              );
            }))}
            {!showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="ml-2 underline text-xs text-gray-300 cursor-pointer"
              >
                View more
              </button>
            )}
          </div>
        )}

        {/* full view by type */}
        {(showAll || highlightedCourses.length == 0) && (
          <div className="mt-2 space-y-2">
            {Object.entries(props.courses).map(([groupTitle, groupCourses]) => (
              <div key={groupTitle}>
                <h4 className="text-xs text-gray-400 font-semibold mb-1">{groupTitle}</h4>
                <div className="flex flex-wrap gap-2">
                  {groupCourses.map((course, i) => {
                    const name = typeof course === "string" ? course : course.name;
                    const inProgress = typeof course !== "string" && course.inProgress;
                    const href =
                      typeof course === "string" ? undefined : course.href;
                    return (
                      <span
                        key={`${groupTitle}-${i}`}
                        className="px-2 py-0.5 bg-gray-800 text-white rounded-full text-xs flex flex-row items-center justify-center gap-1"
                      >
                        {inProgress && (
                          <Tooltip>
                            <TooltipTrigger><span className="w-1.5 h-1.5 bg-yellow-400 rounded-full inline-block ml-1" /></TooltipTrigger>
                            <TooltipContent>
                              <p>In Progress</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {href ? (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {name}
                          </a>
                        ) : (
                          name
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
            {highlightedCourses.length > 0 && 
            <button
              onClick={() => setShowAll(false)}
              className="mt-2 underline text-xs text-gray-300 cursor-pointer"
            >
              Show less
            </button>
            }
            
          </div>
        )}
      </div>
    )}

    
  </div>
}