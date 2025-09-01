import { Router } from "express";
import {
  createCategory,
  createCity,
  createCountry,
  createFabric,
  createLocation,
  createMeasurement,
  createMeasurements,
  createMeasurementTemplate,
  createRole,
  createSpecialties,
  createSpecialty,
  createTax,
  deleteAllCities,
  deleteAllCountry,
  deleteAllSpecialties,
  deleteCategory,
  deleteFabric,
  deleteLocation,
  deleteMeasurement,
  deleteMeasurementTemplate,
  deleteSpecialty,
  deleteTax,
  getActiveTax,
  getAllActiveRole,
  getAllCity,
  getAllCountry,
  getAllFabric,
  getAllMeasurements,
  getAllMeasurementTemplates,
  getAllRole,
  getAllSpecialties,
  getCategories,
  getCategoryById,
  getCityById,
  getCountryById,
  getLocations,
  getMeasurementById,
  getMeasurementTemplateById,
  getRoleById,
  getSpecialtyById,
  getTaxes,
  updateCategory,
  updateCity,
  updateCountry,
  updateFabric,
  updateFabricStatus,
  updateLocation,
  updateMeasurement,
  updateMeasurementTemplate,
  updateRole,
  updateSpecialty,
  updateTax,
} from "../controllers/masterController.js";
import { adminOnly, verifyJWT } from "../middleware/authMiddleware.js";
import multer from "../middleware/multer.middleware.js";

const router = Router();
 
  

//Tax Master
router.route("/create-tax").post(verifyJWT,adminOnly,createTax);
router.route("/update-tax/:id").put(verifyJWT,adminOnly,updateTax);
router.route("/get-all-taxes").post(getTaxes);
router.route("/get-active-tax").get(verifyJWT, getActiveTax);
router.delete("/delete-tax/:id",verifyJWT,adminOnly, deleteTax);

//Category
router.route("/create-category").post(verifyJWT,createCategory);
router.route("/update-category/:id").put(verifyJWT,updateCategory);
router.route("/get-all-categories").post(getCategories);
router.route("/get-category-by-id/:id").get(verifyJWT, getCategoryById);
router.delete("/delete-category/:id",verifyJWT, deleteCategory);


//specialties
router.post("/create-Specialties",verifyJWT,createSpecialties);
router.post("/create-Specialty", verifyJWT,multer.uploadSingle("image"),createSpecialty);
router.put("/update-Specialty/:specialtyId",verifyJWT,multer.uploadSingle("image"), updateSpecialty);
router.get("/get-All-Specialties",getAllSpecialties);
router.get("/get-Specialty-By-Id/:id", verifyJWT,getSpecialtyById);
router.delete("/delete-Specialty/:id",verifyJWT, deleteSpecialty);
router.delete("/delete-All-Specialties",verifyJWT, deleteAllSpecialties);

//measurement templates
router.route("/create-measurement-templates").post(verifyJWT,multer.uploadMultiple("image"),createMeasurementTemplate);
router.route("/update-measurement-templates/:id").put(verifyJWT, multer.uploadMultiple("image"), updateMeasurementTemplate);
router.route("/get-all-measurement-templates").post(getAllMeasurementTemplates);
router.route("/get-measurement-templates-by-id/:id").get(verifyJWT, getMeasurementTemplateById);
router.delete("/delete-measurement-templates/:id",verifyJWT, deleteMeasurementTemplate);

//user role
router.route("/create-role").post(createRole);
router.route("/update-role/:id").put(verifyJWT, adminOnly, updateRole);
router.route("/get-all-role").post(getAllRole);
router.route("/get-role-by-id/:id").get(verifyJWT, getRoleById);
router.route("/get-active-role").get(getAllActiveRole);

//Measurements Master
router.route("/create-measurements").post(createMeasurements);
router.route("/create-measurement").post(createMeasurement);
router.route("/update-measurement/:id").put(verifyJWT, updateMeasurement);
router.route("/get-all-measurement").post(getAllMeasurements);
router.route("/get-measurement-by-id/:id").get(verifyJWT, getMeasurementById);
router.route("/delete-measurement-by-id/:id").delete(verifyJWT, deleteMeasurement);

//fabric
router.route("/create-fabric").post(verifyJWT,multer.uploadMultiple("image"), createFabric);
router.route("/fabric-approval").post(updateFabricStatus);
router.route("/update-fabric/:id").put(verifyJWT,multer.uploadMultiple("image"),updateFabric);
router.route("/get-all-fabrics").post(getAllFabric);
router.route("/delete-fabric/:id").delete(deleteFabric);

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
