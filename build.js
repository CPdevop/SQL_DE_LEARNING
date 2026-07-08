const fs = require('fs');
const path = require('path');
const { Marked } = require('marked');

// Initialize marked
const marked = new Marked();

// Define pages to convert
const GENERAL_PAGES = [
  { id: 'readme', title: 'Home & Welcome', path: 'readme.md' },
  { id: 'glossary', title: 'Glossary', path: 'glossary.md' },
  { id: 'changelog', title: 'Changelog', path: 'changelog.md' },
  { id: 'license', title: 'License', path: 'license.md' }
];

const PYTHON_PAGES = [
  { id: 'ch-41', chapter: 41, title: 'Python Basics & Core Data Structures', readTime: '35–45 min', path: 'book/Part-08-Python-for-Data-Engineering/01-Python-Basics-and-Data-Types.md' },
  { id: 'ch-42', chapter: 42, title: 'Control Flow, Comprehensions & Functions', readTime: '30–40 min', path: 'book/Part-08-Python-for-Data-Engineering/02-Control-Flow-and-Functions.md' },
  { id: 'ch-43', chapter: 43, title: 'Object-Oriented Programming in Data Engineering', readTime: '35–45 min', path: 'book/Part-08-Python-for-Data-Engineering/03-Object-Oriented-Programming.md' },
  { id: 'ch-44', chapter: 44, title: 'Data Wrangling with NumPy & Pandas', readTime: '50–65 min', path: 'book/Part-08-Python-for-Data-Engineering/04-Data-Manipulation-NumPy-and-Pandas.md' },
  { id: 'ch-45', chapter: 45, title: 'Distributed Data Processing with PySpark', readTime: '55–70 min', path: 'book/Part-08-Python-for-Data-Engineering/05-Distributed-Computing-PySpark.md' },
  { id: 'ch-46', chapter: 46, title: 'Workflow Orchestration with Apache Airflow', readTime: '45–60 min', path: 'book/Part-08-Python-for-Data-Engineering/06-Data-Orchestration-Apache-Airflow.md' },
  { id: 'ch-47', chapter: 47, title: 'Practical End-to-End ETL Pipeline Project', readTime: '60–80 min', path: 'book/Part-08-Python-for-Data-Engineering/07-End-to-End-ETL-Pipeline.md' }
];

// Helper to determine relative path prefix to root
function getRelativePrefix(filePath) {
  const normalized = path.normalize(filePath).replace(/\\/g, '/');
  const parts = normalized.split('/');
  const depth = parts.length - 1;
  return depth > 0 ? '../'.repeat(depth) : '';
}

// Parse alert blockquotes (GitHub style markdown alerts: > [!NOTE], etc.)
function parseAlerts(html) {
  const alertTypes = ['NOTE', 'TIP', 'IMPORTANT', 'WARNING', 'CAUTION'];
  let updatedHtml = html;
  
  alertTypes.forEach(type => {
    const regex = new RegExp(`<blockquote>\\s*<p>\\s*\\[!${type}\\]([\\s\\S]*?)</p>\\s*</blockquote>`, 'gi');
    updatedHtml = updatedHtml.replace(regex, (match, content) => {
      return `<div class="alert-box alert-${type.toLowerCase()}">
        <div class="alert-title">
          <span class="alert-icon"></span>
          ${type}
        </div>
        <div class="alert-content">${content.trim()}</div>
      </div>`;
    });
  });
  
  return updatedHtml;
}

// Translate markdown links (.md) inside href to .html links
function translateLinks(html) {
  // Regex matches href="path/file.md" or href="path/file.md#hash"
  return html.replace(/href="([^"]+?)\.md(#([^"]+?))?"/g, (match, p1, p2, p3) => {
    return `href="${p1}.html${p2 || ''}"`;
  });
}

