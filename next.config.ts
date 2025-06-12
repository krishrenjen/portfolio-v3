// next.config.js
const nextConfig = {
  images: {
    domains: [
      'krishrenjen.github.io',         // GitHub Pages
      'lh3.googleusercontent.com',     // Google Drive images (when shared correctly)
    ],
  },

  async rewrites() {
    return [
      {
        source: '/resume.pdf',
        destination: 'https://krishrenjen.github.io/portfolio-data/resume.pdf',
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/resume.pdf',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
