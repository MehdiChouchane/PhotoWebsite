const fs = require("fs");
const path = require("path");

const imageDir = path.join(__dirname, "../images/portfolio");
const outputFile = path.join(__dirname, "../gallery.html");

const extensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

const images = fs
    .readdirSync(imageDir)
    .filter(file => extensions.includes(path.extname(file).toLowerCase()));

const gallery = images.map(file => `
    <figure>
        <img
            src="images/portfolio/${file}"
            alt="${path.basename(file, path.extname(file))}"
            loading="lazy"
        >
    </figure>
`).join("\n");

fs.writeFileSync(outputFile, gallery);

console.log(`Generated gallery with ${images.length} images.`);