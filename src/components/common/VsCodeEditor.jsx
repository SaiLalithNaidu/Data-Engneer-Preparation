import React, { useState } from 'react';
import { Copy, Check, Code2, Play, Edit3, Eye, FileCode } from 'lucide-react';

export default function VsCodeEditor({ 
  code = '', 
  language = 'python', 
  title = 'script.py',
  isEditable = true 
}) {
  const [currentCode, setCurrentCode] = useState(code);
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Sync prop changes if any
  React.useEffect(() => {
    setCurrentCode(code);
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const lines = currentCode.split('\n');

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#1e1e1e] shadow-2xl overflow-hidden font-mono text-xs my-4">
      
      {/* VS Code Window Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#333333] select-none">
        
        {/* Left: Window Controls & File Tab */}
        <div className="flex items-center gap-3">
          {/* Mac / VS Code Window Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
          </div>

          {/* Active File Tab */}
          <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1e1e] border-t-2 border-[#007acc] text-slate-200 rounded-t text-xs font-sans font-medium">
            <FileCode className="w-3.5 h-3.5 text-[#519aba]" />
            <span>{title || (language === 'sql' ? 'query.sql' : 'pipeline.py')}</span>
          </div>
        </div>

        {/* Right Actions: Edit Toggle & Copy */}
        <div className="flex items-center gap-2 text-slate-400 font-sans">
          {isEditable && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                isEditing ? 'bg-[#007acc] text-white' : 'hover:bg-[#333333] text-slate-300'
              }`}
              title={isEditing ? 'View Syntax Highlighted Code' : 'Edit Code'}
            >
              {isEditing ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{isEditing ? 'Preview' : 'Edit Code'}</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold hover:bg-[#333333] text-slate-300 transition-all"
            title="Copy Code to Clipboard"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-[#4ec9b0]" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{isCopied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

      </div>

      {/* Code Area with Line Numbers Gutter */}
      {isEditing ? (
        <div className="flex bg-[#1e1e1e]">
          {/* Line Numbers Gutter */}
          <div className="py-3 px-3 text-right bg-[#1e1e1e] border-r border-[#2d2d2d] text-[#858585] select-none text-[11px] font-mono leading-relaxed">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Editable Textarea */}
          <textarea
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            className="flex-1 p-3 bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs leading-relaxed focus:outline-none resize-y min-h-[160px]"
            spellCheck="false"
          />
        </div>
      ) : (
        <div className="flex bg-[#1e1e1e] overflow-x-auto">
          {/* Line Numbers Gutter */}
          <div className="py-3 px-3.5 text-right bg-[#1e1e1e] border-r border-[#2d2d2d] text-[#858585] select-none text-[11px] font-mono leading-6 flex-shrink-0">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Syntax Highlighted Code Display */}
          <div className="py-3 px-4 font-mono text-xs leading-6 overflow-x-auto flex-1">
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre">
                {highlightVsCodeLine(line, language)}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

// VS Code Dark+ / One Dark Pro Syntax Highlighter Tokenizer
function highlightVsCodeLine(line, language) {
  if (!line) return <span>&nbsp;</span>;

  // Handle Full Line Comments (# ... or -- ...)
  if (line.trim().startsWith('#') || line.trim().startsWith('--')) {
    return <span className="text-[#6A9955] italic font-mono">{line}</span>;
  }

  // Tokenizer regex matching strings, keywords, functions, numbers, decorators
  const tokenRegex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`|#.*$|--.*$|@[a-zA-Z0-9_]+|\b(?:def|class|import|from|if|elif|else|for|while|return|yield|with|as|try|except|finally|raise|lambda|and|or|not|in|is|SELECT|FROM|WHERE|JOIN|ON|GROUP|BY|HAVING|ORDER|OVER|PARTITION|WITH|AS|CREATE|DROP|ALTER|INSERT|UPDATE|DELETE|MERGE|INTO|EXISTS|AND|OR|NOT|IS|NULL|DISTINCT|LIMIT|CASE|WHEN|THEN|END|UNION|ALL)\b|\b[a-zA-Z_][a-zA-Z0-9_]*(?=\()|\b\d+(?:\.\d+)?\b|\b(?:True|False|None|NULL|TRUE|FALSE)\b)/g;

  const parts = [];
  let lastIdx = 0;
  let match;

  while ((match = tokenRegex.exec(line)) !== null) {
    // Non-matched plain text before token
    if (match.index > lastIdx) {
      parts.push(
        <span key={lastIdx} className="text-[#D4D4D4]">
          {line.substring(lastIdx, match.index)}
        </span>
      );
    }

    const token = match[0];

    // Style rules matching VS Code Dark+ Palette
    if (token.startsWith('#') || token.startsWith('--')) {
      // Comment
      parts.push(<span key={match.index} className="text-[#6A9955] italic">{token}</span>);
    } else if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) {
      // String Literal (Green)
      parts.push(<span key={match.index} className="text-[#CE9178]">{token}</span>);
    } else if (token.startsWith('@')) {
      // Python Decorator (Gold)
      parts.push(<span key={match.index} className="text-[#DCDCAA] font-bold">{token}</span>);
    } else if (/^(def|class|import|from|if|elif|else|for|while|return|yield|with|as|try|except|finally|raise|lambda|and|or|not|in|is|SELECT|FROM|WHERE|JOIN|ON|GROUP|BY|HAVING|ORDER|OVER|PARTITION|WITH|AS|CREATE|DROP|ALTER|INSERT|UPDATE|DELETE|MERGE|INTO|EXISTS|AND|OR|NOT|IS|NULL|DISTINCT|LIMIT|CASE|WHEN|THEN|END|UNION|ALL)$/i.test(token)) {
      // Keywords (VS Code Purple / Blue)
      parts.push(<span key={match.index} className="text-[#C586C0] font-bold">{token}</span>);
    } else if (/^(True|False|None|NULL|TRUE|FALSE|\d+(\.\d+)?)$/i.test(token)) {
      // Booleans & Numbers (Orange)
      parts.push(<span key={match.index} className="text-[#B5CEA8] font-bold">{token}</span>);
    } else if (line[match.index + token.length] === '(') {
      // Function Call (VS Code Yellow/Blue)
      parts.push(<span key={match.index} className="text-[#DCDCAA] font-semibold">{token}</span>);
    } else {
      // Identifier / Variable (Cyan/White)
      parts.push(<span key={match.index} className="text-[#9CDCFE]">{token}</span>);
    }

    lastIdx = tokenRegex.lastIndex;
  }

  // Remaining plain text after last token
  if (lastIdx < line.length) {
    parts.push(
      <span key={lastIdx} className="text-[#D4D4D4]">
        {line.substring(lastIdx)}
      </span>
    );
  }

  return <span>{parts}</span>;
}
