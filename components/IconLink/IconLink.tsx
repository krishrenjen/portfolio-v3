import clsx from "clsx";
import Image from 'next/image';

export default function IconLink({
  href,
  icon,
  icon_scale = 1,
  text,
  className = "",
}: {
  href: string;
  icon: React.ReactNode | string;
  icon_scale?: number;
  text?: string;
  className?: string;
}) {
  return ( 
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        className,
        "rounded-md py-3 px-3 bg-dark-gray flex flex-col justify-center items-center gap-3 group hover:bg-[#1f1e1e] bg-[#111] transition duration-300",
        !className?.includes("w-") && "w-fit" // fallback to w-fit only if no width is passed
      )}    
      >
      {typeof icon === "string" ? (
        <div
          style={{width: `${24 * icon_scale}px`, height: `${24 * icon_scale}px`}} 
          className="flex items-center justify-center transition group-hover:-translate-y-[2px] group-hover:drop-shadow-[0_0_8px_#FF5666,0_0_16px_#FF5666] duration-300">
          <Image
            priority={true}
            alt={text ?? ""}
            width={24 * icon_scale}
            height={24 * icon_scale}
            className={"object-cover"}
            src={icon}
          />
        </div>
      ) : (
        <span className="text-2xl">{icon}</span>
      )}
      <span className="text-l font-light text-center">{text}</span>
    </a>
  );
}