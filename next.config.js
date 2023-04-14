const withTM = require("next-transpile-modules")(["lit-share-modal-v3"]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.ppv.arvrtise.com"],
  },
});

module.exports = nextConfig;
