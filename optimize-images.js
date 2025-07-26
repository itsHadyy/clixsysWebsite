const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration for image optimization
const imageConfigs = {
  'img01.webp': { width: 600, height: 400, quality: 80 },
  'img02.webp': { width: 300, height: 375, quality: 80 },
  'img03.webp': { width: 300, height: 375, quality: 80 },
  'img04.webp': { width: 600, height: 400, quality: 80 },
  'img05.webp': { width: 300, height: 375, quality: 80 },
  'img07.webp': { width: 300, height: 375, quality: 80 },
  'mechanism.webp': { width: 600, height: 400, quality: 80 },
  'logo02.jpg': { width: 810, height: 493, quality: 85 }
};

// Responsive sizes to generate
const responsiveSizes = [
  { suffix: '-300', width: 300 },
  { suffix: '-600', width: 600 }
];

async function optimizeImage(inputPath, outputPath, config) {
  try {
    await sharp(inputPath)
      .resize(config.width, config.height, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: config.quality })
      .toFile(outputPath);
    
    console.log(`✅ Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

async function createResponsiveVariants(inputPath, baseName) {
  const inputDir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const nameWithoutExt = path.basename(inputPath, ext);
  
  for (const size of responsiveSizes) {
    const outputPath = path.join(inputDir, `${nameWithoutExt}${size.suffix}${ext}`);
    
    try {
      await sharp(inputPath)
        .resize(size.width, null, { 
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`✅ Created responsive variant: ${path.basename(outputPath)}`);
    } catch (error) {
      console.error(`❌ Error creating variant for ${inputPath}:`, error.message);
    }
  }
}

async function optimizeAllImages() {
  const mediaDir = path.join(__dirname, 'public', 'media', 'slider');
  const publicDir = path.join(__dirname, 'public');
  
  console.log('🚀 Starting image optimization...\n');
  
  // Optimize slider images
  for (const [filename, config] of Object.entries(imageConfigs)) {
    if (filename === 'logo02.jpg') continue; // Handle logo separately
    
    const inputPath = path.join(mediaDir, filename);
    const outputPath = path.join(mediaDir, `optimized-${filename}`);
    
    if (fs.existsSync(inputPath)) {
      await optimizeImage(inputPath, outputPath, config);
      await createResponsiveVariants(inputPath, filename);
    } else {
      console.log(`⚠️  File not found: ${inputPath}`);
    }
  }
  
  // Optimize logo
  const logoInputPath = path.join(publicDir, 'logo02.jpg');
  const logoOutputPath = path.join(publicDir, 'logo02-optimized.jpg');
  
  if (fs.existsSync(logoInputPath)) {
    await optimizeImage(logoInputPath, logoOutputPath, imageConfigs['logo02.jpg']);
    await createResponsiveVariants(logoInputPath, 'logo02.jpg');
  } else {
    console.log(`⚠️  Logo file not found: ${logoInputPath}`);
  }
  
  console.log('\n🎉 Image optimization complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Replace original images with optimized versions');
  console.log('2. Update image paths in components to use responsive variants');
  console.log('3. Test the website to ensure images load correctly');
}

// Run the optimization
optimizeAllImages().catch(console.error); 