import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { generate } from "random-words";
import { rootAction } from "../Redux/slices";

const generateMCQ = (meaning: { Text: string }[], index: number): string[] => {
  const correctAns: string = meaning[index].Text;

  // all ans Except correct ans
  const allAnsExceptForCorrect = meaning.filter((i) => i.Text !== correctAns);

  // Randomly generating 3 element from incorrect array
  const incorrectOptions: string[] = _.sampleSize(
    allAnsExceptForCorrect,
    3
  ).map((i) => i.Text);

  // Shuffle element for incorrect and correct ans
  const shuffleElement = _.shuffle([...incorrectOptions, correctAns]);

  return shuffleElement;
};

export const translateWords = createAsyncThunk(
  "root/translateWords",
  async (params: LangType, thunkAPI) => {
    try {
      console.log("Start");
      thunkAPI.dispatch(rootAction.getWordsRequest());
      const words = generate(8).map((i) => ({ Text: i }));

      const response = await axios.post(
        "https://microsoft-translator-text.p.rapidapi.com/translate",
        words,
        {
          params: {
            "to[0]": params,
            "api-version": "3.0",
            profanityAction: "NoAction",
            textType: "plain",
          },
          headers: {
            "x-rapidapi-key":
              "72edc7c04emsh4aedd4e24d0a5b5p1f8b68jsnaef6e6d8861e",
            "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
            "Content-Type": "application/json",
          },
        }
      );

      const receive: FetchDataType[] = response.data;

      const arr: WordType[] = receive.map((i, index) => {
        const options: string[] = generateMCQ(words, index);

        return {
          word: i.translations[0].text,
          meaning: words[index].Text,
          options,
        };
      });
      console.log("Success");
      thunkAPI.dispatch(rootAction.getWordsSuccess(arr));
    } catch (error) {
      thunkAPI.dispatch(rootAction.getWordsFail("Some Error"));
    }
  }
);

export const countAnswer = (words: string[], results: string[]): number => {
  if (words.length !== results.length) throw new Error("Array are not equal");
  let count = 0;

  for (let i = 0; i < words.length; i++) {
    if (words[i] === results[i]) count++;
  }

  return count;
};

export const fetchAudio = async (
  text: string,
  language: LangType
): Promise<string> => {
  const key = "9cc8f365e5364e41b868912e0cbcd5be";
  const rapidKey = "72edc7c04emsh4aedd4e24d0a5b5p1f8b68jsnaef6e6d8861e";

  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true",
  });

  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else if (language === "fr") encodedParams.set("hl", "fr-fr");
  else encodedParams.set("hl", "hi-in");

  const { data }: { data: string } = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: { key },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": rapidKey,
        "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
      },
    }
  );

  return data;
};
