import Link from "next/link";
import { ViewTransition } from "react";

interface ProjectLinkProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  transitionName: string;
  href: string;
}

export const ProjectLink = ({
  title,
  description,
  icon,
  transitionName,
  href,
}: ProjectLinkProps) => {
  return (
    <Link
      href={href}
      className="group bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
          {icon}
        </div>
        <div>
          <ViewTransition name={transitionName}>
            <h2 className="text-xl font-semibold text-white mb-2 ">{title}</h2>
          </ViewTransition>
          <p className="text-gray-400 text-sm ">{description}</p>
        </div>
      </div>
    </Link>
  );
};
