// components/MarkdownBlock.tsx
'use client';

import clsx from 'clsx';
import { marked } from 'marked';

marked.setOptions({
  breaks: true,
});

const markdownStyles = clsx(
  "text-base leading-relaxed",
  "[&_p]:mb-4",
  "[&_ul]:list-disc [&_ul]:pl-5",
  "[&_ol]:list-decimal [&_ol]:pl-5",
  "[&_li]:mb-1",
  "[&_h1]:text-3xl [&_h1]:font-medium [&_h2]:text-2xl [&_h2]:font-medium [&_h3]:text-xl [&_h4]:text-lg",
  "[&_pre]:bg-gray-100 [&_pre]:p-3 [&_pre]:rounded",
  "[&_code]:font-mono [&_code]:text-sm",
  "[&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:text-gray-600"
);

export default function MarkdownBlock({
  content,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={markdownStyles}
      dangerouslySetInnerHTML={{
        __html: marked.parse(content),
      }}
    />
  );
}
