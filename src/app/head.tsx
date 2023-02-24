export default function Head() {
  const GOOGLE_ANALYTICS = "G-J3SVSHNDTE";

  return (
    <>
      <title>Gmanio | Application</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="powered by React" />
      <meta name="keywords" content="GMAN.IO, JIMAN PARK" />
      <meta name="robots" content="index, follow" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content={"#189cc4"} />
      <meta name="apple-mobile-web-app-title" content="GMAN.IO" />
      <meta name="theme-color" content={"#189cc4"} />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS}`}
      />
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
    </>
  )
}
