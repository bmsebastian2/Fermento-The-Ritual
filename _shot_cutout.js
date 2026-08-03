const sharp = require("sharp");

async function cutout(inputPath, outputPath) {
  const img = sharp(inputPath).removeAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const isBg = new Uint8Array(width * height);
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let qHead = 0;
  let qTail = 0;

  function fillable(idx) {
    const o = idx * channels;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    return min >= 200 && max - min <= 12;
  }

  function tryPush(idx) {
    if (visited[idx]) return;
    visited[idx] = 1;
    if (fillable(idx)) {
      isBg[idx] = 1;
      queue[qTail++] = idx;
    }
  }

  for (let x = 0; x < width; x++) {
    tryPush(x);
    tryPush((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    tryPush(y * width);
    tryPush(y * width + (width - 1));
  }

  while (qHead < qTail) {
    const idx = queue[qHead++];
    const x = idx % width;
    const y = (idx / width) | 0;
    if (x > 0) tryPush(idx - 1);
    if (x < width - 1) tryPush(idx + 1);
    if (y > 0) tryPush(idx - width);
    if (y < height - 1) tryPush(idx + width);
  }

  const alpha = Buffer.alloc(width * height);
  for (let i = 0; i < width * height; i++) {
    alpha[i] = isBg[i] ? 0 : 255;
  }

  const blurredResult = await sharp(alpha, { raw: { width, height, channels: 1 } })
    .blur(1.1)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const blurChannels = blurredResult.info.channels;
  const blurred = blurredResult.data;
  const alphaSoft = Buffer.alloc(width * height);
  for (let i = 0; i < width * height; i++) {
    alphaSoft[i] = blurred[i * blurChannels];
  }

  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = data[i * channels];
    rgba[i * 4 + 1] = data[i * channels + 1];
    rgba[i * 4 + 2] = data[i * channels + 2];
    rgba[i * 4 + 3] = alphaSoft[i];
  }

  const out = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 10 })
    .webp({ quality: 82, effort: 6 })
    .toBuffer({ resolveWithObject: true });

  await sharp(out.data).toFile(outputPath);
  return out.info;
}

(async () => {
  const jobs = [
    ["assets/photos/new image/Red Vitality.webp", "public/products/shot-red-vitality-bottle.webp"],
    ["assets/photos/new image/Turmeric Defense.webp", "public/products/shot-tumeric-defense-bottle.webp"],
    ["assets/photos/new image/ShotGinger.jpeg", "public/products/shot-ginger-boost-bottle.webp"],
    ["assets/photos/new image/ShotGreen.jpeg", "public/products/shot-green-detox-bottle.webp"],
  ];
  for (const [input, output] of jobs) {
    const info = await cutout(input, output);
    console.log(output, info.width, info.height, (info.width / info.height).toFixed(4));
  }
})();
