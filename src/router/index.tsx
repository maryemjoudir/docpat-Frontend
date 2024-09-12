import { Route, Routes } from "react-router-dom";
import { GlobalComponent } from "../components/commons/GlobalComponent";
import Login from "../views/authentication/Login";
import PatientView from "../views/patients/PatientView";
import AddPatientView from "../views/patients/AddPatientView";

export function Index() {
  return (
    <Routes>
      <Route path="/" element={<GlobalComponent />}>
        <Route path="login" element={<Login />} />
        <Route path="patient" element={<PatientView />} />
        <Route path="add" element={<AddPatientView />} />
      </Route>
    </Routes>
  );
}
