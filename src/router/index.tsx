import { Route, Routes } from "react-router-dom";
import Test from "../components/Test";

export function Index() {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
    </Routes>
  );
}
