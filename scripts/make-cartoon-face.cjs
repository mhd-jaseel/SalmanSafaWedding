// Cuts the head (hair + face + beard) out of Salman's cartoon portrait.
// Background (white / light-grey brush) is removed with a flood fill from the
// crop border, so enclosed whites (teeth, eyes) are kept. Neck/turtleneck is
// trimmed with a soft oval. Output: src/assets/salman-face.png
const sharp = require('sharp')
const SRC = 'scripts/salman-cartoon-source.webp'
const R = { left: 420, top: 18, width: 372, height: 446 }
;(async () => {
  const { data, info } = await sharp(SRC).extract(R).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const W = info.width, H = info.height
  const isBg = (i) => {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b)
    return mx > 165 && (mx - mn) < 26 // white or light grey, unsaturated
  }
  const bg = new Uint8Array(W * H)
  const stack = []
  const push = (x, y) => { if (x < 0 || y < 0 || x >= W || y >= H) return; const p = y * W + x; if (bg[p]) return; if (!isBg(p * 4)) return; bg[p] = 1; stack.push(p) }
  for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1) }
  for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y) }
  while (stack.length) { const p = stack.pop(); const x = p % W, y = (p / W) | 0; push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1) }
  // soften: alpha = 1 - (share of bg pixels in a 5x5 window)
  const cx = W / 2 + 2, cy = 212, rx = 188, ry = 197 // oval that trims the neck
  const out = Buffer.from(data)
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let n = 0, s = 0
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; n++; s += bg[yy * W + xx] }
    const key = 1 - s / n
    const e = Math.hypot((x - cx) / rx, (y - cy) / ry)
    const head = Math.max(0, Math.min(1, (1 - e) / 0.05))
    // narrow chin shape that follows the beard edge (y≈398 at the sides, y≈424 centre): keeps the whole chin, no neck sides
    const ec = Math.hypot((x - 188) / 88, (y - 360) / 64)
    const chin = Math.max(0, Math.min(1, (1 - ec) / 0.06))
    const oval = Math.max(head, chin)
    out[(y * W + x) * 4 + 3] = Math.round(255 * key * oval)
  }
  await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().resize(240).webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile('src/assets/salman-face.webp')
  console.log('size', W, H)
})()
