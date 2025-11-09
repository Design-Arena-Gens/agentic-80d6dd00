"use client";

import { useState } from "react";
import { BookDescriptor, BookRequestPayload } from "../types/book";

interface Props {
  onGenerated: (book: BookDescriptor) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const defaultCompetencies = ["critical thinking", "collaboration", "digital fluency", "ethical leadership"];

export function BookForm({ onGenerated, loading, setLoading }: Props) {
  const [topic, setTopic] = useState("Holistic Environmental Studies");
  const [regionFocus, setRegionFocus] = useState("India");
  const [tone, setTone] = useState<BookRequestPayload["tone"]>("formal");
  const [academicLevel, setAcademicLevel] =
    useState<BookRequestPayload["academicLevel"]>("undergraduate");
  const [competencyInput, setCompetencyInput] = useState("");
  const [competencies, setCompetencies] = useState<string[]>(defaultCompetencies);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const payload: Partial<BookRequestPayload> = {
        topic,
        regionFocus,
        tone,
        academicLevel,
        competencyFocus: competencies,
      };

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as BookDescriptor;
      onGenerated(data);
    } finally {
      setLoading(false);
    }
  }

  function handleCompetencyAdd() {
    const trimmed = competencyInput.trim();
    if (!trimmed || competencies.includes(trimmed)) return;
    setCompetencies((prev) => [...prev, trimmed]);
    setCompetencyInput("");
  }

  function handleCompetencyRemove(item: string) {
    setCompetencies((prev) => prev.filter((competency) => competency !== item));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-transparent transition hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
    >
      <div>
        <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
          Topic
        </label>
        <input
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          placeholder="Enter the core topic for the book"
          className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
            Academic Level
          </label>
          <select
            value={academicLevel}
            onChange={(event) =>
              setAcademicLevel(event.target.value as BookRequestPayload["academicLevel"])
            }
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="secondary">Secondary</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="postgraduate">Postgraduate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
            Tone
          </label>
          <select
            value={tone}
            onChange={(event) => setTone(event.target.value as BookRequestPayload["tone"])}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="formal">Formal</option>
            <option value="conversational">Conversational</option>
            <option value="motivational">Motivational</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
          Region Focus
        </label>
        <input
          value={regionFocus}
          onChange={(event) => setRegionFocus(event.target.value)}
          placeholder="e.g., All India, Karnataka, North-East India"
          className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
          Competency Focus
        </label>
        <div className="mt-2 flex gap-2">
          <input
            value={competencyInput}
            onChange={(event) => setCompetencyInput(event.target.value)}
            placeholder="Add competency"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <button
            type="button"
            onClick={handleCompetencyAdd}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
            disabled={!competencyInput.trim()}
          >
            Add
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {competencies.map((competency) => (
            <button
              key={competency}
              type="button"
              onClick={() => handleCompetencyRemove(competency)}
              className="group flex items-center gap-2 rounded-full border border-indigo-300 px-3 py-1 text-sm text-indigo-700 transition hover:border-indigo-600 hover:text-indigo-900 dark:border-indigo-700/60 dark:text-indigo-200 dark:hover:border-indigo-500 dark:hover:text-indigo-100"
            >
              {competency}
              <span className="rounded-full bg-indigo-100 px-2 text-xs text-indigo-600 transition group-hover:bg-indigo-200 dark:bg-indigo-900/60 dark:text-indigo-200">
                remove
              </span>
            </button>
          ))}
          {competencies.length === 0 && (
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Add at least one competency focus to tailor learning outcomes.
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Full Book"}
      </button>
    </form>
  );
}
