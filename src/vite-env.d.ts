/// <reference types="vite/client" />

type LangType = "hi" | "fr" | "ja" | "es";

type WordType = {
  word: string;
  meaning: string;
  options: string[];
};

interface StateType {
  loading: boolean;
  result: string[];
  words: WordType[];
  error?: string;
}

type FetchDataType = {
  translations: { text: string }[];
};
