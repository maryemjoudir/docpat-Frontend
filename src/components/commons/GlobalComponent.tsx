import { Outlet } from "react-router-dom";

export function GlobalComponent(): JSX.Element {
  return (
    <div className="h-full w-full grid grid-cols-gridColmn overflow-hidden">
      <div className="flex flex-col h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
