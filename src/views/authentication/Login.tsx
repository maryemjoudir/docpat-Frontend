import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login(): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = (): void => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="hidden lg:flex flex-1 justify-center items-center">
        <img
          className="h-[454px] object-cover"
          src="/src/assets/images/maps.png"
          alt="Map Image"
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-8 h-full">
        <form className="bg-white p-6 rounded-lg shadow-md p-10 w-full max-w-sm">
          <h6 className="text-base mb-6 text-center text-[#50799E] font-semibold">
            Connectez-vous à votre compte
          </h6>
          <div className="mb-4 relative">
            <select className="block mt-1 p-2 text-[#1AA5C0] font-normal border-2 border-[#50799E] rounded w-full focus:outline-none focus:border-[#50799E] appearance-none custom-select">
              <option value="" disabled selected>
                Choisissez une box
              </option>
              <option value="Box1">Box 1</option>
            </select>
            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-[#50799E]"></i>
          </div>
          <div className="mb-4 relative">
            <select className="block mt-1 p-2 text-[#1AA5C0] font-normal border-2 border-[#50799E] rounded w-full focus:outline-none focus:border-[#50799E] appearance-none custom-select">
              <option value="" disabled selected>
                Choisissez un hôpital
              </option>
              <option value="UmAmezmiz">UM Amezmiz</option>
            </select>
            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-[#50799E]"></i>
          </div>
          <div className="mb-4">
            <hr className="border-t-1 border-[#E5EBF0]" />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="mt-1 p-2 border border-[#50799E] rounded w-full focus:outline-none focus:border-[#50799E]"
              placeholder="Entrez votre identifiant"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              className="mt-1 p-2 border border-[#50799E] rounded w-full focus:outline-none focus:border-[#50799E]"
              placeholder="Tapez votre mot de passe"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={handleTogglePassword}
            >
              {showPassword ? (
                <FaEyeSlash className="text-[#50799E]" />
              ) : (
                <FaEye className="text-[#50799E]" />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="btnSub text-white py-2 px-4 rounded hover:border-[#50799E] w-full flex items-center justify-center"
          >
            <span className="mr-2 text-sm">Connexion</span>
            <span className="flex items-center mt-1">
              <i className="fas fa-chevron-right text-xs"></i>
              <i className="fas fa-chevron-right text-xs"></i>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
