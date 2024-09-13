import { FormEvent, useEffect, useState } from "react";
import { FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router-dom";
import AuthenticationService from "../../services/auth/AuthenticationService";

export default function Login(): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePassword = (password: string): boolean => password.length >= 8;
  const handleTogglePassword = (): void => {
    setShowPassword((prev) => !prev);
  };
  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !validateEmail(email)) {
      console.error("Invalid email");
      setErrorMessage("Please provide a valid email address");
      return;
    }

    if (!password || !validatePassword(password)) {
      console.error("Invalid password");
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }

    AuthenticationService.login(email, password)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        form.reset();
        navigate("/patient");
      })
      .catch((error) => {
        console.error("There was an error with the login!", error);
        setErrorMessage("An error occurred");
      });
  };

  useEffect(() => {
    if (location.pathname === "/login") {
      localStorage.removeItem("token");
    }
  }, [location]);

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
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-md p-10 w-full max-w-sm"
        >
          <h6 className="text-base mb-6 text-center text-[#50799E] font-semibold">
            Connectez-vous à votre compte
          </h6>
          {errorMessage && (
            <p className="text-red-500 bg-red-100 rounded-lg p-2 text-sm flex items-center mt-2">
              <FaExclamationCircle className="mr-2" />
              {errorMessage}
            </p>
          )}
          <div className="mb-4 relative">
            <select
              defaultValue={"default"}
              className="block mt-1 p-2 text-[#1AA5C0] font-normal border-2 border-[#50799E] rounded w-full focus:outline-none focus:border-[#50799E] appearance-none custom-select"
            >
              <option value="default" disabled>
                Choisissez une box
              </option>
              <option value="Box1">Box 1</option>
            </select>
            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-[#50799E]"></i>
          </div>
          <div className="mb-4 relative">
            <select
              defaultValue={"default"}
              className="block mt-1 p-2 text-[#1AA5C0] font-normal border-2 border-[#50799E] rounded w-full focus:outline-none focus:border-[#50799E] appearance-none custom-select"
            >
              <option value="default" disabled>
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
              name="email"
              className="mt-1 p-2 border border-[#50799E] rounded w-full focus:outline-none focus:border-[#50799E]"
              placeholder="Entrez votre identifiant"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
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
            className="btnSub text-white py-2 px-4 rounded hover:border-[#50799E] w-full flex items-center justify-center focus:outline-none"
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
