import { Route, Routes } from "react-router-dom";
import { GlobalComponent } from "../components/commons/GlobalComponent";
import Login from "../views/authentication/Login";

export function Index() {
  return (
    <Routes>
      <Route path="/" element={<GlobalComponent />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}
