import LocationMaster, { City, Country } from "../models/Master.js";
import { UserRole } from "../models/userRole.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cities from "../utils/seeds/cities.js";
import countries from "../utils/seeds/countries.js";

// Create role
const createRole = asyncHandler(async (req, res) => {
  const { name, role_id, active } = req.body;
  console.log("🎯 Inside createRole controller", req.body);

  const requiredFields = { name, role_id };

  const missingFields = Object.keys(requiredFields).filter(
    (field) => !requiredFields[field] || requiredFields[field] === "undefined"
  );

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json(
        new ApiError(400, `Missing required field: ${missingFields.join(", ")}`)
      );
  }

  const existingRole = await UserRole.findOne({ role_id });
  if (existingRole) {
    return res
      .status(409)
      .json(new ApiError(409, `Role with role_id ${role_id} already exists`));
  }

  const createdRole = await UserRole.create({
    name,
    role_id,
    active,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdRole, "Role created successfully"));
});

// Update role
const updateRole = asyncHandler(async (req, res) => {
  if (req.params.id == "undefined" || !req.params.id) {
    return res.status(400).json(new ApiError(400, "id not provided"));
  }

  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json(new ApiError(400, "No data provided to update"));
  }

  const { name, role_id, active } = req.body;

  const updatedRole = await UserRole.findByIdAndUpdate(
    req.params.id,
    {
      name,
      role_id,
      active,
    },
    { new: true }
  );

  if (!updatedRole) {
    return res.status(404).json(new ApiError(404, "Role not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedRole, "Role updated successfully"));
});

// get all Role
const getAllRole = asyncHandler(async (req, res) => {
  const { search = "" } = req.query;
  const { filter = {}, page, limit, sortOrder } = req.body;

  let searchCondition = {};

  if (search && search !== "undefined") {
    const regex = new RegExp(search, "i");
    searchCondition = {
      $or: [{ name: { $regex: regex } }],
    };
  }

  const combinedFilter = {
    ...filter,
    ...searchCondition,
  };

  const aggregations = [
    {
      $match: combinedFilter,
    },
  ];

  const { newOffset, newLimit, totalPages, totalCount, newSortOrder } =
    await pagination(UserRole, page, limit, sortOrder, aggregations);

  let allRoles = [];

  if (totalCount > 0) {
    allRoles = await UserRole.aggregate([
      ...aggregations,
      {
        $sort: { _id: newSortOrder },
      },
      {
        $skip: newOffset,
      },
      {
        $limit: newLimit,
      },
    ]).exec();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { allRoles, page, limit, totalPages, totalCount },
          "Cancellation Reason fetched successfully"
        )
      );
  } else {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { allRoles, page, limit, totalPages, totalCount },
          "Cancellation Reason not found"
        )
      );
  }
});

// Get role by id
const getRoleById = asyncHandler(async (req, res) => {
  if (req.params.id == "undefined" || !req.params.id) {
    return res.status(400).json(new ApiError(400, "id not provided"));
  }

  const role = await UserRole.findById(req.params.id);

  if (!role) {
    return res.status(404).json(new ApiError(404, "Role not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, role, "Role fetched successfully"));
});

// Get all active permission
const getAllActiveRole = asyncHandler(async (req, res) => {
  const role = await UserRole.find({ active: true }).sort({ _id: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, role, "Role fetched successfully"));
});



//location masters
const createLocation = asyncHandler(async (req, res) => {
  const { country, city, street, coordinates } = req.body;

  if (!country || !city || !street || !coordinates) {
    return res.status(400).json(new ApiError(400, "Missing required fields"));
  }

  // check if same location already exists
  const existing = await LocationMaster.findOne({ country, city, street });
  if (existing) {
    return res
      .status(409)
      .json(new ApiError(409, "Location already exists"));
  }

  const location = await LocationMaster.create({
    country,
    city,
    street,
    coordinates,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, location, "Location created successfully"));
});

// Get all locations, optionally filter by country
// const getLocations = asyncHandler(async (req, res) => {
//   const { country } = req.query;
//   const filter = {};
//   if (country) filter.country = country;

//   const locations = await LocationMaster.find(filter).populate("country");
//   return res.status(200).json(new ApiResponse(200, locations, "Locations fetched"));
// });


// Get all locations
const getLocations = asyncHandler(async (req, res) => {
  const locations = await Location.find().populate("country");
  return res
    .status(200)
    .json(new ApiResponse(200, locations, "Locations fetched"));
});

// Update location
const updateLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const location = await LocationMaster.findByIdAndUpdate(id, req.body, { new: true });
  if (!location) return res.status(404).json(new ApiError(404, "Location not found"));

  return res.status(200).json(new ApiResponse(200, location, "Location updated"));
});

// Delete location
const deleteLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const location = await Location.findByIdAndDelete(id);
  if (!location)
    return res.status(404).json(new ApiError(404, "Location not found"));
  return res.status(200).json(new ApiResponse(200, null, "Location deleted"));
});




