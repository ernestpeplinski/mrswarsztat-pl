/**
 * Generuje grafikę Open Graph 1200×630 (public/img/og-default.png) z logo i krótkim tekstem.
 * Uruchom po zmianie logo, telefonu lub opisu:  node scripts/generate-og.mjs
 * Tekst jest renderowany z fontów systemowych, więc po wygenerowaniu obejrzyj wynik.
 */
import sharp from 'sharp';

const W = 1200;
const H = 630;
const LOGO = 'src/assets/images/mrs-logo.png';
const OUT = 'public/img/og-default.png';

// Logo ma wbudowane kwadratowe tło – wygaszamy je okrągłą maską (jak .logo-fade na stronie).
const logoSize = H;
const mask = Buffer.from(
  `<svg width="${logoSize}" height="${logoSize}"><defs><radialGradient id="g" cx="50%" cy="50%" r="50%">
     <stop offset="88%" stop-color="#fff"/><stop offset="100%" stop-color="#000"/></radialGradient></defs>
     <rect width="100%" height="100%" fill="url(#g)"/></svg>`,
);
const logo = await sharp(LOGO)
  .resize(logoSize, logoSize)
  .composite([{ input: await sharp(mask).png().toBuffer(), blend: 'dest-in' }])
  .png()
  .toBuffer();

const font = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const text = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="610" y="190" width="64" height="6" fill="#ea020a"/>
  <text x="610" y="270" font-family="${font}" font-size="52" font-weight="800" fill="#f6efd9">Wulkanizacja</text>
  <text x="610" y="338" font-family="${font}" font-size="52" font-weight="800" fill="#f6efd9">Klimatyzacja</text>
  <text x="610" y="406" font-family="${font}" font-size="52" font-weight="800" fill="#f6efd9">Mechanika</text>
  <text x="610" y="468" font-family="${font}" font-size="28" fill="#f6efd9" fill-opacity="0.75">Kaliska Kościerskie, koło Kościerzyny</text>
  <rect x="610" y="506" width="330" height="62" rx="10" fill="#ea020a"/>
  <text x="775" y="548" text-anchor="middle" font-family="${font}" font-size="32" font-weight="800" fill="#fff">727 470 300</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: '#0b0b0c' } })
  .composite([
    { input: logo, left: 0, top: 0 },
    { input: text, left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`Zapisano ${OUT} (${W}×${H})`);
