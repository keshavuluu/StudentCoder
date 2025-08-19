const fs = require("fs");
const path = require("path");

const dsasheetsDir = path.join(__dirname, "dsasheets");
if (!fs.existsSync(dsasheetsDir)) {
  fs.mkdirSync(dsasheetsDir, { recursive: true });
}

const rootDsasheetsDir = path.join(__dirname, "../../../dsasheets");
const files = fs.readdirSync(rootDsasheetsDir);

files.forEach((file) => {
  const sourcePath = path.join(rootDsasheetsDir, file);
  const destPath = path.join(dsasheetsDir, file);
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Copied ${file} to public/dsasheets`);
});
