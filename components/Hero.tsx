import { profile, socials } from "@/data";
import Reveal from "./ui/Reveal";

const Hero = () => {
  return (
    <section id="top" className="content-column pb-8 pt-20 md:pb-16 md:pt-32">
      <Reveal>
        <p className="section-label">{profile.role}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="mt-6 text-4xl font-medium tracking-tight text-foreground md:text-5xl">
          {profile.name}
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          {profile.intro}
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <p className="mt-8 font-mono text-xs text-muted-foreground">
          {profile.location}
        </p>
      </Reveal>

      <Reveal delay={0.32}>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs">
          <a
            href={`mailto:${profile.email}`}
            className="link-underline inline-block py-1.5"
          >
            Email
          </a>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-block py-1.5"
            >
              {social.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default Hero;
