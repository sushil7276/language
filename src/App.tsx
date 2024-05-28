import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components Import
import Header from "./components/Header";
import Learning from "./components/Learning";
import Loader from "./components/Loader";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

// Code spiting
const Home = lazy(() => import("./components/Home"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
