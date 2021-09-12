/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: "ALLOW-FROM https://m.apply.lh.or.kr"
  }
];

module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};
