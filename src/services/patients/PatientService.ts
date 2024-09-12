import http from "../../http-common";

interface PatientData {
  firstName: string;
  lastName: string;
  birthDate: string;
  sex: string;
  region: string;
  city: string;
  district: string;
  mobilePhone: string;
  nationalId: string;
  coverage: string;
  address: string;
  complementAdresse: string;
}

const create = (data: PatientData) => {
  console.log(data);
  return http.post("/patients", data);
};

const read = (id: number) => {
  return http.get(`/patients/${id}`);
};

const getAll = () => {
  return http.get("/patients");
};

const PatientService = {
  create,
  read,
  getAll,
};

export default PatientService;
