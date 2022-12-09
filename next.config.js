/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "hitech.mn",
      "api.hitech.mn",
      "m.media-amazon.com",
      "hitech-bc-brands.s3.ap-southeast-1.amazonaws.com",
      "hitech-bc-main.s3.ap-southeast-1.amazonaws.com",
      "hitech-bc-banners.s3.ap-southeast-1.amazonaws.com",
      "hitech-bc-avatars.s3.ap-southeast-1.amazonaws.com",
      "hitech-bc-categories.s3.ap-southeast-1.amazonaws.com",
      "hitech-bc-description.s3.ap-southeast-1.amazonaws.com",
      "hitech-marketing.s3.ap-southeast-1.amazonaws.com",
      "alpha.hitech.mn",
    ],
  },
};

module.exports = nextConfig;
