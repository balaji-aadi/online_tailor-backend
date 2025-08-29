import { Router } from "express";
import {
  createCity,
  createCountry,
  createFabric,
  createLocation,
  createRole,
  createSpecialties,
  createSpecialty,
  deleteAllCities,
  deleteAllCountry,
  deleteAllSpecialties,
  deleteFabric,
  deleteLocation,
  deleteSpecialty,
  getAllActiveRole,
  getAllCity,
  getAllCountry,
  getAllFabric,
  getAllRole,
  getAllSpecialties,
  getCityById,
  getCountryById,
  getLocations,
  getRoleById,
  getSpecialtyById,
  updateCity,
  updateCountry,
  updateFabric,
  updateFabricStatus,
  updateLocation,
  updateRole,
  updateSpecialty,
} from "../controllers/masterController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/role.middleware.js";
import multer from "../middleware/multer.middleware.js";

const router = Router();

//specialties
router.post("/create-Specialties",verifyJWT,createSpecialties);
router.post("/create-Specialty", verifyJWT,createSpecialty);
router.put("/update-Specialty/:specialtyId",verifyJWT, updateSpecialty);
router.get("/get-All-Specialties",getAllSpecialties);
router.get("/get-Specialty-By-Id/:id", verifyJWT,getSpecialtyById);
router.delete("/delete-Specialty/:id",verifyJWT, deleteSpecialty);
router.delete("/delete-All-Specialties",verifyJWT, deleteAllSpecialties);

//user role
router.route("/create-role").post(createRole);
router.route("/update-role/:id").put(verifyJWT, adminOnly, updateRole);
router.route("/get-all-role").post(getAllRole);
router.route("/get-role-by-id/:id").get(verifyJWT, getRoleById);
router.route("/get-active-role").get(getAllActiveRole);

//fabric
router.route("/create-fabric").post(verifyJWT,multer.uploadSingle("image"), createFabric);
// router.route("/create-fabric-by-tailor").post(createFabric);
router.route("/fabric-approval").post(updateFabricStatus);
router.route("/update-fabric/:id").put(updateFabric);
router.route("/get-all-fabrics").post(getAllFabric);
router.route("/delete-fabric/:id").post(deleteFabric);

//location master
router.post("/create-location", verifyJWT, adminOnly, createLocation);
router.get("/get-all-locations", getLocations);
router.put("/update-location/:id", verifyJWT, adminOnly, updateLocation);
router.delete("/delete-location/:id", verifyJWT, adminOnly, deleteLocation);

// // routes for Country
router.route("/create-country").post(createCountry);
router.route("/update-country/:countryId").put(updateCountry);
router.route("/get-all-country").get(getAllCountry);
router.route("/get-country/:id").get(getCountryById);
router.route("/delete-all-country").delete(deleteAllCountry);

// // routes for City
router.route("/create-city").post(createCity);
router.route("/update-city/:cityId").put(updateCity);
router.route("/get-all-city/:countryId").get(getAllCity);
router.route("/get-city/:id").get(getCityById);
router.route("/delete-all-city").delete(deleteAllCities);

export default router;
