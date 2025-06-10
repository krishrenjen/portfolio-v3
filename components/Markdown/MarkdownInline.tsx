// components/MarkdownInline.tsx
'use client';

import clsx from 'clsx';
import { marked } from 'marked';

export default function MarkdownInline({ content, className }: { content: string, className?: string }) {
  return (
    <span
      className={clsx(className, "font-normal text-l [&_strong]:font-semibold")}
      dangerouslySetInnerHTML={{
        __html: marked.parseInline(content),
      }}
    ></span>
  );
}
