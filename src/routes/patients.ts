import express from "express";
import patientsService from "./../services/patientsService";
import toNewPatient from "./../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getNonSensitivePatientsInfo();
  res.send(patients);
});

router.get("/sensitive/", (_req, res) => {
  const sensitivePatients = patientsService.getSensitivePatientsInfo();
  res.send(sensitivePatients);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatient(id);
  res.send(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
