import React from 'react';

// Simple helper to parse bold text (**text**) and email links safely into JSX elements
function formatMessageContent(text) {
  if (!text || typeof text !== 'string') return '';

  const lines = text.split('\n');

  return lines.map((line, lineIdx) => {
    // Check if line represents a bullet list item
    const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ');
    let cleanLine = isBullet ? line.trim().substring(2).trim() : line;

    // Process bold segments (**bold**) and email structures (rg39405057@gmail.com)
    // We split by ** to identify bold items
    const boldParts = cleanLine.split(/\*\*([^*]+)\*\*/g);
    
    const formattedParts = [];
    
    boldParts.forEach((part, index) => {
      // Even indexes are normal text, odd indexes are the captured bold groups
      const isBold = index % 2 !== 0;
      
      // Process email inside the part
      const emailRegex = /rg39405057@gmail.com/gi;
      const emailParts = part.split(emailRegex);
      const tempFormatted = [];
      
      emailParts.forEach((subPart, subIdx) => {
        tempFormatted.push(subPart);
        if (subIdx < emailParts.length - 1) {
          tempFormatted.push(
            <a 
              key={`email-${subIdx}`} 
              href="mailto:rg39405057@gmail.com" 
              className="underline text-cyan-400 font-mono"
            >
              rg39405057@gmail.com
            </a>
          );
        }
      });

      if (isBold) {
        formattedParts.push(<strong key={`bold-${index}`} className="font-bold text-white">{tempFormatted}</strong>);
      } else {
        formattedParts.push(...tempFormatted);
      }
    });

    if (isBullet) {
      return (
        <li key={lineIdx} className="list-disc ml-4 mt-1 leading-relaxed text-slate-350">
          <span>{formattedParts}</span>
        </li>
      );
    }

    return (
      <p key={lineIdx} className="leading-relaxed min-h-[1rem] text-slate-200">
        {formattedParts}
      </p>
    );
  });
}

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-3.5`}>
      <div 
        className={`max-w-[85%] rounded px-3.5 py-2.5 text-xs shadow-sm border ${
          isUser 
            ? 'bg-slate-900 border-slate-800 text-slate-100 rounded-tr-none' 
            : 'bg-slate-950 border-slate-900/60 text-slate-300 rounded-tl-none'
        }`}
      >
        <div className="space-y-1.5">
          {formatMessageContent(message.content)}
        </div>
      </div>
    </div>
  );
}
