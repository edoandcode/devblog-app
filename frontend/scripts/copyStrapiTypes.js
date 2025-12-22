/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const sourceFolder = "../../backend/types/generated";
const destinationFolder = "../src/types/api/strapi";

const files = [
    {
        src: path.join(__dirname, `${sourceFolder}/contentTypes.d.ts`),
        dest: path.join(__dirname, `./${destinationFolder}/contentTypes.d.ts`),
    },
    {
        src: path.join(__dirname, `${sourceFolder}/components.d.ts`),
        dest: path.join(__dirname, `./${destinationFolder}/components.d.ts`),
    },
];

function copyFile({ src, dest }) {
    const destinationDir = path.dirname(dest);

    // Check if source file exists
    if (!fs.existsSync(src)) {
        console.error(`❌ Source file does not exist: ${src}`);
        process.exit(1);
    }

    // Ensure destination directory exists or create it
    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
    }

    // Add TypeScript ESLint disable comments to the top of the file
    const tsPrefixESLintDisable = `
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
`
    // Read the source file
    const strapiContentTypesContent = fs.readFileSync(src, "utf8");


    const content = tsPrefixESLintDisable + strapiContentTypesContent

    // Write the content to the destination file
    fs.writeFile(dest, content, (err) => {
        if (err) {
            console.error(`❌ Error writing to destination file: ${err}`);
            process.exit(1);
        } else {
            console.log(`✅ File ${src} copied and modified successfully!`);
        }
    });
}

files.forEach((file) => copyFile(file));