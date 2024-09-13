import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import PatientService from "../../services/patients/PatientService";
import { useAppSelector } from "../../store/store";

interface Patient {
  nationalId: string;
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: string;
  coverage: string;
  region: string;
  city: string;
  district: string;
  mobilePhone: string;
  address: string;
  complementAdresse: string;
}

const FichePatient: React.FC = () => {
  const patientId = useAppSelector((state) => state.patient.selectedPatientId);
  const [patientData, setPatientData] = useState<Patient | null>(null);

  useEffect(() => {
    if (patientId) {
      getPatient(patientId);
    }
  }, [patientId]);

  const getPatient = (id: number) => {
    PatientService.read(id)
      .then((response) => {
        if (response.data) {
          setPatientData(response.data);
        } else {
          console.error("No patient data received");
        }
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[#1AA5C0] font-bold text-xl">Patient</h1>
        <button className="bg-gray-600 text-white text-sm font-normal border-none rounded-full py-2 px-4 flex items-center">
          <FaEdit className="mr-2" />
          Modifier
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-2">
        <div className="font-semibold text-[#50799E] text-sm">CINE</div>
        <div className="font-semibold text-[#50799E] text-sm">Nom</div>
        <div className="font-semibold text-[#50799E] text-sm">Prénom</div>
        <div className="font-semibold text-[#50799E] text-sm">Sexe</div>
        <div className="font-semibold text-[#50799E] text-sm">
          Date de naissance
        </div>
        <div className="text-[#5E5E5E] font-semibold">
          {patientData?.nationalId}
        </div>
        <div className="text-[#5E5E5E] font-semibold">
          {patientData?.lastName}
        </div>
        <div className="text-[#5E5E5E] font-semibold">
          {patientData?.firstName}
        </div>
        <div className="text-[#5E5E5E] font-semibold">{patientData?.sex}</div>
        <div className="text-[#5E5E5E] font-semibold">
          {patientData?.birthDate}
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid grid-cols-5 gap-4 mb-2">
        <div className="font-semibold text-[#50799E] text-sm">Couverture</div>
        <div className="font-semibold text-[#50799E] text-sm">Région</div>
        <div className="font-semibold text-[#50799E] text-sm">Ville</div>
        <div className="font-semibold text-[#50799E] text-sm">Commune</div>
        <div></div>
        <div className="text-[#5E5E5E] font-semibold">
          {patientData?.coverage}
        </div>
        <div className="text-[#5E5E5E] font-semibold">
          {patientData?.region}
        </div>
        <div className="text-[#5E5E5E] font-semibold">{patientData?.city}</div>
        <div className="text-[#5E5E5E] font-semibold">
          {patientData?.district}
        </div>
        <div className="text-[#5E5E5E] font-semibold"></div>
      </div>

      <hr className="my-4" />

      <div className="grid grid-cols-5 gap-4 mb-2">
        <div className="font-semibold text-[#50799E] text-sm">
          Téléphone mobile
        </div>
        <div className="font-semibold text-[#50799E] text-sm">Adresse</div>
        <div></div>
        <div className="font-semibold text-[#50799E] text-sm">
          Complément d’adresse
        </div>
        <div></div>
        <div className="text-[#5E5E5E] font-semibold">
          {patientData?.mobilePhone}
        </div>
        <div className="text-[#5E5E5E] font-semibold">
          {patientData?.address}
        </div>
        <div></div>
        <div>{patientData?.complementAdresse}</div>
        <div></div>
      </div>
    </div>
  );
};

export default FichePatient;
