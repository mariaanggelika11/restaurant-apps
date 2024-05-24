/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "src/public/images/heros");
const destination = path.resolve(__dirname, "dist/images");

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

fs.readdirSync(target).forEach((image) => {
  const inputPath = path.join(target, image);
  const ext = path.extname(image);
  const name = path.basename(image, ext);
  const largeOutputPath = path.resolve(destination, `${name}-large${ext}`);
  const smallOutputPath = path.resolve(destination, `${name}-small${ext}`);

  sharp(inputPath)
    .metadata()
    .then((metadata) => {
      console.log(`Metadata for ${image}:`, metadata);

      sharp(inputPath)
        .resize(800)
        .toFile(largeOutputPath)
        .then(() => {
          console.log(`Successfully processed ${image} to ${largeOutputPath}`);
        })
        .catch((err) => {
          console.error(`Error processing ${image} to ${largeOutputPath}:`, err);
        });

      sharp(inputPath)
        .resize(480)
        .toFile(smallOutputPath)
        .then(() => {
          console.log(`Successfully processed ${image} to ${smallOutputPath}`);
        })
        .catch((err) => {
          console.error(`Error processing ${image} to ${smallOutputPath}:`, err);
        });
    })
    .catch((err) => {
      console.error(`Error reading metadata for ${image}:`, err);
    });
});
