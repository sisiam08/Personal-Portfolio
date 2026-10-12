interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <header
      className={`flex flex-col gap-5 ${
        centered ? "items-center text-center" : "items-start"
      }`}
    >
      <div className="flex items-center gap-3 text-muted">
        <span className="mono-label text-accent">{index}</span>
        <span className="h-px w-10 bg-line-2" />
        <span className="mono-label">{eyebrow}</span>
      </div>
      <h2 className="max-w-3xl text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] text-ink">
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-2xl text-base leading-relaxed text-muted ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
