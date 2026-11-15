import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
const directory = "public/images";
let before = 0,
  after = 0;
for (const name of await fs.readdir(directory)) {
  if (!/\.(png|jpg)$/.test(name)) continue;
  const file = path.join(directory, name);
  const input = await fs.readFile(file);
  before += input.length;
  const width = name === "hero.jpg" ? 1792 : name.startsWith("group-") ? 360 : 1000;
  let image = sharp(input).rotate().resize({ width, withoutEnlargement: true });
  image = name.endsWith(".png")
    ? image.png({ palette: true, quality: 85, compressionLevel: 9 })
    : image.jpeg({ quality: 82, mozjpeg: true });
  const output = await image.toBuffer();
  await fs.writeFile(file, output);
  after += output.length;
}
console.log(
  `Images: ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB.`,
);
