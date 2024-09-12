import { Link } from "react-router-dom";
import { ContentComponent } from "../../components/commons/ContentComponent";
import { FaFilter, FaUserPlus } from "react-icons/fa";

export default function PatientView(): JSX.Element {
  return (
    <>
      <ContentComponent>
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <img
              src="src/assets/images/search.svg"
              alt="Recherche"
              className="w-7 h-7 mt-1"
            />
            <span className="text-xl font-semibold text-[#50799E] font-semibold">
              Recherche de patients
            </span>
            <div className="flex items-center bg-white border border-[#50799E] rounded-3xl p-2 shadow-sm w-full md:w-auto">
              <input
                type="text"
                placeholder="Recherche par (Nom, Prénom, CINE...)"
                className="outline-none flex-grow px-2 md:w-64 lg:w-80 placeholder:text-[#698DA95E] placeholder:text-xs"
              />
              <img
                src="src/assets/images/search_.svg"
                alt="Recherche"
                className="w-5 h-5 mr-2"
              />
            </div>
            <button className="flex items-center bg-white text-[#1AA5c0] border border-[#50799E] hover:text-white focus:text:white hover:bg-[#0D88B4] focus:bg-[#0D88B4] text-[12px] rounded-3xl pl-2 h-11 shadow-sm ">
              <FaFilter className="mr-2 ml-1 text-[#50799E] w-3 h-3" />
              Filtrer
            </button>
          </div>

          <div className="flex items-center space-x-2 mt-2 md:mt-0 w-full md:w-auto">
            <Link
              to="/add"
              className="flex items-center bg-[#0D88B4] text-white rounded-3xl p-3 shadow-sm font-normal text-sm hover:text-[#0D88B4] hover:bg-white hover:border-[#0D88B4] hover:border focus:text-[#0D88B4] focus:border-[#0D88B4] focus:border focus:bg-white"
            >
              <FaUserPlus className="mr-2 ml-1" />
              Nouveau dossier
            </Link>
          </div>
        </div>
        <div className=" mt-4 border border-[#50799E] rounded-lg pl-4 pr-4 ml-4 mr-4">
          <table className="min-w-full bg-transparent">
            <thead className=" bg-transparent">
              <tr className="text-[#1AA5C0]">
                <th className="text-center font-semibold py-3">
                  Date d’ouverture du dossier
                </th>
                <th className="text-center font-semibold py-3">Nom</th>
                <th className="text-center font-semibold py-3">Prénom</th>
                <th className="text-center font-semibold py-3">
                  Date de naissance
                </th>
                <th className="text-center font-semibold py-3">Sexe</th>
                <th className="text-center font-semibold py-3">N°CINE</th>
                <th className="text-center font-semibold py-3">Couverture</th>
                <th className="text-center font-semibold py-3">
                  Dernière mise à jour
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50 bg-[#50799E1C]">
                <td className="text-center font-semibold text-[#50799E] py-3">
                  01/01/2023
                </td>
                <td className="text-center font-semibold text-[#50799E] py-3">
                  Dupont
                </td>
                <td className="text-center font-semibold text-[#50799E] py-3">
                  Jean
                </td>
                <td className="text-center font-semibold text-[#50799E] py-3">
                  12/12/1990
                </td>
                <td className="text-center font-semibold text-[#50799E] py-3 ">
                  M
                </td>
                <td className="text-center font-semibold text-[#50799E] py-3">
                  AB123456
                </td>
                <td className="text-center font-semibold text-[#50799E] py-3">
                  Mutuelle
                </td>
                <td className="text-center font-semibold text-[#50799E] py-3">
                  02/09/2024
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ContentComponent>
    </>
  );
}
