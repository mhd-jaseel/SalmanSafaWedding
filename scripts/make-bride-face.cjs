// Cuts Safa's face (face + hair line inside the hijab opening) out of her
// picture with a soft oval, upscales it, and saves a small WebP that is
// inlined into the page. Output: src/assets/safa-face.webp
const sharp = require('sharp')
const SRC = process.argv[2] || 'scripts/safa-source.png'
const R = { left: 38, top: 30, width: 94, height: 142 } // face region in the picture
const SCALE = 3
;(async () => {
  const W = R.width * SCALE, H = R.height * SCALE
  const { data } = await sharp(SRC).extract(R).resize(W, H, { kernel: 'lanczos3' }).sharpen({ sigma: 0.7 })
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const cx = 47 * SCALE, cy = 73 * SCALE, rx = 43 * SCALE, ry = 66.5 * SCALE
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const e = Math.hypot((x - cx) / rx, (y - cy) / ry)
    data[(y * W + x) * 4 + 3] = Math.round(255 * Math.max(0, Math.min(1, (1 - e) / 0.06)))
  }
  const out = sharp(data, { raw: { width: W, height: H, channels: 4 } })
  await out.clone().webp({ quality: 84, alphaQuality: 90, effort: 6 }).toFile('src/assets/safa-face.webp')
  // skin sample for hands / neck
  const i = ((cy + 25 * SCALE) * W + (cx - 22 * SCALE)) * 4
  console.log('size', W, H, 'cheek rgb', data[i], data[i + 1], data[i + 2])
})()
