export interface Data {
  id: string;
  question: string;
  options: Options[];
  theme: ThemeName;
  is_answers?: string;
}

export interface Options {
  number: string;
  option: string;
  is_image?: boolean;
}

export interface DataAnsw {
  id: string;
  r_number: string;
  ball: string;
}

export interface Ticket {
  category: string;
  themes: string[];
}

export interface Grade {
  id: string;
  examinerGrade: string;
}

export interface ThemeQuestionsQuantity {
  theme: ThemeName;
  questionsQuantity: number;
  defaultQuestionsQuantity: number;
}

export type ThemeName =
  | "Т-А"
  | "Т-Б"
  | "Т-В"
  | "Т-Г"
  | "Т-Д"
  | "Т-Е"
  | "Т-Ж"
  | "Т-И"
  | "Т-К"
  | "Т-Л"
  | "Т-М"
  | "Т-Н"
  | "Т-П"
  | "Т-Р"
  | "Т-С"
  | "Т-Т"
  | "Т-У"
  | "Т-Ф"
  | "Т-Х"
  | "Т-Ц"
  | "Т-Ш"
  | "Т-Щ"
  | "Т-Э"
  | "Т-Ю"
  | "Т-Я"
  | "Т-АА"
  | "Т-АБ"
  | "Т-АВ"
  | "Т-АГ"
  | "Т-АД"
  | "Т-АЕ"
  | "Т-АЖ"
  | "Т-АЗ"
  | "Т-АИ"
  | "Т-АК"
  | "Т-АЛ"
  | "Т-АМ"
  | "Т-АН"
  | "Т-АО"
  | "Т-АР"
  | "Т-АС"
  | "П-А"
  | "П-Б"
  | "П-В"
  | "П-Г"
  | "П-Д"
  | "П-Е"
  | "П-Ж"
  | "П-И"
  | "П-К"
  | "П-Л";

export interface LoginData {
  name: string;
  pass: string;
}

export interface FioData {
  fio: string;
  category: string;
  info: string;
  dateFormat: string;
  dateForFileName: string;
}

export interface QuestionsData {
  id: string;
  answer: string | null;
  is_answers: string;
}

export interface AnswerForView {
  id: string;
  usersAnswer: string;
  sign: string;
}

export enum FlagFinish {
  finish = "finish",
  start = "start",
  temporary = "temporary",
}

export enum Sign {
  right = "(верно)",
  noRight = "(неверно)",
  withoutAnswer = "без ответа",
  empty = "",
}

export enum Constants {
  unique = "unique",
  without_answers = "no",
  with_answers = "yes",
}

export enum Balls {
  T = 2,
  P = 10,
}

export enum ThemeFullName {
  "Т-А" = "Common knowledge",
  "П-Б" = "Graphic design",
  "Т-В" = "Colors",
  "Т-Г" = "Architecture",
  "Т-Л" = "Psychology",
  "Т-Т" = "Painting",
  "Т-Х" = "Art's history",
  "П-А" = "Programming",
  "Т-К" = "Style history",
  "Т-Д" = "",
  "Т-М" = "",
  "Т-Н" = "",
  "Т-П" = "",
  "Т-Р" = "",
  "Т-С" = "",
  "Т-Е" = "",
  "Т-У" = "",
  "Т-Ф" = "",
  "Т-Ж" = "",
  "Т-Ц" = "",
  "Т-Ш" = "",
  "Т-Щ" = "",
  "Т-Э" = "",
  "Т-Ю" = "",
  "Т-Я" = "",
  "Т-АА" = "",
  "Т-АБ" = "",
  "Т-АВ" = "",
  "Т-АГ" = "",
  "Т-АД" = "",
  "Т-АЕ" = "",
  "Т-АЖ" = "",
  "Т-АЗ" = "",
  "Т-АИ" = "",
  "Т-АК" = "",
  "Т-АЛ" = "",
  "Т-АМ" = "",
  "Т-АН" = "",
  "Т-АО" = "",
  "Т-АР" = "",
  "Т-АС" = "",
  "Т-И" = "",
  "Т-Б" = "",
  "П-В" = "",
  "П-Г" = "",
  "П-Д" = "",
  "П-Е" = "",
  "П-Ж" = "",
  "П-И" = "",
  "П-К" = "",
  "П-Л" = "",
}
