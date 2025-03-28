const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  images: {
    domains: [
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'nhbkhang.github.io',
      'celadonbooks.com',
      'i.kym-cdn.com',
      'img.weddingbazaar.com',
      'i0.wp.com',
      'i.imgflip.com',
      'media.licdn.com',
      'www.vietnamworks.com',
      'cdn-icons-png.flaticon.com',
      'media.hanoitimes.vn',
      'du0ulnyus7r80.cloudfront.net',
      'www.cisco.com',
      'img.freepik.com'
    ],
  },
  async redirects() {
    return [];
  },
};
