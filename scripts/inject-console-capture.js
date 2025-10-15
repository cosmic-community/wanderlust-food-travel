const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), '.next', 'server', 'app');

function injectScript(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  
  if (!content.includes(scriptTag) && content.includes('</head>')) {
    content = content.replace('</head>', `${scriptTag}</head>`);
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

walkDir(outDir);
console.log('Console capture script injection complete');