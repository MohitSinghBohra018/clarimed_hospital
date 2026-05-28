import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SitemapStream, streamToPromise } from 'sitemap';

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Change this to your live domain name
const BASE_URL = 'https://clarimedhealthcare.com'; 
const BASENAME = '/'; // Matches your React basename

// 2. Your exact routes from App.jsx
const staticRoutes = [
  '/',
  '/best-weight-loss-doctor-india',
  '/best-cardiac-hospital-india',
  '/consultation-form',
  '/vision-mission',
  '/value',
  '/our-teams',
  '/news-events',
  '/patient-stories',
  '/get-quote',
  '/testimonials',
  '/blogs',
  '/faqs',
  '/contact-us',
  '/terms-condition',
  '/privacy-policy',
  '/carrier',
  '/all-packages'
];

async function generateSitemap() {
  try {
    const stream = new SitemapStream({ hostname: BASE_URL });

    staticRoutes.forEach((route) => {
      stream.write({
        url: `${BASENAME}${route}`.replace('//', '/'), 
        changefreq: route === '/' ? 'daily' : 'weekly',
        priority: route === '/' ? 1.0 : 0.7,
      });
    });

    stream.end();

    const sitemapOutput = await streamToPromise(stream);
    
    // Target the public folder
    const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
    fs.writeFileSync(outputPath, sitemapOutput.toString());

    console.log('✅ Success! sitemap.xml created in your public folder.');
  } catch (error) {
    console.error('❌ Error building sitemap:', error);
  }
}

generateSitemap();