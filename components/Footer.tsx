import { profile } from "@/data";

const Footer = () => {
  return (
    <footer className="content-column border-t border-border py-10">
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {profile.fullName}
        </p>
        <a href="#top" className="inline-block py-1.5 transition-colors hover:text-foreground">
          Back to top
        </a>
      </div>
    </footer>
  );
};

export default Footer;
