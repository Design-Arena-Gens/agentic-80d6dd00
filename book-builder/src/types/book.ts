export type ChartType = "line" | "bar" | "radar";

export interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
}

export interface ChartDescriptor {
  id: string;
  title: string;
  description: string;
  type: ChartType;
  labels: string[];
  datasets: Dataset[];
}

export interface TableDescriptor {
  id: string;
  title: string;
  description: string;
  headers: string[];
  rows: string[][];
}

export interface ExampleDescriptor {
  id: string;
  title: string;
  scenario: string;
  guidedSteps: string[];
  reflection: string;
}

export interface ChapterPage {
  pageNumber: number;
  headline: string;
  content: string;
  activities: string[];
}

export interface ChapterDescriptor {
  id: string;
  title: string;
  focus: string;
  summary: string;
  pages: ChapterPage[];
  tables: TableDescriptor[];
  charts: ChartDescriptor[];
  examples: ExampleDescriptor[];
  reflectiveQuestions: string[];
}

export interface BookDescriptor {
  id: string;
  title: string;
  subtitle: string;
  audience: string;
  learningOutcomes: string[];
  chapters: ChapterDescriptor[];
}

export interface BookRequestPayload {
  topic: string;
  academicLevel: "secondary" | "undergraduate" | "postgraduate";
  regionFocus: string;
  tone: "conversational" | "formal" | "motivational";
  competencyFocus: string[];
}