//country & city master
// create country
const createCountry = asyncHandler(async (req, res) => {

  if (!Array.isArray(countries) || countries.length === 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, "No countries provided"));
  }

  const createdCountry = await Country.create(countries);

  return res
    .status(201)
    .json(new ApiResponse(201, createdCountry, "Country created successfully")
    );
})


//UpdateCountry
const updateCountry = asyncHandler(async (req, res) => {
  const { countryId } = req.params;
  const updatedCountryData = req.body;

  if (!updatedCountryData || Object.keys(updatedCountryData).length === 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "No data provided to update"));
  }

  const country = await Country.findById(countryId);

  if (!country) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Country not found"));
  }

  const updatedCountry = await Country.findByIdAndUpdate(
    countryId,
    updatedCountryData,
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCountry, "Country updated successfully"));
});


// get all country
const getAllCountry = asyncHandler(async (req, res) => {
  const allCountry = await Country.find();

  return res
    .status(200)
    .json(new ApiResponse(200, allCountry, "Country fetched successfully")
    );
});


// get Country by Id
const getCountryById = asyncHandler(async (req, res) => {

  if (req.params.id == "undefined" || !req.params.id) {
    return res.status(400).json(new ApiError(400, "id not provided"));
  }

  const country = await Country.findById(req.params.id);

  if (!country) {
    return res
      .status(404)
      .json(new ApiError(404, "Country not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, country, "Country fetched successfully")
    );
});


//deleteallcountry
const deleteAllCountry = asyncHandler(async (req, res) => {

  await Country.deleteMany({});

  return res
    .status(200)
    .json(new ApiResponse(200, null, "All country deleted successfully"));
});


// createcity
const createCity = asyncHandler(async (req, res) => {

  if (!Array.isArray(cities) || cities.length === 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, "No cities provided"));
  }

  const createdCity = await City.create(cities);

  return res
    .status(201)
    .json(new ApiResponse(201, createdCity, "City created successfully")
    );
})


//update city by city id
const updateCity = asyncHandler(async (req, res) => {
  const { cityId } = req.params;
  const updatedCityData = req.body;

  if (!cityId || cityId === "undefined") {
    return res.status(400).json(new ApiError(400, "City ID not provided"));
  }


  if (!updatedCityData || Object.keys(updatedCityData).length === 0) {
    return res.status(400).json(new ApiError(400, "No data provided to update"));
  }

  const city = await City.findById(cityId);

  if (!city) {
    return res.status(404).json(new ApiError(404, "City not found"));
  }


  // Update the city data
  const updatedCity = await City.findByIdAndUpdate(
    cityId,
    updatedCityData,
    { new: true }
  );

  return res.status(200).json(
    new ApiResponse(200, updatedCity, "City updated successfully")
  );
});


// get all City by country
const getAllCity = asyncHandler(async (req, res) => {

  if (req.params.countryId == "undefined" || !req.params.countryId) {
    return res.status(400).json(new ApiError(400, "id not provided"));
  }
  const allCity = await City.find({ country: req.params.countryId });

  return res
    .status(200)
    .json(new ApiResponse(200, allCity, "City fetched successfully")
    );
});


// get City by Id
const getCityById = asyncHandler(async (req, res) => {

  if (req.params.id == "undefined" || !req.params.id) {
    return res.status(400).json(new ApiError(400, "id not provided"));
  }

  const city = await City.findById(req.params.id);

  if (!city) {
    return res
      .status(404)
      .json(new ApiError(404, "City not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, city, "City fetched successfully")
    );
});


//deleteAllcities
const deleteAllCities = asyncHandler(async (req, res) => {

  await City.deleteMany({});

  return res
    .status(200)
    .json(new ApiResponse(200, null, "All cities deleted successfully"));
});


export {
  createRole,
  updateRole,
  getAllRole,
  getRoleById,
  getAllActiveRole,
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation,
  createCountry,
  updateCountry,
  getAllCountry,
  getCountryById,
  deleteAllCountry,

  createCity,
  updateCity,
  getAllCity,
  getCityById,
  deleteAllCities,
};
