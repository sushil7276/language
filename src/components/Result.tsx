import {
  Button,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearState, rootSelector } from "../Redux/slices";
import { useNavigate } from "react-router-dom";
import { countAnswer } from "../utils/features";

function Result() {
  const { result, words } = useSelector(rootSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const correctAnsCount: number = countAnswer(
    words.map((i) => i.meaning),
    result
  );
  const percentage: number = (correctAnsCount / words.length) * 100;

  const reset = (): void => {
    dispatch(clearState());
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" color={"primary"} m={"2rem 0"}>
        Result
      </Typography>
      <Typography m={"1rem"} variant="h6">
        You got {correctAnsCount} Right out of {words?.length}
      </Typography>

      <Stack direction={"row"} justifyContent={"space-evenly"}>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            Your Ans
          </Typography>
          <List>
            {result.map((i, index) => (
              <ListItem key={index}>
                {index + 1}-{i}
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            Correct Ans
          </Typography>
          <List>
            {words?.map((i, index) => (
              <ListItem key={index}>{i.meaning}</ListItem>
            ))}
          </List>
        </Stack>
      </Stack>

      <Typography
        m={"1rem"}
        variant="h5"
        color={percentage > 50 ? "green" : "red"}
      >
        {percentage > 50 ? "Pass" : "Fail"}
      </Typography>

      <Button sx={{ margin: "1rem" }} variant="contained" onClick={reset}>
        Reset
      </Button>
    </Container>
  );
}

export default Result;
