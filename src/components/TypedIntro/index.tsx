import Typed from 'typed.js';
import { useEffect, useRef } from 'react';

const TypedIntro = ({ text, onComplete }: { text: string[]; onComplete: (Self: Typed) => void }) => {
  const wrapperEl = useRef(null);

  useEffect(() => {
    const typed = new Typed(wrapperEl.current || '', {
      strings: text, // Strings to display
      // Speed settings, try diffrent values untill you get good results
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 80,
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
    <div className="flex text-5xl">
      <span ref={wrapperEl}></span>
    </div>
  );
};

export default TypedIntro;
