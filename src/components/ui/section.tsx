type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  title: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  headingClassName?: string;
};

/**
 *
 * TODO: add support for subheading as well.
 */
export const Section = ({
  title,
  children,
  tag: Tag = "h2",
  headingClassName = "text-2xl font-bold mb-4",
  ...props
}: SectionProps) => {
  const cleanId = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <section {...props} aria-labelledby={cleanId}>
      <Tag id={cleanId} className={headingClassName}>
        {title}
      </Tag>
      {children}
    </section>
  );
};
