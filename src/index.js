import * as React from "react";

let visuallyHidden = {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
};

function useAriaAnnounce(timeout) {
  let [announcement, setAnnouncement] = React.useState(null);

  React.useEffect(() => {
    let latestAnnouncementCooldown = setTimeout(() => {
      setAnnouncement(null);
    }, timeout);

    return () => clearTimeout(latestAnnouncementCooldown);
  }, [announcement]);

  function announce(announcement) {
    setAnnouncement(null);
    setTimeout(() => setAnnouncement(announcement), 10);
  }

  return [announcement, announce];
}

export function AriaLive({ as: As = "div", children, style, ...props }) {
  return (
    <As
      role="status"
      aria-live="polite"
      style={
        typeof style === "function"
          ? style(visuallyHidden)
          : { ...visuallyHidden, ...style }
      }
      {...props}
    >
      {children}
    </As>
  );
}

export function PoliteAriaLive({ ...props }) {
  return <AriaLive {...props} aria-live="polite" />;
}

export function AssertiveAriaLive({ ...props }) {
  return <AriaLive {...props} aria-live="assertive" />;
}
