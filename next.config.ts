export default {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'], // Add any other domains you need
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        search: ''
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        search: ''
      }
    ]
  }
};
