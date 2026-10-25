import Image from "next/image";

type BrandWordmarkProps = {
  className?: string;
  layout?: "inline" | "stack";
  priority?: boolean;
  wordmarkClassName?: string;
};

export default function BrandWordmark({
  className = "",
  layout = "inline",
  priority = false,
  wordmarkClassName = "",
}: BrandWordmarkProps) {
  const stacked = layout === "stack";

  return (
    <span
      className={`${stacked ? "inline-flex flex-col items-center gap-4" : "inline-flex items-center gap-2"} font-heading font-extrabold uppercase tracking-[0.08em] ${className}`}
    >
      <Image
        src="/assets/logo.png"
        alt="Ultimate Climber"
        width={500}
        height={500}
        priority={priority}
        className={
          stacked
            ? "h-28 w-28 sm:h-40 sm:w-40 md:h-48 md:w-48 object-contain"
            : "h-9 w-9 sm:h-11 sm:w-11 object-contain shrink-0"
        }
      />
      <span className={wordmarkClassName}>
        <span className="text-foreground">Ultimate</span>
        <span className="text-accent"> Climber</span>
      </span>
    </span>
  );
}
