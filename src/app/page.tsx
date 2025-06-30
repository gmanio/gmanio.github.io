"use client";

import TypedTypography from "@/components/TypedTypography";
import Typed from "typed.js";
// import Image from "next/image";

type TypingProps = Typed & { cursor?: Element };

export default function Home() {
  const handleCompleteTyping =
    (_completeStep: number) => (self: TypingProps) => {
      if (self && self.cursor) {
        self.cursor.remove();
      }
      console.log(_completeStep);
      // setStep(completeStep + 1);
      // self.destroy();
    };
  return (
    <div className="gman">
      <div className="flex flex-col items-start min-h-dvh p-8 font-[family-name:var(--font-geist-sans)]">
        <TypedTypography
          text={[
            "There’s no fruit that you can get without time and effort. \n The future depends on what we do in the present. \n Do not waste your time. \n Cherish this moment.",
          ]}
          onComplete={handleCompleteTyping(0)}
        />
      </div>
    </div>
  );
}
