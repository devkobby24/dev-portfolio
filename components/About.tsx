import { about } from "@/data";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

const About = () => {
  return (
    <Section id="about" index="01" title="About">
      <div className="space-y-5">
        {about.paragraphs.map((paragraph, paragraphIndex) => (
          <Reveal key={paragraph} delay={paragraphIndex * 0.08}>
            <p className="text-base leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.16}>
        <ul className="mt-10 space-y-3 border-t border-border pt-8">
          {about.focus.map((item) => (
            <li
              key={item}
              className="flex items-baseline gap-4 font-mono text-xs text-muted-foreground"
            >
              <span aria-hidden="true" className="text-border">
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.24}>
        <dl className="mt-8 grid grid-cols-3 gap-x-6 gap-y-4 border-t border-border pt-8">
          {/* Values are bottom-aligned so a label wrapping on narrow screens
              can't knock the numbers out of line with each other. */}
          {about.stats.map((stat) => (
            <div key={stat.label} className="flex h-full flex-col">
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-auto pt-1.5 font-mono text-xl tabular-nums text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
};

export default About;
