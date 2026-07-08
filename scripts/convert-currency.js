const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'src');
const modifiedFiles = [];

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walkDir(fullPath);
    } else if (entry.isFile() && /\.(jsx?)$/i.test(entry.name)) {
      processFile(fullPath);
    }
  }
}

function replaceCurrency(content) {
  const original = content;

  content = content
    .replace(/US Dollars \(\$\)/g, 'Nigerian Naira (₦)')
    .replace(/Nigerian Naira \(\$\)/g, 'Nigerian Naira (₦)')
    .replace(/'\$'/g, "'₦'")
    .replace(/"\$"/g, '"₦"')
    .replace(/\$(\d)/g, '₦$1');

  const parts = content.split('`');
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      parts[i] = parts[i].replace(/\$(?=\{)/g, '₦');
    } else {
      parts[i] = parts[i].replace(/\$\$(?=\{)/g, '₦$');
    }
  }
  content = parts.join('`');

  content = fixNestedTemplateEdgeCases(content);

  return content;
}

function fixNestedTemplateEdgeCases(content) {
  const fixes = [
    ['`, ₦{addr.house_number}', '`, ${addr.house_number}'],
    ['₦₦{shipping.toLocaleString()}', '₦${shipping.toLocaleString()}'],
    ['$₦{shipping.toLocaleString()}', '₦${shipping.toLocaleString()}'],
  ];
  for (const [from, to] of fixes) {
    content = content.split(from).join(to);
  }
  return content;
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf-8');
  const modified = replaceCurrency(original);
  if (original !== modified) {
    fs.writeFileSync(filePath, modified, 'utf-8');
    modifiedFiles.push(filePath);
    console.log(`Modified: ${filePath}`);
  }
}

walkDir(srcDir);

console.log(`\nDone`);
console.log(`Total files modified: ${modifiedFiles.length}`);
