import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { cn } from "@/lib/utils/utils";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

interface TeamSectionProps {
  data: {
    badge?: string;
    title: string;
    description?: string;
    members: TeamMember[];
    variant?: "v1" | "v2";
  };
  className?: string;
}

export function TeamSection({ data, className }: TeamSectionProps) {
  const variant = data.variant || "v2";

  return (
    <Section className={cn(variant === "v1" ? "bg-[#F8F9FA]" : "bg-white", className)}>
      <Container>
        <SectionHeaderResolver 
              variant={data?.variant} 
          badge={data.badge}
          title={data.title}
          description={data.description}
          align="center"
          className="mb-16"
        />

        {variant === "v1" ? (
          <TeamV1 members={data.members} />
        ) : (
          <TeamV2 members={data.members} />
        )}
      </Container>
    </Section>
  );
}

function TeamV1({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
      {members.map((member) => (
        <div key={member.id} className="group">
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 mb-6 transition-transform duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
            
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                  <FaLinkedin className="size-5" />
                </a>
              )}
              {member.socials.twitter && (
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full bg-white flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-colors duration-200"
                >
                  <FaTwitter className="size-5" />
                </a>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors duration-200">
              {member.name}
            </h3>
            <p className="text-primary font-medium text-sm uppercase tracking-wider mb-4">
              {member.role}
            </p>
            
            <div className="flex items-center gap-4 mt-1">
               {member.socials.linkedin && (
                <a href={member.socials.linkedin} className="text-slate-400 hover:text-blue-600 transition-colors">
                  <FaLinkedin className="size-5" />
                </a>
              )}
              {member.socials.twitter && (
                <a href={member.socials.twitter} className="text-slate-400 hover:text-slate-900 transition-colors">
                  <FaTwitter className="size-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TeamV2({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
      {members.map((member) => (
        <div key={member.id} className="group flex flex-col items-start">
          {/* Image Container */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-100 mb-5">
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
              unoptimized
            />
            
            {/* Subtle Social Icons on Image */}
            <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-900 hover:bg-primary hover:text-white transition-all duration-200 shadow-sm"
                >
                  <FaLinkedin className="size-4" />
                </a>
              )}
              {member.socials.twitter && (
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-900 hover:bg-primary hover:text-white transition-all duration-200 shadow-sm"
                >
                  <FaTwitter className="size-4" />
                </a>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col items-start text-left">
            <h3 className="text-lg font-bold text-slate-900 mb-0.5">
              {member.name}
            </h3>
            <p className="text-primary font-medium text-sm">
              {member.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
