/** next.config.js
 * For GitHub Pages project site at /portfolio-for-data-analyst/
 * - basePath and assetPrefix make absolute paths work under /REPO
 * - images.unoptimized disables Next's optimizer so <Image> renders plain URLs
 *
 * Note: Deploying to Vercel is still recommended for full Next features.
 */
const repo = 'portfolio-for-data-analyst';

module.exports = {
  basePath: process.env.NODE_ENV === 'production' ? `/${repo}` : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? `/${repo}/` : '',
  images: {
    unoptimized: true,
  },
};
