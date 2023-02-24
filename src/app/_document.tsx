import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  const GOOGLE_ANALYTICS = "G-Y1S2JZE6CT";
  return (
    <Html lang="ko">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86"
        />
        {/* <meta name="google-site-verification" content="BqHm9ab-8RfRIypjBp2KH3cZ51nu1ctPctMwHgY5c6w"/> */}
        <title>Gmanio | Application</title>
        <meta name="description" content="powered by React" />
        <meta name="keywords" content="GMAN.IO, JIMAN PARK" />
        <meta name="robots" content="index, follow" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content={"#189cc4"}
        />
        <meta name="apple-mobile-web-app-title" content="GMAN.IO" />
        <meta name="theme-color" content={"#189cc4"} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS}');
        `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
