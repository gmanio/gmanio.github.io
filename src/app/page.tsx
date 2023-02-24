"use client";
// import Image from 'next/image'
// import { Inter } from "next/font/google";
import TypedTypography from "./components/TypedTypograpy";
import styles from "./page.module.css";
import Typed from "typed.js";
import { useState } from "react";

// const inter = Inter({ subsets: ["latin"] });

type TypingProps = Typed & { cursor?: Element };

const Home = () => {
  const [step, setStep] = useState(0);
  const handleCompleteTyping =
    (completeStep: number) => (self: TypingProps) => {
      if (self && self.cursor) {
        self.cursor.remove();
      }

      setStep(completeStep + 1);
      // self.destroy();
    };

  return (
    <main className={styles.main}>
      <div className={[styles.glitch_text, "flex w-full flex-col"].join(' ')}>
        {step >= 0 && (
          <TypedTypography
            text={[
              "There’s no fruit that you can get without time and effort.",
              "The future depends on what we do in the present."
            ]}
            onComplete={handleCompleteTyping(0)}
          />
        )}
        {step >= 1 && (
          <TypedTypography
            text={["Do you love life? Then don't waste your time."]}
            onComplete={handleCompleteTyping(1)}
          />
        )}
        {step >= 2 && (
          <TypedTypography
            text={["Cherish this moment."]}
            onComplete={handleCompleteTyping(2)}
          />
        )}
        {/* <span className={[styles.glitch_text, 'text'].join(' ')}>glitch text</span> */}
      </div>
    </main>
  );
};

export default Home;
