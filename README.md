# use-aria-live

This is a work in progress.

At this moment, the code is only published as a support to another demonstration. Please open a PR with documentation improvements.

## Example

In lieu of documentation, here is a minimal example using all features:

```jsx
import React from "react";
import { useAriaLive, PoliteAriaLive, AssertiveAriaLive } from "../index";

function Subject(props) {
  // removes messages after a default of 5 seconds
  let [politeAnnouncement, announcePolitely] = useAriaLive();
  // removes message after 6 seconds
  let [assertiveAnnouncement, announceAssertively] = useAriaLive(6_000);

  return (
    <>
      <p>
        The buttons below create messages that are only visible to users of
        assitive technologies like screen readers.
      </p>
      <p>
        Open the <strong>Aria Live Regions</strong> Panel tab to see announced
        text.
      </p>

      <button
        type="button"
        onClick={() => announcePolitely("Item added, politely")}
      >
        Announce "Item added, politely".
      </button>
      <br />
      <button
        type="button"
        onClick={() => announceAssertively("Item added, assertively")}
      >
        Announce "Item added, assertively".
      </button>

      <PoliteAriaLive>{politeAnnouncement}</PoliteAriaLive>
      <AssertiveAriaLive>{assertiveAnnouncement}</AssertiveAriaLive>
    </>
  );
}
```

## Guidance

I'm new to accessibility but my friend [Ben Myers]() knows quite a bit. This is what they have to say:

> I work off of two key guidelines:
>
> 1. The live region must be on the page at all times. Per specs, just inserting a new live region with the contents you want announced shouldn't necessarily work, but some SRs support it out of necessity. My guidance is that once your live region mounts, there's no good reason for it to unmount.
>
> 2. Announcements tend to follow user interactions, for the most part. Yes, there are reasons why system-level processes might lead to something changing that would need to be announced, but these are rare — and if those announcements aren't rare, consider whether each update therein is actually meaningful, or if it's just noise. Anyways, because most of your announcements follow user interactions, you're highly unlikely to actually have conflicting announcements — users can't do two things at once, at least not fast enough for it to matter.
>
> So my guidance tends to be have exactly one assertive region and exactly one polite region. Stick them in the root component of your app, and don't conditionally render them. Having one of each and having them continue to exist on the page once mounted means less finagling with a11y properties that might throw off a SR

## Resources

[Aria Live Regions Storybook Addon](https://storybook.js.org/addons/aria-live-storybook-addon/)
[ARIA Live regions on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)

## Acknowledgements

Big thanks to my friend [Ben Myers](https://mobile.twitter.com/BenDMyers) for answering all my accessibility questions with thoughtfulness, interest, and great follow-up resources. Watch their weekly Twitch stream, [Some Antics](https://www.twitch.tv/someanticsdev), on accessibility and standard web technologies.
