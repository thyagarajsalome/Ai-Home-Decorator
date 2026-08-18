// src/types.ts

export interface SelectionChoice {
  name: string;
  promptSuffix: string;
  thumbnail?: string;
}

export interface SelectionCategory {
  id: string;
  name: string;
  icon: string;
  guardrail: string;
  choices: SelectionChoice[];
}

export type RoomType = string;
