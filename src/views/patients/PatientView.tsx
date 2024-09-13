import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { ContentComponent } from "../../components/commons/ContentComponent";
import { FaFilter, FaUserPlus, FaAngleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import PatientService from "../../services/patients/PatientService";
import { useAppDispatch } from "../../store/store";
import { selectPatientById } from "../../store/features/PatientSlice";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  sex: string;
  nationalId: string;
  coverage: string;
  dateCreation: string;
  dateEdition: string;
}

export default function PatientView(): JSX.Element {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [patientsPerPage] = useState<number>(6);
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  const handleSelectPatient = (id: number) => {
    dispatch(selectPatientById(id));
    navigate("/read");
  };
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await PatientService.getAll();
        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    setFilteredPatients(
      patients.filter(
        (patient) =>
          patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.nationalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.coverage.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.sex.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, patients]);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredPatients.length / patientsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ContentComponent>
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between p-4">
          <div className="flex flex-wrap items-center space-x-2">
            <img
              src="src/assets/images/search.svg"
              alt="Recherche"
              className="w-7 h-7 mt-1"
            />
            <span className="text-xl font-semibold text-[#50799E]">
              Recherche de patients
            </span>
            <div className="flex items-center bg-white border border-[#50799E] rounded-3xl p-2 shadow-sm flex-grow md:w-auto w-full">
              <input
                type="text"
                placeholder="Recherche par (Nom, Prénom, CINE...)"
                className="outline-none flex-grow px-2 md:w-64 lg:w-80 placeholder:text-[#698DA95E] placeholder:text-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img
                src="src/assets/images/search_.svg"
                alt="Recherche"
                className="w-5 h-5 ml-2"
              />
            </div>
            <button className="flex items-center bg-white text-[#1AA5c0] border border-[#50799E] hover:text-white focus:text:white hover:bg-[#0D88B4] focus:bg-[#0D88B4] text-[12px] rounded-3xl pl-2 h-11 shadow-sm">
              <FaFilter className="mr-2 text-[#50799E] w-3 h-3" />
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
        <div className="mt-4 border border-[#50799E] rounded-lg pl-4 pr-4 ml-4 mr-4 overflow-auto">
          <table className="min-w-full bg-transparent border-separate border-spacing-0">
            <thead className="bg-transparent">
              <tr className="text-[#1AA5C0]">
                <th className="text-center font-semibold py-3 rounded-tl-lg rounded-tr-lg">
                  Date d’ouverture du dossier
                </th>
                <th className="text-center font-semibold py-3 rounded-tl-lg rounded-tr-lg">
                  Nom
                </th>
                <th className="text-center font-semibold py-3 rounded-tl-lg rounded-tr-lg">
                  Prénom
                </th>
                <th className="text-center font-semibold py-3 rounded-tl-lg rounded-tr-lg">
                  Date de naissance
                </th>
                <th className="text-center font-semibold py-3 rounded-tl-lg rounded-tr-lg">
                  Sexe
                </th>
                <th className="text-center font-semibold py-3 rounded-tl-lg rounded-tr-lg">
                  N°CINE
                </th>
                <th className="text-center font-semibold py-3 rounded-tl-lg rounded-tr-lg">
                  Couverture
                </th>
                <th className="text-center font-semibold py-3 rounded-tl-lg rounded-tr-lg">
                  Dernière mise à jour
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient, index) => (
                <tr
                  key={patient.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-[#50799E1C]" : "bg-transparent"
                  } ${index === 0 ? "rounded-t-lg" : ""} ${
                    index === currentPatients.length - 1 ? "rounded-b-lg" : ""
                  } hover:bg-blue-100`}
                  onClick={() => handleSelectPatient(patient.id)}
                >
                  <td className="text-center font-semibold text-[#50799E] rounded-l-lg py-3">
                    {new Date(patient.dateCreation).toLocaleDateString()}
                  </td>
                  <td className="text-center font-semibold text-[#50799E] py-3">
                    {patient.lastName}
                  </td>
                  <td className="text-center font-semibold text-[#50799E] py-3">
                    {patient.firstName}
                  </td>
                  <td className="text-center font-semibold text-[#50799E] py-3">
                    {new Date(patient.birthDate).toLocaleDateString()}
                  </td>
                  <td className="text-center font-semibold text-[#50799E] py-3">
                    {patient.sex}
                  </td>
                  <td className="text-center font-semibold text-[#50799E] py-3">
                    {patient.nationalId}
                  </td>
                  <td className="text-center font-semibold text-[#50799E] py-3">
                    {patient.coverage}
                  </td>
                  <td className="text-center font-semibold text-[#50799E] py-3">
                    {new Date(patient.dateEdition).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end items-center rounded-lg p-2 bg-white m-4">
          <div className="flex">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-2.5 py-1.5 mx-1 text-sm font-normal rounded-lg focus:outline-none ${
                  number === currentPage
                    ? "shadow text-[#0D88B4]"
                    : "bg-white text-[#0D88B4]"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === pageNumbers.length}
            className="p-2 ml-1 rounded-lg bg-[#50799E] text-white hover:bg-[#50799E] focus:outline-none disabled:bg-gray-300"
          >
            <FaAngleRight />
          </button>
        </div>
      </ContentComponent>
    </>
  );
}
