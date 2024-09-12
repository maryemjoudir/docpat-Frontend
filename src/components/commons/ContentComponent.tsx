import { ReactNode } from "react";

export function ContentComponent({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="bg-gradient-to-r from-[#FDFDFD] to-[#EEFCFD] p-2 m-4 rounded-lg shadow-md">
      {children}
    </div>
  );
}
