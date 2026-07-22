import { profile, socials } from "@/data";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

const Contact = () => {
  return (
    <Section id="contact" index="05" title="Contact">
      <Reveal>
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
          Tell me what you&rsquo;re building. The fastest way to reach me is
          email.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        {/* Sized to fit the narrowest phones on one line; `anywhere` only kicks
            in below that, and wraps at a sane point instead of orphaning a letter. */}
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block wrap-anywhere text-lg font-medium tracking-tight text-foreground transition-colors hover:text-link sm:text-2xl md:text-3xl"
        >
          {profile.email}
        </a>
      </Reveal>

      <Reveal delay={0.16}>
        <ul className="mt-12 space-y-3 border-t border-border pt-8">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-4 py-1.5 font-mono text-xs"
              >
                <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                  {social.label}
                </span>
                <span className="text-muted-foreground transition-colors group-hover:text-link">
                  {social.handle}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
};

export default Contact;
