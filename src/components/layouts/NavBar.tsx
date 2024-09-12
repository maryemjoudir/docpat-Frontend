import { useEffect, useState } from "react";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

export default function NavBar(): JSX.Element {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const isAuthenticated: boolean = !!localStorage.getItem("token");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const time = date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(time);
    };

    const updateDate = () => {
      const date = new Date();
      const formattedDate = date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      setCurrentDate(
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
      );
    };

    updateTime();
    updateDate();

    const timeInterval = setInterval(updateTime, 60000);
    const dateInterval = setInterval(updateDate, 60000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(dateInterval);
    };
  }, []);

  return (
    <div className="text-white m-4 p-2 text-center shadow-md navBar rounded-lg flex justify-between items-center flex-wrap">
      <div className="flex items-center space-x-2">
        {isAuthenticated && (
          <div className="flex items-center space-x-2">
            <img
              className="w-10 sm:w-8 md:w-10 lg:w-10 mx-2"
              src="src/assets/images/Bars.svg"
              alt="Bars Image"
            />
          </div>
        )}
      </div>
      <div className="flex-grow flex justify-center items-center space-x-4">
        <div className="flex items-center space-x-2 mr-12">
          <FaRegCalendarAlt className="text-[#1AA5C0] text-base sm:text-sm md:text-base lg:text-lg" />
          <span className="text-[#50799E] text-sm py-3">{currentDate}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaRegClock className="text-[#1AA5C0] text-base sm:text-sm md:text-base lg:text-lg" />
          <span className="text-[#50799E] text-sm py-3">{currentTime}</span>
        </div>
      </div>
      {isAuthenticated && (
        <div className="flex items-center space-x-2 mr-4">
          <img
            className="w-6 sm:w-4 md:w-6 lg:w-6 mx-4"
            src="src/assets/images/Net.svg"
            alt="Net Image"
          />
          <img
            className="w-6 sm:w-4 md:w-6 lg:w-6"
            src="src/assets/images/Bell.svg"
            alt="Bell Image"
          />
        </div>
      )}
    </div>
  );
}
