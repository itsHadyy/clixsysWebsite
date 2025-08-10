const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const inputLogo = path.join(__dirname, 'public', 'icon.png');
  const outputDir = path.join(__dirname, 'public');

  try {
    // Check if logo exists
    if (!fs.existsSync(inputLogo)) {
      console.error('Logo file not found:', inputLogo);
      return;
    }

    console.log('Generating favicons from:', inputLogo);

    // Generate favicon.ico (16x16)
    await sharp(inputLogo)
      .resize(16, 16)
      .png()
      .toFile(path.join(outputDir, 'favicon-16x16.png'));

    // Generate favicon-32x32.png
    await sharp(inputLogo)
      .resize(32, 32)
      .png()
      .toFile(path.join(outputDir, 'favicon-32x32.png'));

    // Generate apple-touch-icon.png (180x180)
    await sharp(inputLogo)
      .resize(180, 180)
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));

    // Generate android-chrome-192x192.png
    await sharp(inputLogo)
      .resize(192, 192)
      .png()
      .toFile(path.join(outputDir, 'android-chrome-192x192.png'));

    // Generate android-chrome-512x512.png
    await sharp(inputLogo)
      .resize(512, 512)
      .png()
      .toFile(path.join(outputDir, 'android-chrome-512x512.png'));

    // Create a simple favicon.ico (16x16)
    // Note: sharp doesn't support .ico format directly, so we'll create a 16x16 PNG and rename it
    await sharp(inputLogo)
      .resize(16, 16)
      .png()
      .toFile(path.join(outputDir, 'favicon.ico'));

    console.log('✅ All favicon files generated successfully!');
    console.log('Generated files:');
    console.log('- favicon.ico');
    console.log('- favicon-16x16.png');
    console.log('- favicon-32x32.png');
    console.log('- apple-touch-icon.png');
    console.log('- android-chrome-192x192.png');
    console.log('- android-chrome-512x512.png');

  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

// Run the script
generateFavicons();
