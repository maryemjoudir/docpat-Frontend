import { useState } from "react";
import { ContentComponent } from "../../components/commons/ContentComponent";
import PatientService from "../../services/patients/PatientService";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { FaExclamationCircle } from "react-icons/fa";

export default function AddPatientView(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const initialFormData = {
    firstName: "",
    lastName: "",
    birthDate: "",
    sex: "",
    region: "",
    city: "",
    district: "",
    mobilePhone: "",
    nationalId: "",
    coverage: "",
    address: "",
    complementAdresse: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [age, setAge] = useState<number>(0);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "birthDate") {
      const birthDate = new Date(value);
      const today = new Date();
      const ageInYears = today.getFullYear() - birthDate.getFullYear();
      setAge(ageInYears);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setAge(null);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields: { field: keyof typeof formData; message: string }[] =
      [
        { field: "lastName", message: "Nom ne doit pas être vide" },
        { field: "firstName", message: "Prénom ne doit pas être vide" },
        {
          field: "birthDate",
          message: "Date de naissance ne doit pas être vide",
        },
        { field: "region", message: "Région ne doit pas être vide" },
        { field: "city", message: "Ville ne doit pas être vide" },
        { field: "district", message: "Commune ne doit pas être vide" },
        { field: "nationalId", message: "CINE mobile ne doit pas être vide" },
        { field: "coverage", message: "Couverture ne doit pas être vide" },
        {
          field: "complementAdresse",
          message: "Complément d’adresse ne doit pas être vide",
        },
        { field: "sex", message: "Sexe ne doit pas être vide" },
      ];

    const errors = requiredFields
      .filter(({ field }) => !formData[field])
      .map(({ message }) => message);

    if (errors.length > 0) {
      setErrorMessage(errors.join(", "));
      return;
    }

    PatientService.create(formData)
      .then(() => {
        setFormData(initialFormData);
        toast.success("Dossier s'ajoute avec succès !");
      })
      .catch(() => {
        toast.error("Une erreur est survenue");
      });
  };

  return (
    <>
      <ContentComponent>
        <div>
          <div className="flex items-center space-x-2 p-4">
            <img
              src="src/assets/images/newD.svg"
              alt="Recherche"
              className="w-7 h-7"
            />
            <span className="text-xl font-semibold text-[#50799E]">
              Nouveau dossier
            </span>
          </div>
          {errorMessage && (
            <p className="text-red-500 bg-red-100 rounded-lg p-2 text-sm flex items-center mt-2">
              <FaExclamationCircle className="mr-2" />
              {errorMessage}
            </p>
          )}
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#50799E] mb-2">
                    CINE<span className="text-[#1AA5C0]">*</span>
                  </label>
                  <input
                    type="text"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    placeholder="CINE"
                    className="border  bg-transparent border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#50799E] placeholder:text-gray-200 placeholder:text-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#50799E] mb-2">
                    Nom<span className="text-[#1AA5C0]">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border  bg-transparent border-gray-300 rounded-md p-2 focus:outline-none placeholder:text-gray-200 placeholder:text-sm focus:border-[#50799E]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#50799E] mb-2">
                    Prénom<span className="text-[#1AA5C0]">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border  bg-transparent border-gray-300 rounded-md p-2 placeholder:text-gray-200 placeholder:text-sm focus:outline-none focus:border-[#50799E]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#50799E] mb-2">
                    Sexe<span className="text-[#1AA5C0]">*</span>
                  </label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    className="border  bg-transparent border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#50799E]"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#50799E] mb-2">
                      Date de naissance<span className="text-[#1AA5C0]">*</span>
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="border bg-transparent border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#50799E] w-64"
                    />
                  </div>
                  {age !== null && (
                    <div
                      className="flex items-center mt-7 justify-center text-sm text-white font-semibold bg-[#50799E] rounded-md p-3"
                      style={{ minWidth: "100px", maxWidth: "20%" }}
                    >
                      {age} ans
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#50799E] mb-2">
                    Couverture<span className="text-[#1AA5C0]">*</span>
                  </label>
                  <select
                    name="coverage"
                    value={formData.coverage}
                    onChange={handleChange}
                    className="border  bg-transparent border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#50799E]"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="option1">CNOPS</option>
                    <option value="option2">CNSS</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#50799E] mb-2">
                    Région<span className="text-[#1AA5C0]">*</span>
                  </label>
                  <input
                    type="text"
                    name="region"
                    placeholder="Région"
                    value={formData.region}
                    onChange={handleChange}
                    className="border  bg-transparent border-gray-300 rounded-md p-2 focus:outline-none placeholder:text-gray-200 placeholder:text-sm focus:border-[#50799E]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#50799E] mb-2">
                    Ville<span className="text-[#1AA5C0]">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Ville"
                    value={formData.city}
                    onChange={handleChange}
                    className="border border-gray-300  bg-transparent rounded-md p-2 placeholder:text-gray-200 placeholder:text-sm focus:outline-none focus:border-[#50799E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#50799E] mb-2">
                    Commune<span className="text-[#1AA5C0]">*</span>
                  </label>
                  <input
                    type="text"
                    name="district"
                    placeholder="Commune"
                    value={formData.district}
                    onChange={handleChange}
                    className="border border-gray-300  bg-transparent placeholder:text-gray-200 placeholder:text-sm rounded-md p-2 focus:outline-none focus:border-[#50799E]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#50799E] mb-2">
                    Téléphone mobile
                  </label>
                  <input
                    type="text"
                    name="mobilePhone"
                    placeholder="Télephone"
                    value={formData.mobilePhone}
                    onChange={handleChange}
                    className="border border-gray-300  bg-transparent rounded-md p-2 placeholder:text-gray-200 placeholder:text-sm focus:outline-none focus:border-[#50799E]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#50799E] mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Adresse"
                    value={formData.address}
                    onChange={handleChange}
                    className="border border-gray-300  bg-transparent placeholder:text-gray-200 placeholder:text-sm rounded-md p-2 focus:outline-none focus:border-[#50799E]"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-[#50799E] mb-2">
                  Complément d’adresse<span className="text-[#1AA5C0]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Complément Adresse"
                  name="complementAdresse"
                  value={formData.complementAdresse}
                  onChange={handleChange}
                  className="border border-gray-300  bg-transparent rounded-md p-2 placeholder:text-gray-200 placeholder:text-sm w-full focus:outline-none focus:border-[#50799E]"
                />
              </div>

              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-600 hover:text-gray-600 hover:border hover:border-gray-600 hover:bg-white focus:border focus:border-gray-600 focus:text-gray-300 focus:bg-white text-sm px-16 py-2 rounded-md focus:outline-none"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-[#1AA5C0] text-white text-sm px-16 py-2 rounded-md hover:text-[#1AA5C0] hover:bg-white hover:border focus:border-[#1AA4C0]  focus:outline-none"
                >
                  Terminer
                </button>
              </div>
            </form>
          </div>
        </div>
      </ContentComponent>
      <ToastContainer />
    </>
  );
}