// Custom heading generator to inject anchor IDs
marked.use({
  renderer: {
    heading(text, level, raw) {
      const id = raw.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-');
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  }
});

// Compile Markdown content to standalone HTML page
function compileMarkdown(page, indexInList, pageList) {
  const absolutePath = path.resolve(__dirname, page.path);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`File not found: ${page.path}`);
    return;
  }
  
  let content = fs.readFileSync(absolutePath, 'utf8');
  
  // Basic math formula pre-processing: escape LaTeX syntax for KaTeX to pick up later in browser
  const mathBlocks = [];
  content = content.replace(/\$\$([\s\S]+?)\$\$/g, (match, equation) => {
    mathBlocks.push({ type: 'block', eq: equation });
    return `<!--MATH_BLOCK_${mathBlocks.length - 1}-->`;
  });
  content = content.replace(/\$([\s\S]+?)\$/g, (match, equation) => {
    mathBlocks.push({ type: 'inline', eq: equation });
    return `<!--MATH_INLINE_${mathBlocks.length - 1}-->`;
  });
  
  let html = marked.parse(content);
  
  // Re-inject math equations
  mathBlocks.forEach((math, idx) => {
    if (math.type === 'block') {
      html = html.replace(`<!--MATH_BLOCK_${idx}-->`, `<div class="math-block">\\(${math.eq.trim()}\\)</div>`);
    } else {
      html = html.replace(`<!--MATH_INLINE_${idx}-->`, `<span class="math-inline">\\(${math.eq.trim()}\\)</span>`);
    }
  });

  // Apply custom alerts parsing and link translation
  html = parseAlerts(html);
  html = translateLinks(html);
  
  // Determine paths and indices for subpage navigation
  const relativeRoot = getRelativePrefix(page.path);
  const backToIndexUrl = `${relativeRoot}index.html`;
  const styleCssUrl = `${relativeRoot}style.css`;
  
  // Determine previous and next buttons
  let footerNavHtml = '';
  if (indexInList !== undefined && pageList) {
    const prevPage = pageList[indexInList - 1];
    const nextPage = pageList[indexInList + 1];
    
    footerNavHtml = `<div class="page-nav-footer">`;
    if (prevPage) {
      // Calculate relative link path from current file to target file
      const currentDir = path.dirname(page.path);
      const targetDir = path.dirname(prevPage.path);
      const relativeTargetDir = path.relative(currentDir, targetDir).replace(/\\/g, '/');
      const prefix = relativeTargetDir ? relativeTargetDir + '/' : '';
      const prevUrl = `${prefix}${path.basename(prevPage.path, '.md')}.html`;
      
      footerNavHtml += `
        <a href="${prevUrl}" class="nav-footer-btn prev">
          <span class="nav-footer-label">← Previous Chapter</span>
          <span class="nav-footer-title">${prevPage.title}</span>
        </a>
      `;
    } else {
      footerNavHtml += `<div></div>`; // empty placeholder for flex spacing
    }
    
    if (nextPage) {
      const currentDir = path.dirname(page.path);
      const targetDir = path.dirname(nextPage.path);
      const relativeTargetDir = path.relative(currentDir, targetDir).replace(/\\/g, '/');
      const prefix = relativeTargetDir ? relativeTargetDir + '/' : '';
      const nextUrl = `${prefix}${path.basename(nextPage.path, '.md')}.html`;
      
      footerNavHtml += `
        <a href="${nextUrl}" class="nav-footer-btn next">
          <span class="nav-footer-label">Next Chapter →</span>
          <span class="nav-footer-title">${nextPage.title}</span>
        </a>
      `;
    } else {
      footerNavHtml += `<div></div>`;
    }
    footerNavHtml += `</div>`;
  }
  
  // Complete Area for chapters
  const completeAreaHtml = page.chapter ? `
    <div class="subpage-complete-area">
      <div class="subpage-complete-text">Finished reading this chapter? Mark it as complete to track your progress!</div>
      <div class="checkbox-btn-wrapper">
        <button class="theme-toggle-btn" id="subpage-complete-btn" onclick="toggleSubpageCompletion('${page.id}')">
          <span id="complete-status-icon">⏳</span>
          <span id="complete-status-text">Mark as Complete</span>
        </button>
      </div>
    </div>
  ` : '';
  
  // Page HTML wrapping
  const subpageTemplate = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title} - SQL & Python Curriculum</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  
  <!-- KaTeX Math CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  
  <!-- Prism.js Dark/Light CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" id="prism-theme">
  
  <!-- Shared Style Sheet -->
  <link rel="stylesheet" href="${styleCssUrl}">
  
  <script>
    // Immediate script to prevent theme flash
    (function() {
      const theme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
</head>
<body>
  
  <header class="site-header">
    <div class="header-container">
      <a href="${backToIndexUrl}" class="back-link">← Back to Curriculum Directory</a>
      <div class="header-actions">
        <button class="theme-toggle-btn" id="theme-btn">🌙 Dark Mode</button>
      </div>
    </div>
  </header>
  
  <main class="content-wrapper">
    <article class="markdown-body">
      ${html}
    </article>
    
    ${completeAreaHtml}
    ${footerNavHtml}
  </main>

  <!-- KaTeX & Prism Scripts -->
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" onload="initKaTeX()"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>

  <script>
    const pageId = '${page.id}';
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Auto KaTeX setup
    function initKaTeX() {
      if (window.renderMathInElement) {
        window.renderMathInElement(document.body, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '\\(', right: '\\)', display: false},
            {left: '$', right: '$', display: false}
          ],
          throwOnError : false
        });
      }
    }

    // Set Theme Toggler Content
    const themeBtn = document.getElementById('theme-btn');
    function updateThemeUI() {
      themeBtn.innerHTML = currentTheme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode';
      const prismStyle = document.getElementById('prism-theme');
      if (prismStyle) {
        if (currentTheme === 'light') {
          prismStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css';
        } else {
          prismStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
        }
      }
    }
    
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
      updateThemeUI();
    });
    
    updateThemeUI(); // Run immediately on load

    // Copy action for code listings
    function setupCodeBlocks() {
      const codeBlocks = document.querySelectorAll('pre');
      codeBlocks.forEach(block => {
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.innerText = 'Copy';
        btn.onclick = () => {
          const code = block.querySelector('code').innerText;
          navigator.clipboard.writeText(code).then(() => {
            btn.innerText = 'Copied!';
            setTimeout(() => { btn.innerText = 'Copy'; }, 2000);
          });
        };
        block.appendChild(btn);
      });
    }
    setupCodeBlocks();

    // Completion Status handling
    function updateCompletionUI() {
      const compBtn = document.getElementById('subpage-complete-btn');
      if (!compBtn) return;
      
      const completed = JSON.parse(localStorage.getItem('completed_python_chapters') || '[]');
      const isDone = completed.includes(pageId);
      
      const iconSpan = document.getElementById('complete-status-icon');
      const textSpan = document.getElementById('complete-status-text');
      
      if (isDone) {
        compBtn.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
        compBtn.style.borderColor = '#10b981';
        compBtn.style.color = '#10b981';
        iconSpan.innerText = '✅';
        textSpan.innerText = 'Completed';
      } else {
        compBtn.style.backgroundColor = 'var(--bg-primary)';
        compBtn.style.borderColor = 'var(--border-color)';
        compBtn.style.color = 'var(--text-primary)';
        iconSpan.innerText = '⏳';
        textSpan.innerText = 'Mark as Complete';
      }
    }

    function toggleSubpageCompletion() {
      let completed = JSON.parse(localStorage.getItem('completed_python_chapters') || '[]');
      if (completed.includes(pageId)) {
        completed = completed.filter(id => id !== pageId);
      } else {
        completed.push(pageId);
      }
      localStorage.setItem('completed_python_chapters', JSON.stringify(completed));
      updateCompletionUI();
    }
    
    updateCompletionUI();
  </script>
