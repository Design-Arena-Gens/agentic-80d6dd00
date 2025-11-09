"use client";

import { useState } from "react";
import { BookDescriptor } from "../types/book";
import { bookToMarkdown } from "../lib/markdown";

interface Props {
  book: BookDescriptor;
}

export function MarkdownExportButton({ book }: Props) {
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      const markdown = bookToMarkdown(book);
      const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${book.title.replace(/\s+/g, "-").toLowerCase()}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={exporting}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:border-indigo-400 hover:text-indigo-900 disabled:cursor-not-allowed disabled:border-indigo-100 disabled:text-indigo-300 dark:border-indigo-800 dark:bg-indigo-950/30 dark:text-indigo-200 dark:hover:border-indigo-500"
    >
      {exporting ? "Preparing Markdown..." : "Download Markdown"}
    </button>
  );
}
