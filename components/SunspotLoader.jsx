export function SunspotLoader({
  style,
  className,
  desktopSize = "228px",
  mobileSize = "100px",
}) {
  const size =
    typeof window !== "undefined" && window.innerWidth < 768
      ? mobileSize
      : desktopSize;

  return (
    <div
      className={`sunspot-loader${className ? ` ${className}` : ""}`}
      style={{
        minHeight: size,
        ...style,
      }}
      aria-label="Loading"
      role="status"
    >
      <div
        className="sunspot-loader-spinner"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
}
