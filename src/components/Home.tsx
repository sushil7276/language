import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const languages = [
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "French",
    code: "fr",
  },
  {
    name: "japanese",
    code: "ja",
  },
  {
    name: "spanish",
    code: "es",
  },
];

function Home() {
  const navigate = useNavigate();

  const languageSelectHandler = (language: string): void => {
    navigate(`/learn?language=${language}`);
  };

  return (
    <Container maxWidth={"sm"}>
      <Typography variant="h5" p={"2rem"} textAlign={"center"}>
        Welcome, Begin your journey of Learning
      </Typography>

      <Stack
        direction={"row"}
        spacing={"2rem"}
        p={"2rem"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {languages.map((item, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => languageSelectHandler(item.code)}
          >
            {item.name}
          </Button>
        ))}
      </Stack>
    </Container>
  );
}

export default Home;
