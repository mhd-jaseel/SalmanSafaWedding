# Regenerates public/og.png (1200x630 link preview) and public/apple-touch-icon.png.
# Windows only (uses System.Drawing). Edit the text below, then run:
#   powershell -ExecutionPolicy Bypass -File scripts/make-og.ps1
param(
  [string]$Names = 'Salman & Safa',
  [string]$Kicker = 'You are invited to the Nikkah of',
  [string]$Date = 'SUNDAY, 20 DECEMBER 2026',
  [string]$Bismillah = ([string][char]0x0628 + [char]0x0650 + [char]0x0633 + [char]0x0652 + [char]0x0645 + [char]0x0650 + ' ' + [char]0x0627 + [char]0x0644 + [char]0x0644 + [char]0x0651 + [char]0x0670 + [char]0x0647 + [char]0x0650 + ' ' + [char]0x0627 + [char]0x0644 + [char]0x0631 + [char]0x0651 + [char]0x064E + [char]0x062D + [char]0x0652 + [char]0x0645 + [char]0x064E + [char]0x0670 + [char]0x0646 + [char]0x0650 + ' ' + [char]0x0627 + [char]0x0644 + [char]0x0631 + [char]0x0651 + [char]0x064E + [char]0x062D + [char]0x0650 + [char]0x064A + [char]0x0645 + [char]0x0650)
)
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$pub = Join-Path $root 'public'

function C($hex, $a = 255) { $c = [System.Drawing.ColorTranslator]::FromHtml($hex); [System.Drawing.Color]::FromArgb($a, $c) }
function FirstFont([string[]]$names, $size, $style = 'Regular') {
  $installed = (New-Object System.Drawing.Text.InstalledFontCollection).Families.Name
  foreach ($n in $names) { if ($installed -contains $n) { return New-Object System.Drawing.Font($n, $size, [System.Drawing.FontStyle]$style, [System.Drawing.GraphicsUnit]::Pixel) } }
  return New-Object System.Drawing.Font('Georgia', $size, [System.Drawing.FontStyle]$style, [System.Drawing.GraphicsUnit]::Pixel)
}

$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAliasGridFit'; $g.InterpolationMode = 'HighQualityBicubic'

# background: radial emerald
$g.Clear((C '#0a2a2b'))
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse(-300, -260, $W + 600, $H + 520)
$pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
$pgb.CenterColor = (C '#17595a'); $pgb.SurroundColors = @((C '#0a2a2b'))
$pgb.CenterPoint = New-Object System.Drawing.PointF(($W / 2), ($H * 0.45))
$g.FillRectangle($pgb, 0, 0, $W, $H)

# girih pattern (8-point stars)
$pp = New-Object System.Drawing.Pen((C '#d4af6a' 30), 1.2)
for ($y = 0; $y -lt $H + 80; $y += 80) {
  for ($x = 0; $x -lt $W + 80; $x += 80) {
    $g.DrawRectangle($pp, $x + 20, $y + 20, 40, 40)
    $s = $g.Save(); $g.TranslateTransform($x + 40, $y + 40); $g.RotateTransform(45)
    $g.DrawRectangle($pp, -20, -20, 40, 40); $g.Restore($s)
    $g.DrawEllipse($pp, $x + 31, $y + 31, 18, 18)
  }
}
# vignette
$vp = New-Object System.Drawing.Drawing2D.GraphicsPath
$vp.AddEllipse(-200, -170, $W + 400, $H + 340)
$vb = New-Object System.Drawing.Drawing2D.PathGradientBrush($vp)
$vb.CenterColor = [System.Drawing.Color]::FromArgb(0, 0, 0, 0)
$vb.SurroundColors = @([System.Drawing.Color]::FromArgb(200, 4, 20, 20))
$blend = New-Object System.Drawing.Drawing2D.Blend
$blend.Factors = [single[]](1, 0.4, 0, 0); $blend.Positions = [single[]](0, 0.3, 0.6, 1)
$vb.Blend = $blend
$g.FillRectangle($vb, 0, 0, $W, $H)

# double gold frame
$gold = C '#d4af6a'
$g.DrawRectangle((New-Object System.Drawing.Pen($gold, 2)), 28, 28, $W - 56, $H - 56)
$g.DrawRectangle((New-Object System.Drawing.Pen((C '#d4af6a' 110), 1)), 40, 40, $W - 80, $H - 80)
foreach ($pt in @(@(28, 28), @(($W - 28), 28), @(28, ($H - 28)), @(($W - 28), ($H - 28)))) {
  $s = $g.Save(); $g.TranslateTransform($pt[0], $pt[1]); $g.RotateTransform(45)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($gold)), -9, -9, 18, 18); $g.Restore($s)
}

