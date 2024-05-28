import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearState, rootSelector } from "../Redux/slices";
import { fetchAudio, translateWords } from "../utils/features";
import Loader from "./Loader";

function Learning() {
  const [count, setCount] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const audioRef = useRef(null);

  const params = useSearchParams()[0].get("language") as LangType;
  const navigate = useNavigate();

  const dispatch = useDispatch<any>();
  const { loading, words, error } = useSelector(rootSelector);

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
    // go to next element then clear audio src
    setAudioSrc("");
  };

  const audioHandler = async () => {
    const player: HTMLAudioElement = audioRef.current!;

    // If audio src already present then direct play same audio
    if (player) {
      player.play();
    } else {
      // if audio src not present then request to fetch audio
      const data = await fetchAudio(words[count]?.word, params);
      setAudioSrc(data);
    }
  };

  useEffect(() => {
    dispatch(translateWords(params || "hi"));

    // if error is coming the all state is initial mode
    if (error) {
      alert(error);
      dispatch(clearState());
    }
  }, [error, dispatch]);

  if (loading) return <Loader />;
  return (
    <Container maxWidth="sm" sx={{ padding: "1rem" }}>
      {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>}

      {/* If Count is ===0 then goto Home Page other wise back Page */}
      <Button
        variant="outlined"
        onClick={
          count === 0 ? () => navigate("/") : () => setCount((prev) => prev - 1)
        }
      >
        <ArrowBack />
      </Button>

      {/* Heading */}
      <Typography m={"2rem 0"}>Learning Made Easy</Typography>

      <Stack direction={"row"} spacing={"1rem"}>
        <Typography variant="h4">
          {count + 1} - {words[count]?.word}
        </Typography>
        <Typography color={"blue"} variant="h4">
          : {words[count]?.meaning}
        </Typography>
        <Button sx={{ borderRadius: "50%" }} onClick={audioHandler}>
          <VolumeUp />
        </Button>
      </Stack>

      {/* Next Page Button */}
      <Button
        sx={{ margin: "3rem 0" }}
        variant="contained"
        fullWidth
        onClick={
          count === words.length - 1 ? () => navigate("/quiz") : nextHandler
        }
      >
        {count === words.length - 1 ? "Text" : "Next"}
      </Button>
    </Container>
  );
}

export default Learning;
