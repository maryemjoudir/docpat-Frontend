import { CalendarIcon, ChatBubbleLeftIcon } from "@heroicons/react/16/solid";
import { ContentComponent } from "../../components/commons/ContentComponent";

export default function ReadPatientView(): JSX.Element {
  return (
    <>
      <ContentComponent>
        <div className="bg-[#F1FAFB] shadow m-4 rounded-xl p-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-24 h-24 md:w-16 md:h-16">
            <img
              src="src/assets/images/user_profil.svg"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            <img
              src="src/assets/images/edit_profil.svg"
              alt="Edit"
              className="absolute top-[-10px] right-[-10px] w-8 h-8 cursor-pointer"
            />
          </div>

          <div className="flex flex-col md:flex-row flex-1 space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-col ml-4 mr-10">
              <p className="font-semibold text-sm text-[#335D84]">
                Manal Mansar
              </p>
              <p className="font-semibold text-sm text-[#335D84]">
                Sexe
                <span className="font-semibold text-sm text-[#1AA5C0] ml-2">
                  Homme
                </span>
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-sm text-[#335D84]">
                Date de naissance
                <span className="font-semibold text-sm text-[#1AA5C0] ml-2">
                  01/03/2002
                </span>
              </p>
              <p className="font-semibold text-sm text-[#335D84]">
                Age
                <span className="font-semibold text-sm text-[#1AA5C0] ml-2">
                  22 ans
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row">
            <button className="bg-[#335D84] text-sm font-normal text-white py-2 px-4 rounded-3xl shadow-md hover:bg-white hover:text-[#335D84] hover:border hover:border-[#335D84] focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5" />
              <span>Réserver un rendez-vous</span>
            </button>
            <button
              style={{
                background:
                  "linear-gradient(90.84deg, #2786DD 2.37%, #19C8D3 101.75%)",
              }}
              className="text-white py-2 px-4 rounded-3xl text-sm font-normal shadow-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
            >
              <ChatBubbleLeftIcon className="w-5 h-5" />
              <span>Démarrer la consultation</span>
            </button>
          </div>
        </div>
      </ContentComponent>
    </>
  );
}