</body>
</html>`;

  // Write compiled HTML
  const outputPath = path.resolve(__dirname, page.path.replace(/\.md$/, '.html'));
  fs.writeFileSync(outputPath, subpageTemplate, 'utf8');
  console.log(`Successfully compiled standalone: ${outputPath}`);
}

// Compile Table of Contents homepage index.html
function buildIndexHtml() {
  const totalChapters = PYTHON_PAGES.length;
  
  // Build dynamic grid for syllabus
  const syllabusHtml = PYTHON_PAGES.map(p => {
    // Relative link path to subpage
    const pageBasename = path.basename(p.path, '.md') + '.html';
    const subpageUrl = `book/Part-08-Python-for-Data-Engineering/${pageBasename}`;
    
    return `
      <a href="${subpageUrl}" class="syllabus-item" data-chapter-id="${p.id}">
        <div class="item-left">
          <span class="chapter-number">Chapter ${p.chapter}</span>
          <span class="chapter-name">${p.title}</span>
        </div>
        <div class="item-right">
          <span class="read-time">🕒 ${p.readTime}</span>
          <span class="status-badge" id="badge-${p.id}">⏳</span>
        </div>
      </a>
    `;
  }).join('');

  // Build links to general docs
  const generalLinksHtml = GENERAL_PAGES.map(p => {
    const pageBasename = path.basename(p.path, '.md') + '.html';
    return `<li><a href="${pageBasename}">📄 ${p.title}</a></li>`;
  }).join('');

  const indexTemplate = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SQL & Python for Data Engineers - Python Curriculum Portal</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  
  <!-- Shared Style Sheet -->
  <link rel="stylesheet" href="style.css">
  
  <script>
    // Immediate script to prevent theme flash
    (function() {
      const theme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
</head>
<body>

  <header class="site-header">
    <div class="header-container">
      <span class="back-link" style="transform:none; cursor:default; pointer-events:none;">🎓 Python Learning curriculum</span>
      <div class="header-actions">
        <button class="theme-toggle-btn" id="theme-btn">🌙 Dark Mode</button>
      </div>
    </div>
  </header>

  <main class="content-wrapper">
    <div class="directory-hero">
      <h1>Python for Data Engineering</h1>
      <p>Publication-quality chapters, exercises, memory optimization techniques, and Airflow workflow orchestration designed specifically for Data Engineers.</p>
    </div>
    
    <div class="portal-grid">
      <div class="syllabus-card">
        <h2 class="syllabus-title">Syllabus Chapters</h2>
        <div class="syllabus-list">
          ${syllabusHtml}
        </div>
      </div>
      
      <div class="sidebar-card">
        <div class="info-box">
          <h3 class="info-box-title">Learning Progress</h3>
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
            <span style="font-weight:600;" id="progress-text">0 / ${totalChapters} Completed</span>
            <span style="font-weight:700; color:var(--accent-secondary);" id="progress-percent">0%</span>
          </div>
          <div style="height:10px; background-color:var(--border-color); border-radius:5px; overflow:hidden; margin-bottom:12px;">
            <div style="height:100%; width:0%; background:var(--accent-gradient); transition:width 0.4s ease;" id="progress-fill"></div>
          </div>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0;" id="resume-advice">Click any chapter to start learning!</p>
        </div>
        
        <div class="info-box">
          <h3 class="info-box-title">Reference Guides</h3>
          <ul class="meta-link-list">
            ${generalLinksHtml}
          </ul>
        </div>
      </div>
    </div>
  </main>

  <script>
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Theme switching
    const themeBtn = document.getElementById('theme-btn');
    function updateThemeUI() {
      themeBtn.innerHTML = currentTheme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode';
    }
    
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
      updateThemeUI();
    });
    
    updateThemeUI();

    // Progress updates on load
    function updateCurriculumProgress() {
      const completed = JSON.parse(localStorage.getItem('completed_python_chapters') || '[]');
      const total = ${totalChapters};
      const completedCount = completed.filter(id => id.startsWith('ch-')).length;
      
      // Update badges
      const pythonPageIds = ${JSON.stringify(PYTHON_PAGES.map(p => p.id))};
      pythonPageIds.forEach(id => {
        const badge = document.getElementById('badge-' + id);
        if (badge) {
          badge.innerText = completed.includes(id) ? '✅' : '⏳';
        }
      });
      
      // Update numbers
      const percent = Math.round((completedCount / total) * 100) || 0;
      document.getElementById('progress-text').innerText = \`\${completedCount} / \${total} Completed\`;
      document.getElementById('progress-percent').innerText = \`\${percent}%\`;
      document.getElementById('progress-fill').style.width = \`\${percent}%\`;
      
      // Recommendation string
      const resumeAdvice = document.getElementById('resume-advice');
      if (completedCount === total) {
        resumeAdvice.innerText = 'All chapters completed! Outstanding job! 🏆';
      } else {
        const nextChapter = ${JSON.stringify(PYTHON_PAGES.map(p => ({ id: p.id, title: p.title, path: p.path })))};
        const nextUnfinished = nextChapter.find(ch => !completed.includes(ch.id));
        if (nextUnfinished) {
          const pageBasename = nextUnfinished.path.split('/').pop().replace('.md', '.html');
          const targetUrl = 'book/Part-08-Python-for-Data-Engineering/' + pageBasename;
          resumeAdvice.innerHTML = \`Next up: <a href="\${targetUrl}">\${nextUnfinished.title}</a>\`;
        }
      }
    }
    
    updateCurriculumProgress();
  </script>
</body>
</html>`;

  fs.writeFileSync(path.resolve(__dirname, 'index.html'), indexTemplate, 'utf8');
  console.log(`Successfully compiled Table of Contents: index.html`);
}

// 1. Compile all sub-pages
GENERAL_PAGES.forEach(page => {
  compileMarkdown(page);
});

PYTHON_PAGES.forEach((page, idx) => {
  compileMarkdown(page, idx, PYTHON_PAGES);
});

// 2. Compile index portal
buildIndexHtml();
console.log('Build completed successfully!');
