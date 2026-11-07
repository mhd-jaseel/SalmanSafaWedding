// Cuts Salman's head (hair + face + beard) out of the photo, removes the wall
// behind it (colour key) and feathers the edge. Output: src/assets/salman-face.png
const sharp = require('sharp')
const SRC = process.argv[2] || 'scripts/salman-source.webp'
const R = { left: 228, top: 222, width: 130, height: 152 } // head region in the photo
const SCALE = 3
;(async () => {
  const W = R.width * SCALE, H = R.height * SCALE
  const { data } = await sharp(SRC).extract(R).resize(W, H, { kernel: 'lanczos3' })
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  // wall colour = average of the two top corners
  const avg = (x0, y0) => { let r = 0, g = 0, b = 0, n = 0
    for (let y = y0; y < y0 + 18; y++) for (let x = x0; x < x0 + 18; x++) { const i = (y * W + x) * 4; r += data[i]; g += data[i + 1]; b += data[i + 2]; n++ }
    return [r / n, g / n, b / n] }
  const a = avg(3, 3), c = avg(W - 21, 3), wall = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2, (a[2] + c[2]) / 2]
  const cx = 65 * SCALE, cy = 77 * SCALE, rx = 60 * SCALE, ry = 74 * SCALE
  const clamp = (v) => Math.max(0, Math.min(1, v))
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4
    const d = Math.hypot(data[i] - wall[0], data[i + 1] - wall[1], data[i + 2] - wall[2])
    const key = clamp((d - 20) / 26)
    const e = Math.hypot((x - cx) / rx, (y - cy) / ry)
    const oval = clamp((1 - e) / 0.07)
    data[i + 3] = Math.round(255 * key * oval)
  }
  await sharp(data, { raw: { width: W, height: H, channels: 4 } }).png().toFile('src/assets/salman-face.png')
  console.log('wall', wall.map(Math.round), 'size', W, H)
})()
