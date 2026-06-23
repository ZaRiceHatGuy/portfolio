from PIL import Image


def make_favicon(source, out, mode, size=32):
    img = Image.open(source).convert('RGBA')
    w, h = img.size
    mask = Image.new('L', (w, h), 0)
    mpx = mask.load()
    src = img.load()

    for y in range(h):
        for x in range(w):
            r, g, b, _a = src[x, y]
            if (r + g + b) / 3 > 40:
                mpx[x, y] = 255

    bbox = mask.getbbox()
    if not bbox:
        return

    cropped = img.crop(bbox)
    cw, ch = cropped.size
    pad = int(max(cw, ch) * 0.12)
    canvas = Image.new('RGBA', (cw + pad * 2, ch + pad * 2), (0, 0, 0, 0))
    cpx = canvas.load()
    csrc = cropped.load()

    for y in range(ch):
        for x in range(cw):
            r, g, b, _a = csrc[x, y]
            if (r + g + b) / 3 > 40:
                cpx[x + pad, y + pad] = (0, 0, 0, 255) if mode == 'light' else (255, 255, 255, 255)

    side = max(canvas.size)
    square = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    ox = (side - canvas.size[0]) // 2
    oy = (side - canvas.size[1]) // 2
    square.paste(canvas, (ox, oy))
    square.resize((size, size), Image.Resampling.LANCZOS).save(out)


if __name__ == '__main__':
    base = 'public/images'
    make_favicon(f'{base}/logo.png', f'{base}/favicon-light.png', 'light')
    make_favicon(f'{base}/logo.png', f'{base}/favicon-dark.png', 'dark')
    print('Favicons generated')
