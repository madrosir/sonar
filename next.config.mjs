/** @type {import('next').NextConfig} */
const nextConfig = {
  
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "img.clerk.com" 
        },
        {
          protocol: "https",
          hostname: "utfs.io" 
        },
        {
          protocol: 'https',
          hostname: 'instagram.fpnq13-1.fna.fbcdn.net',
        },
      ],
    },
  };
  
  export default nextConfig;
