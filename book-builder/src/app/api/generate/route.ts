import { NextResponse } from "next/server";
import { buildBookDescriptor } from "../../../lib/bookGenerator";
import { BookRequestPayload } from "../../../types/book";

const DEFAULT_COMPETENCIES = [
  "critical thinking",
  "collaboration",
  "digital fluency",
  "ethical leadership",
];

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<BookRequestPayload>;

  const payload: BookRequestPayload = {
    topic: body.topic?.trim() ?? "Integrated Learning",
    academicLevel: body.academicLevel ?? "undergraduate",
    regionFocus: body.regionFocus?.trim() ?? "India",
    tone: body.tone ?? "formal",
    competencyFocus:
      body.competencyFocus && body.competencyFocus.length > 0
        ? body.competencyFocus
        : DEFAULT_COMPETENCIES,
  };

  const book = buildBookDescriptor(payload);

  return NextResponse.json(book);
}
