"use client";

import Typed from "typed.js";
import { useEffect, useRef } from "react";

type Props = {
  text: string[];
  onComplete: (self: Typed & { cursor?: Element }) => void;
};

const TypedTypography = ({ text, onComplete }: Props) => {
  const wrapperEl = useRef(null);

  useEffect(() => {
    const typed = new Typed(wrapperEl.current || "", {
      strings: text, // Strings to display
      // Speed settings, try diffrent values untill you get good results
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 80,
      showCursor: false,
      // loop: true,
      // loopCount: Infinity,
      // onComplete: (self: any) => {
      //   if (self && self.cursor) {
      //     self.cursor.remove();
      //   }
      // },
      onComplete: onComplete,
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div
      className="flex text-4xl whitespace-pre-line "
      style={{ fontFamily: "Caveat" }}
    >
      <span ref={wrapperEl} className="glitch_text"></span>
    </div>
  );
};

export default TypedTypography;
