const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const portfolioDir = path.join(root, "images", "portfolio");
const templatePath = path.join(root, "index.template.html");
const outputPath = path.join(root, "index.html");

const extensions = new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".avif"
]);

function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getAltText(filename) {
    return path
        .basename(filename, path.extname(filename))
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase());
}

const images = fs
    .readdirSync(portfolioDir)
    .filter(file => extensions.has(path.extname(file).toLowerCase()))
    .sort();

const gallery = images.map(file => {
    const src = `images/portfolio/${file}`;
    const alt = escapeHtml(getAltText(file));

    return `
        <figure>
            <img
                src="${src}"
                alt="${alt}"
                loading="lazy"
            >
        </figure>`;
}).join("\n");

const template = fs.readFileSync(templatePath, "utf8");

const html = template.replace(
    "<!-- GALLERY -->",
    gallery
);

fs.writeFileSync(outputPath, html);

console.log(`Gallery generated: ${images.length} images.`);