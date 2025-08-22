/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google
      "avatars.githubusercontent.com", // GitHub
      "platform-lookaside.fbsbx.com", // Facebook
      "res.cloudinary.com",              // Cloudinary images
    ],
  }
};
export default nextConfig;