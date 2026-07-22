import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = {
  id: string;
  /** Two-digit index rendered in the mono label, e.g. "01". */
  index: string;
  title: string;
  children: ReactNode;
};

/**
 * Shared shell for every content section: numbered mono label, a hairline rule,
 * then the content. Keeps vertical rhythm identical across the page.
 */
const Section = ({ id, index, title, children }: SectionProps) => {
  return (
    <section id={id} className="content-column scroll-mt-24 py-16 md:py-24">
      <Reveal>
        <div className="mb-10 flex items-baseline gap-3 border-b border-border pb-4">
          <span className="section-label">{index}</span>
          <span className="section-label">/</span>
          <h2 className="section-label text-foreground">{title}</h2>
        </div>
      </Reveal>
      {children}
    </section>
  );
};

export default Section;
