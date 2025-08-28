import { Router } from "express";
import { createCity, createCountry, createLocation, createRole, deleteAllCities, deleteAllCountry, deleteLocation, getAllActiveRole, getAllCity, getAllCountry, getAllRole, getCityById, getCountryById, getLocations, getRoleById, updateCity, updateCountry, updateLocation, updateRole } from "../controllers/masterController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

const router = Router()

//user role
router.route("/create-role").post(createRole);
router.route("/update-role/:id").put(verifyJWT, adminOnly, updateRole);
router.route("/get-all-role").post(getAllRole);
router.route("/get-role-by-id/:id").get(verifyJWT, getRoleById);
router.route("/get-active-role").get(getAllActiveRole);

//location master
router.post("/create-location",verifyJWT, adminOnly, createLocation);
router.get("/get-all-locations",getLocations);
router.put("/update-location/:id",verifyJWT, adminOnly, updateLocation);
router.delete("/delete-location/:id",verifyJWT, adminOnly, deleteLocation);

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