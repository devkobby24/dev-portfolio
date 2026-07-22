import { FiArrowUpRight } from "react-icons/fi";
import { projects, type Project } from "@/data";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

const formatIndex = (position: number) => String(position + 1).padStart(2, "0");

type ProjectLink = {
  label: string;
  href: string;
};

const collectLinks = (project: Project): ProjectLink[] => {
  const links: ProjectLink[] = [];

  if (project.liveLink) {
    links.push({ label: "Live", href: project.liveLink });
  }
  if (project.sourceLink) {
    links.push({ label: "Source", href: project.sourceLink });
  }

  return links;
};

const Work = () => {
  return (
    <Section id="work" index="02" title="Selected work">
      <ul className="-mt-2">
        {projects.map((project, projectIndex) => {
          const links = collectLinks(project);
          const headingHref = project.liveLink ?? project.sourceLink;

          return (
            <li key={project.title}>
              <Reveal delay={projectIndex * 0.06}>
                <article className="border-b border-border py-7">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatIndex(projectIndex)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-lg font-medium tracking-tight text-foreground">
                          {headingHref ? (
                            <a
                              href={headingHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-1.5 transition-colors hover:text-link"
                            >
                              {project.title}
                              <FiArrowUpRight
                                aria-hidden="true"
                                className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-link"
                              />
                            </a>
                          ) : (
                            project.title
                          )}
                        </h3>
                        <span className="shrink-0 font-mono text-xs text-muted-foreground">
                          {project.year}
                        </span>
                      </div>

                      <p className="mt-1.5 text-sm text-foreground/80">
                        {project.tagline}
                      </p>

                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                        <p className="font-mono text-xs text-muted-foreground/80">
                          {project.tech.join(" · ")}
                        </p>

                        <div className="flex items-center gap-4">
                          {links.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-link"
                            >
                              {link.label} ↗
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default Work;
