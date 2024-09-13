import { Route, Routes } from "react-router-dom";
import { GlobalComponent } from "../components/commons/GlobalComponent";
import Login from "../views/authentication/Login";
import PatientView from "../views/patients/PatientView";
import AddPatientView from "../views/patients/AddPatientView";
import ReadPatientView from "../views/patients/ReadPatientView";
import ProtectedRoute from "./ProtectedRoute";

export function Index() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<GlobalComponent />}>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute token={token} />}>
          <Route path="patient" element={<PatientView />} />
          <Route path="add" element={<AddPatientView />} />
          <Route path="read" element={<ReadPatientView />} />
        </Route>
      </Route>
    </Routes>
  );
}
