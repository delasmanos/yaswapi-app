"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

type CrawlWindowProps = {
  title: string;
  text: string;
};

/**
 * Quick and dirty implementation of the Star Wars opening crawl animation.
 * The animation is triggered on component mount and can be restarted by clicking the button.
 * The animation will pause when hovered over, allowing users to read the text at their own pace.
 * The component is designed to be accessible, with screen reader-only content for users who rely on assistive technologies.
 * Not tested except in chrome in desktop mode and emualted iphone SE, so may not work in all browsers or screen sizes. But enough for a showcase of the animation and accessibility features.
 */
export function CrawlWindow({ title, text }: CrawlWindowProps) {
  const [isAnimated, setIsAnimated] = React.useState(true);

  const handleAnimationEnd: React.AnimationEventHandler<HTMLDivElement> = (
    e,
  ) => {
    if (e.animationName === "vertical-marquee") {
      setIsAnimated(false);
    }
  };

  const restartAnimation = () => {
    setIsAnimated(true);
  };

  return (
    <>
      <div className="w-full h-[30vh] bg-black overflow-hidden relative border border-yellow-500/20 rounded-md">
        <div className="max-w-2xl mx-auto">
          <div
            onAnimationEnd={handleAnimationEnd}
            className={cn(
              "flex flex-col  justify-center text-yellow-500 font-bold hover:pause-animation",
              { "motion-safe:animate-vertical-marquee": isAnimated },
            )}
          >
            <h2 className="text-4xl mb-8 mt-4 text-center">{title} </h2>
            <p className="text-xl mt-14 text-center">{text} </p>
          </div>
          {/* Screen Reader Only Content for Accessibility */}
          <div className="sr-only">
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        </div>
      </div>
      <Button
        className="motion-reduce:hidden! mt-4 "
        onClick={restartAnimation}
        disabled={isAnimated}
      >
        {!isAnimated ? "Restart animation" : "Animation running..."}
      </Button>
    </>
  );
}
