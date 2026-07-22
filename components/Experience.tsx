import { experience } from "@/data";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

const Experience = () => {
  return (
    <Section id="experience" index="03" title="Experience">
      <ul className="-mt-2">
        {experience.map((entry, entryIndex) => (
          <li key={`${entry.company}-${entry.role}`}>
            <Reveal delay={entryIndex * 0.06}>
              <div className="border-b border-border py-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-medium tracking-tight text-foreground">
                    {entry.role}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {entry.period}
                  </span>
                </div>

                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {entry.company}
                </p>

                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Experience;
