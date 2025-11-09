"use client";

import { useState } from "react";
import { BookForm } from "../components/BookForm";
import { ChapterAccordion } from "../components/ChapterAccordion";
import { MarkdownExportButton } from "../components/MarkdownExportButton";
import { BookDescriptor } from "../types/book";

export default function Home() {
  const [book, setBook] = useState<BookDescriptor | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-16 dark:bg-slate-950">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:px-8">
        <header className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">
            Generative Book Studio
          </p>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 md:text-5xl">
            Create comprehensive, India-ready academic books in minutes
          </h1>
          <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            Craft a 15 chapter, 15 page-per-chapter learning resource enriched with
            charts, tables, contextual examples, and reflective tasks tailored for students
            across India. Configure tone, academic level, and competencies to align with your
            curriculum goals.
          </p>
        </header>

        <BookForm onGenerated={setBook} loading={loading} setLoading={setLoading} />

        {book && (
          <section className="space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                    Book Blueprint
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {book.title}
                  </h2>
                  <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
                    {book.subtitle}
                  </p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{book.audience}</p>
                </div>
                <MarkdownExportButton book={book} />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Core Learning Outcomes
                </h3>
                <ul className="mt-3 grid gap-3 md:grid-cols-2">
                  {book.learningOutcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300"
                    >
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              {book.chapters.map((chapter) => (
                <ChapterAccordion key={chapter.id} chapter={chapter} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
