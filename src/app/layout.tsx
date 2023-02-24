'use client'
import { ReactNode } from "react";
import "./globals.css";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ko">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
