"use client";

import { useState } from "react";
import { ChapterDescriptor } from "../types/book";
import { ChartRenderer } from "./ChartRenderer";

interface Props {
  chapter: ChapterDescriptor;
}

export function ChapterAccordion({ chapter }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
      <button
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
            Chapter {chapter.title.split(".")[0]}
          </p>
          <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
            {chapter.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {chapter.focus}
          </p>
        </div>

        <span className="rounded-full border border-slate-200 px-4 py-1 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
          {expanded ? "Hide" : "View"}
        </span>
      </button>

      {expanded && (
        <div className="mt-6 space-y-6">
          <section>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Chapter Summary
            </h4>
            <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">{chapter.summary}</p>
          </section>

          <section className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Pages
            </h4>
            <div className="space-y-4">
              {chapter.pages.map((page) => (
                <details
                  key={page.pageNumber}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition open:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:open:bg-slate-900"
                >
                  <summary className="cursor-pointer text-base font-semibold text-slate-800 dark:text-slate-200">
                    Page {page.pageNumber}: {page.headline}
                  </summary>
                  <div className="mt-3 space-y-3">
                    <p className="leading-7 text-slate-700 dark:text-slate-300">{page.content}</p>
                    {page.activities.length > 0 && (
                      <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-3 text-sm text-indigo-900 dark:border-indigo-900/40 dark:bg-indigo-950/40 dark:text-indigo-200">
                        <p className="font-semibold uppercase tracking-wide text-xs text-indigo-600 dark:text-indigo-200">
                          Activities
                        </p>
                        <ul className="ml-4 mt-2 list-disc space-y-1">
                          {page.activities.map((activity) => (
                            <li key={activity}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Visual Insights
            </h4>
            <div className="grid gap-6 md:grid-cols-2">
              {chapter.charts.map((chart) => (
                <div key={chart.id} className="space-y-3">
                  <h5 className="text-base font-semibold text-slate-900 dark:text-slate-200">
                    {chart.title}
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{chart.description}</p>
                  <ChartRenderer chart={chart} />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Tables
            </h4>
            <div className="space-y-6">
              {chapter.tables.map((table) => (
                <div
                  key={table.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="border-b border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                    <h5 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {table.title}
                    </h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{table.description}</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
                      <thead className="bg-slate-100 text-left uppercase tracking-wide text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                        <tr>
                          {table.headers.map((header) => (
                            <th key={header} className="px-4 py-3">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {table.rows.map((row, idx) => (
                          <tr key={`${table.id}-${idx}`} className="odd:bg-white even:bg-slate-50 dark:odd:bg-slate-950 dark:even:bg-slate-900/50">
                            {row.map((cell, cellIdx) => (
                              <td key={`${table.id}-${idx}-${cellIdx}`} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Applied Examples
            </h4>
            <div className="space-y-4">
              {chapter.examples.map((example) => (
                <article
                  key={example.id}
                  className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-slate-800 shadow-sm dark:border-emerald-700/50 dark:bg-emerald-900/30 dark:text-emerald-100"
                >
                  <h5 className="text-base font-semibold">{example.title}</h5>
                  <p className="mt-2 text-sm leading-6">{example.scenario}</p>
                  <ul className="mt-3 space-y-1 text-sm">
                    {example.guidedSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm font-semibold">Reflection: {example.reflection}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Reflective Questions
            </h4>
            <ul className="ml-5 mt-3 list-disc space-y-1 text-sm text-slate-700 dark:text-slate-300">
              {chapter.reflectiveQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
