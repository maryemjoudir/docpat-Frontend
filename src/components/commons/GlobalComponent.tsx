import { Outlet } from "react-router-dom";
import NavBar from "../layouts/NavBar"; // Assurez-vous que le chemin est correct

export function GlobalComponent(): JSX.Element {
  return (
    <div className="h-screen w-full flex flex-col">
      <NavBar />

      <div className="flex-grow overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
