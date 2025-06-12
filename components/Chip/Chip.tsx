import clsx from "clsx";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

export default function Chip(props: Props) {
  
  return (
    <div
      className={
        clsx("rounded-lg px-2 py-[4px] text-center h-fit w-fit",
            props.className ?? ""   
        )
      }
    >
      {props.children}
    </div>
  );
}