$center = New-Object System.Drawing.StringFormat
$center.Alignment = 'Center'; $center.LineAlignment = 'Center'

# glow behind names
$gp = New-Object System.Drawing.Drawing2D.GraphicsPath
$gp.AddEllipse(($W / 2 - 420), 200, 840, 260)
$gb = New-Object System.Drawing.Drawing2D.PathGradientBrush($gp)
$gb.CenterColor = (C '#d4af6a' 70); $gb.SurroundColors = @((C '#d4af6a' 0))
$g.FillEllipse($gb, ($W / 2 - 420), 200, 840, 260)

# bismillah
$fa = FirstFont @('Amiri', 'Traditional Arabic', 'Arabic Typesetting', 'Segoe UI', 'Times New Roman') 44
$g.DrawString($Bismillah, $fa, (New-Object System.Drawing.SolidBrush($gold)), (New-Object System.Drawing.RectangleF(0, 70, $W, 80)), $center)

# kicker
$fk = FirstFont @('Cormorant Garamond', 'Garamond', 'Palatino Linotype', 'Georgia') 40 'Italic'
$g.DrawString($Kicker, $fk, (New-Object System.Drawing.SolidBrush((C '#e9d5a6'))), (New-Object System.Drawing.RectangleF(0, 160, $W, 60)), $center)

# names (gold gradient)
$fn = FirstFont @('Great Vibes', 'Edwardian Script ITC', 'Palace Script MT', 'Gabriola') 150
$nameRect = New-Object System.Drawing.RectangleF(0, 215, $W, 200)
$lg = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.PointF(0, 250)), (New-Object System.Drawing.PointF(0, 400)), (C '#fff4d6'), (C '#b48c47'))
$g.DrawString($Names, $fn, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(110, 0, 0, 0))), (New-Object System.Drawing.RectangleF(4, 221, $W, 200)), $center)
$g.DrawString($Names, $fn, $lg, $nameRect, $center)

# divider
$lp = New-Object System.Drawing.Pen((C '#d4af6a' 170), 1.5)
$g.DrawLine($lp, ($W / 2 - 220), 450, ($W / 2 - 24), 450)
$g.DrawLine($lp, ($W / 2 + 24), 450, ($W / 2 + 220), 450)
$s = $g.Save(); $g.TranslateTransform(($W / 2), 450); $g.RotateTransform(45)
$g.FillRectangle((New-Object System.Drawing.SolidBrush($gold)), -7, -7, 14, 14); $g.Restore($s)

# date
$fd = FirstFont @('Poppins', 'Segoe UI', 'Arial') 30
$g.DrawString($Date, $fd, (New-Object System.Drawing.SolidBrush((C '#e9d5a6'))), (New-Object System.Drawing.RectangleF(0, 475, $W, 60)), $center)

$bmp.Save((Join-Path $pub 'og.png'), [System.Drawing.Imaging.ImageFormat]::Png)

# apple-touch-icon (180x180): crop of the monogram style
$ic = New-Object System.Drawing.Bitmap(180, 180)
$ig = [System.Drawing.Graphics]::FromImage($ic)
$ig.SmoothingMode = 'AntiAlias'; $ig.TextRenderingHint = 'AntiAliasGridFit'
$ig.Clear((C '#0f3d3e'))
$ig.DrawEllipse((New-Object System.Drawing.Pen($gold, 3)), 18, 18, 144, 144)
$ig.DrawEllipse((New-Object System.Drawing.Pen((C '#d4af6a' 110), 1)), 26, 26, 128, 128)
$ini = ($Names.Split('&') | ForEach-Object { $_.Trim()[0] }) -join ''
$fi = FirstFont @('Great Vibes', 'Edwardian Script ITC', 'Palace Script MT', 'Gabriola') 84
$ig.DrawString($ini, $fi, (New-Object System.Drawing.SolidBrush($gold)), (New-Object System.Drawing.RectangleF(0, 0, 180, 186)), $center)
$ic.Save((Join-Path $pub 'apple-touch-icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose(); $bmp.Dispose(); $ig.Dispose(); $ic.Dispose()
Write-Output 'Wrote public/og.png and public/apple-touch-icon.png'
