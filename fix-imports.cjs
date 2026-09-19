const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Fix import React from 'react' -> remove
      content = content.replace(/^import\s+React\s+from\s+['"]react['"];\s*$/gm, '');
      // Fix import React, { ... } from 'react' -> import { ... } from 'react'
      content = content.replace(/import\s+React\s*,\s*\{\s*(.*?)\s*\}\s*from\s+['"]react['"]/g, 'import { $1 } from \'react\'');

      // Fix type imports for verbatimModuleSyntax
      content = content.replace(/import\s*\{\s*([^}]*ObjectType[^}]*)\s*\}\s*from\s*['"]\.\.\/state\/usePortfolioStore['"]/g, (match, p1) => {
          let imports = p1.split(',').map(s => s.trim()).filter(Boolean);
          let types = imports.filter(i => i === 'ObjectType');
          let values = imports.filter(i => i !== 'ObjectType');
          let res = [];
          if (values.length > 0) res.push(`import { ${values.join(', ')} } from '../state/usePortfolioStore';`);
          if (types.length > 0) res.push(`import type { ${types.join(', ')} } from '../state/usePortfolioStore';`);
          return res.join('\n');
      });

      content = content.replace(/import\s*\{\s*([^}]*TimeOfDay[^}]*)\s*\}\s*from\s*['"]\.\.\/state\/usePortfolioStore['"]/g, (match, p1) => {
          let imports = p1.split(',').map(s => s.trim()).filter(Boolean);
          let types = imports.filter(i => i === 'TimeOfDay');
          let values = imports.filter(i => i !== 'TimeOfDay');
          let res = [];
          if (values.length > 0) res.push(`import { ${values.join(', ')} } from '../state/usePortfolioStore';`);
          if (types.length > 0) res.push(`import type { ${types.join(', ')} } from '../state/usePortfolioStore';`);
          return res.join('\n');
      });

      // Remove unused React imports like TS6133
      content = content.replace(/import\s*\{\s*useState\s*\}\s*from\s+['"]react['"];?/g, ''); // We removed useState from InteractiveObject but not in use... wait, InteractiveObject had useState but never read it.
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

processDir(path.join(__dirname, 'src'));
