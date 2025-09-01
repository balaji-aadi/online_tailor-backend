import mongoose from "mongoose";
import LocationMaster, {
  Category,
  City,
  Country,
  Fabric,
  Measurement,
  MeasurementTemplate,
  Specialty,
  TaxMaster,
} from "../models/Master.js";
import { UserRole } from "../models/userRole.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cities from "../utils/seeds/cities.js";
import countries from "../utils/seeds/countries.js";
import specialties from "../utils/seeds/specialties.js";
import predefinedMeasurements from "../utils/seeds/measurements.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../cloudinary.js";



// Create Tax
const createTax = asyncHandler(async (req, res) => {
  const { taxName, value, isActive, valueType } = req.body;

  if (!taxName) throw new ApiError(400, "Tax name is required");
  if (value === undefined) throw new ApiError(400, "Tax value is required");
  if (!valueType || !["percentage", "absolute"].includes(valueType.toLowerCase())) {
    throw new ApiError(400, "Value type must be either 'percentage' or 'absolute'");
  }

  // Check if tax with same name AND valueType already exists (case-insensitive)
  const existingTax = await TaxMaster.findOne({
    taxName: { $regex: new RegExp("^" + taxName + "$", "i") },
    valueType: valueType.toLowerCase()
  });
  if (existingTax) throw new ApiError(400, "A tax with this name and type already exists");

  const tax = await TaxMaster.create({ taxName, value, isActive, valueType: valueType.toLowerCase() });

  // If this tax is active, deactivate all other taxes
  if (isActive) {
    await TaxMaster.updateMany({ _id: { $ne: tax._id } }, { isActive: false });
  }

  return res
    .status(201)
    .json(new ApiResponse(201, tax, "Tax created successfully"));
});
// Update Tax
const updateTax = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { taxName, value, isActive, valueType } = req.body;

  const tax = await TaxMaster.findById(id);
  if (!tax) throw new ApiError(404, "Tax not found");

  if (taxName) tax.taxName = taxName;
  if (value !== undefined) tax.value = value;
  if (valueType && ["percentage", "absolute"].includes(valueType.toLowerCase())) tax.valueType = valueType;
  if (isActive !== undefined) tax.isActive = isActive;

  // If this tax is set active, deactivate all other taxes
  if (isActive) {
    await TaxMaster.updateMany({ _id: { $ne: tax._id } }, { isActive: false });
  }

  await tax.save();

  return res
    .status(200)
    .json(new ApiResponse(200, tax, "Tax updated successfully"));
});
// Get all taxes
const getTaxes = asyncHandler(async (req, res) => {
  const taxes = await TaxMaster.find().sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, taxes, "Taxes fetched successfully"));
});
// Delete Tax
const deleteTax = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // First check if tax exists
  const tax = await TaxMaster.findById(id);
  if (!tax) throw new ApiError(404, "Tax not found");

  // Prevent deletion if active
  if (tax.isActive) {
    throw new ApiError(400, "Cannot delete an active tax. Deactivate it first.");
  }

  // Now safely delete
  await TaxMaster.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Tax deleted successfully"));
});


const getActiveTax = asyncHandler(async (req, res) => {
  const tax = await TaxMaster.findOne({ isActive: true });
  if (!tax) return res.status(404).json(new ApiResponse(404, null, "No active tax found"));

  return res.status(200).json(new ApiResponse(200, tax, "Active tax fetched successfully"));
});


const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) throw new ApiError(400, "Category name is required");

  // 🔍 Check if category already exists (case-insensitive)
  const existingCategory = await Category.findOne({
    name: { $regex: new RegExp("^" + name + "$", "i") },
  });
  if (existingCategory) {
    throw new ApiError(400, "Category with this name already exists");
  }

  // let imageUrl = "";
  // if (req.file) {
  //   const upload = await uploadOnCloudinary(req.file.path);
  //   if (upload?.secure_url) imageUrl = upload.secure_url;
  // }

  const category = await Category.create({
    name,
    description,
    // image: imageUrl,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, "Category not found");

  if (name) category.name = name;
  if (description) category.description = description;

  // if (req.file) {
  //   const upload = await uploadOnCloudinary(req.file.path);
  //   if (upload?.secure_url) category.image = upload.secure_url;
  // }

  await category.save();
  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category updated successfully"));
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, "Category not found");
  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetched successfully"));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new ApiError(404, "Category not found");

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category deleted successfully"));
});

const createMeasurementTemplate = asyncHandler(async (req, res) => {
  let { name, garmentType, description, measurementPoints } = req.body;

  console.log("name:", name);
  console.log("measurementPoints (raw):", measurementPoints);

  if (!name || !garmentType || !measurementPoints) {
    throw new ApiError(
      400,
      "Name, garmentType, and measurementPoints are required"
    );
  }

  // ✅ Parse if stringified JSON
  if (typeof measurementPoints === "string") {
    try {
      measurementPoints = JSON.parse(measurementPoints);
    } catch (err) {
      throw new ApiError(
        400,
        "Invalid measurementPoints format. Must be JSON array."
      );
    }
  }

  // ✅ Check if garmentType exists
  const specialty = await Specialty.findById(garmentType);
  if (!specialty) throw new ApiError(404, "Garment type not found");

  // ✅ Handle images upload
  let images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const upload = await uploadOnCloudinary(file.path);
      if (upload?.secure_url) images.push(upload.secure_url);
    }
  }

  // ✅ Save to DB
  const template = await MeasurementTemplate.create({
    name,
    garmentType,
    description,
    image: images,
    measurementPoints,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        template,
        "Measurement template created successfully"
      )
    );
});

// ---------------- Update Template ----------------
const updateMeasurementTemplate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let { name, garmentType, description, measurementPoints } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ID");
  }

  const template = await MeasurementTemplate.findById(id);
  if (!template) throw new ApiError(404, "Template not found");

  if (garmentType) {
    const specialty = await Specialty.findById(garmentType);
    if (!specialty) throw new ApiError(404, "Garment type not found");
    template.garmentType = garmentType;
  }

  if (name) template.name = name;
  if (description) template.description = description;

  if (measurementPoints) {
    if (typeof measurementPoints === "string") {
      try {
        measurementPoints = JSON.parse(measurementPoints);
      } catch (err) {
        throw new ApiError(
          400,
          "Invalid measurementPoints format. Must be a JSON array."
        );
      }
    }
    template.measurementPoints = measurementPoints;
  }

  // Handle images
  if (req.files && req.files.length > 0) {
    template.image = []; // overwrite old images
    for (const file of req.files) {
      const upload = await uploadOnCloudinary(file.path);
      if (upload?.secure_url) template.image.push(upload.secure_url);
    }
  }

  await template.save();
  return res
    .status(200)
    .json(new ApiResponse(200, template, "Template updated successfully"));
});

// ---------------- Get All Templates ----------------
const getAllMeasurementTemplates = asyncHandler(async (req, res) => {
  const templates = await MeasurementTemplate.find().populate(
    "garmentType",
    "name"
  );
  return res
    .status(200)
    .json(new ApiResponse(200, templates, "Templates fetched successfully"));
});

// ---------------- Get Template By ID ----------------
const getMeasurementTemplateById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Invalid ID");

  const template = await MeasurementTemplate.findById(id).populate(
    "garmentType",
    "name"
  );
  if (!template) throw new ApiError(404, "Template not found");

  return res
    .status(200)
    .json(new ApiResponse(200, template, "Template fetched successfully"));
});

// ---------------- Delete Template ----------------
const deleteMeasurementTemplate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Invalid ID");

  const template = await MeasurementTemplate.findById(id);
  if (!template) throw new ApiError(404, "Template not found");

  await template.deleteOne({ _id: id });
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Template deleted successfully"));
});

const createMeasurements = asyncHandler(async (req, res) => {
  const measurements = predefinedMeasurements; // array of { name, type, unit }

  if (!Array.isArray(measurements) || measurements.length === 0) {
    return res.status(400).json(new ApiError(400, "No measurements provided"));
  }

  const createdMeasurements = [];
  const duplicateMeasurements = [];

  for (let m of measurements) {
    // Skip if missing required fields
    if (!m.name || !m.type || !m.unit) continue;

    // Check duplicate
    const existing = await Measurement.findOne({
      name: { $regex: new RegExp(`^${m.name}$`, "i") },
      type: m.type,
    });

    if (existing) {
      duplicateMeasurements.push(m.name);
      continue;
    }

    const created = await Measurement.create({
      name: m.name,
      type: m.type,
      unit: m.unit,
    });

    createdMeasurements.push(created);
  }

  let message = `${createdMeasurements.length} measurement(s) created successfully`;
  if (duplicateMeasurements.length > 0) {
    message += `. Skipped duplicates: ${duplicateMeasurements.join(", ")}`;
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdMeasurements, message));
});

const createMeasurement = asyncHandler(async (req, res) => {
  const { name, type, unit } = req.body;

  if (!name || !type || !unit) {
    throw new ApiError(400, "Name, type, and unit are required");
  }

  // Duplicate check
  const existing = await Measurement.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
    type,
  });

  if (existing) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          `Measurement "${name}" already exists for type "${type}"`
        )
      );
  }

  const measurement = await Measurement.create({ name, type, unit });

  return res
    .status(201)
    .json(
      new ApiResponse(201, measurement, "Measurement created successfully")
    );
});

// ---------------- Get all measurements ----------------
const getAllMeasurements = asyncHandler(async (req, res) => {
  const measurements = await Measurement.find();
  return res
    .status(200)
    .json(
      new ApiResponse(200, measurements, "Measurements fetched successfully")
    );
});

// ---------------- Get measurement by ID ----------------
const getMeasurementById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json(new ApiError(400, "Invalid measurement ID"));
  }

  const measurement = await Measurement.findById(id);
  if (!measurement) {
    return res.status(404).json(new ApiError(404, "Measurement not found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, measurement, "Measurement fetched successfully")
    );
});

// ---------------- Update measurement ----------------
const updateMeasurement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, type, unit } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json(new ApiError(400, "Invalid measurement ID"));
  }

  const measurement = await Measurement.findById(id);
  if (!measurement) {
    return res.status(404).json(new ApiError(404, "Measurement not found"));
  }

  // Check for duplicate name+type
  if (name && type) {
    const existing = await Measurement.findOne({
      _id: { $ne: id },
      name: { $regex: new RegExp(`^${name}$`, "i") },
      type,
    });
    if (existing) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            `Measurement with name "${name}" already exists for type "${type}"`
          )
        );
    }
  }

  if (name) measurement.name = name;
  if (type) measurement.type = type;
  if (unit) measurement.unit = unit;

  await measurement.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, measurement, "Measurement updated successfully")
    );
});

// ---------------- Delete measurement ----------------
const deleteMeasurement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json(new ApiError(400, "Invalid measurement ID"));
  }

  const measurement = await Measurement.findById(id);
  if (!measurement) {
    return res.status(404).json(new ApiError(404, "Measurement not found"));
  }

  await measurement.deleteOne({ _id: id });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Measurement deleted successfully"));
});

//Fabric Master
// ---------------- Create Fabric ----------------
// Utility to generate unique fabric code
const generateFabricCode = async () => {
  const lastFabric = await Fabric.findOne().sort({ createdAt: -1 });
  let newCode = "FAB001";

  if (lastFabric && lastFabric.code) {
    // Extract number from last code (e.g., FAB005 → 5)
    const lastNumber = parseInt(lastFabric.code.replace(/\D/g, ""), 10) || 0;
    newCode = `FAB${String(lastNumber + 1).padStart(3, "0")}`;
  }

  return newCode;
};

// ---------------- Create Fabric ----------------
const createFabric = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Fabric name is required");
  }

  // Split into single/multiple names and trim
  const fabricNames = name
    .split(",")
    .map((n) => n.trim())
    .filter((n) => n.length > 0);

  if (fabricNames.length === 0) {
    throw new ApiError(400, "No valid fabric names provided");
  }

  // Upload multiple images (if any)
  let images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const upload = await uploadOnCloudinary(file.path);
      if (upload?.secure_url) images.push(upload.secure_url);
    }
  }

  // Check for duplicates in DB (case-insensitive)
  const duplicateFabrics = [];
  for (const fabricName of fabricNames) {
    const existing = await Fabric.findOne({
      name: { $regex: new RegExp(`^${fabricName}$`, "i") },
    });
    if (existing) duplicateFabrics.push(fabricName);
  }

  if (duplicateFabrics.length > 0) {
    throw new ApiError(
      400,
      `Fabric(s) already exist: ${duplicateFabrics.join(", ")}`
    );
  }

  const status = req.user?.user_role?.role_id === 1 ? "active" : "pending";
  const createdFabrics = [];

  for (let i = 0; i < fabricNames.length; i++) {
    const fabricName = fabricNames[i];

    // Auto-generate unique code
    const code = await generateFabricCode();

    const fabric = await Fabric.create({
      name: fabricName,
      code,
      image: images[i] || "", // assign matching image if available
      status,
      createdBy: req.user._id,
    });

    createdFabrics.push(fabric);
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdFabrics,
        `${createdFabrics.length} Fabric(s) created successfully`
      )
    );
});

// ---------------- Update Fabric (for admin or tailor) ----------------
const updateFabric = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  console.log("Update request body:", req.body);
  console.log("Files received:", req.files);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid fabric id"));
  }

  const fabric = await Fabric.findById(id);
  if (!fabric)
    return res.status(404).json(new ApiResponse(404, null, "Fabric not found"));

  // Check for duplicate name
  if (name) {
    const existing = await Fabric.findOne({
      _id: { $ne: id },
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existing) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            `Fabric with name "${name}" already exists`
          )
        );
    }
    fabric.name = name;
  }

  // Handle image update
  if (req.files && req.files.length > 0) {
    if (fabric.image) console.log("Deleting old image:", fabric.image);
    if (fabric.image) await deleteFromCloudinary([fabric.image]);
    const upload = await uploadOnCloudinary(req.files[0].path);
    fabric.image = upload?.secure_url;
    console.log("New image uploaded:", fabric.image);
  }

  await fabric.save();
  console.log("Fabric saved:", fabric);

  return res
    .status(200)
    .json(new ApiResponse(200, fabric, "Fabric updated successfully"));
});

// ---------------- Admin Update Fabric Status ----------------
const updateFabricStatus = asyncHandler(async (req, res) => {
  const { fabricId, status, rejectReason } = req.body;

  if (!req.user?.user_role?.role_id === 1) {
    return res.status(403).json(new ApiResponse(403, null, "Unauthorized"));
  }

  if (!mongoose.Types.ObjectId.isValid(fabricId)) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid fabricId"));
  }

  const fabric = await Fabric.findById(fabricId);
  if (!fabric)
    return res.status(404).json(new ApiResponse(404, null, "Fabric not found"));

  if (!["active", "rejected"].includes(status)) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "Status must be 'active' or 'rejected'")
      );
  }

  fabric.status = status;
  if (status === "rejected")
    fabric.rejectReason = rejectReason || "No reason provided";

  await fabric.save();
  return res
    .status(200)
    .json(new ApiResponse(200, fabric, `Fabric ${status} successfully`));
});

// ---------------- Get All Fabrics ----------------
const getAllFabric = asyncHandler(async (req, res) => {
  const fabrics = await Fabric.find()
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, fabrics, "Fabrics fetched successfully"));
});

// ---------------- Delete Fabric ----------------
const deleteFabric = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid fabric id"));
  }

  const fabric = await Fabric.findById(id);
  if (!fabric)
    return res.status(404).json(new ApiResponse(404, null, "Fabric not found"));

  if (fabric.image) await deleteFromCloudinary([fabric.image]);

  await Fabric.deleteOne({ _id: id });
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Fabric deleted successfully"));
});

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
  const { country, city, street } = req.body;
  let { coordinates } = req.body;
  console.log("create location body:", req.body);
  console.log("coordinates:", coordinates);

  // Validate required fields
  if (!country || !city || !street || !coordinates) {
    return res
      .status(400)
      .json(
        new ApiError(400, "Missing required fields or coordinates not valid")
      );
  }

  // Normalize coordinates: accept either GeoJSON { type, coordinates } or raw [lng, lat]
  if (
    coordinates &&
    typeof coordinates === "object" &&
    !Array.isArray(coordinates)
  ) {
    // likely GeoJSON
    if (
      coordinates.type !== "Point" ||
      !Array.isArray(coordinates.coordinates)
    ) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Coordinates must be GeoJSON Point or [lng, lat] array"
          )
        );
    }
    coordinates = coordinates.coordinates;
  }

  if (!Array.isArray(coordinates)) {
    return res
      .status(400)
      .json(new ApiError(400, "Coordinates must be an array [lng, lat]"));
  }

  // Ensure coordinates are numbers [lng, lat]
  if (
    coordinates.length !== 2 ||
    typeof coordinates[0] !== "number" ||
    typeof coordinates[1] !== "number"
  ) {
    return res
      .status(400)
      .json(new ApiError(400, "Coordinates must be [lng, lat] numbers"));
  }

  // Check if same location already exists
  const existing = await LocationMaster.findOne({ country, city, street });
  if (existing) {
    return res.status(409).json(new ApiError(409, "Location already exists"));
  }

  // Create location
  const location = await LocationMaster.create({
    country,
    city,
    street,
    coordinates: {
      type: "Point",
      coordinates: coordinates,
    },
    user: req.user._id,
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
  const locations = await LocationMaster.find().populate("country");
  return res
    .status(200)
    .json(new ApiResponse(200, locations, "Locations fetched"));
});

// Update location
const updateLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const location = await LocationMaster.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!location)
    return res.status(404).json(new ApiError(404, "Location not found"));

  return res
    .status(200)
    .json(new ApiResponse(200, location, "Location updated"));
});

// Delete location
const deleteLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const location = await LocationMaster.findByIdAndDelete(id);
  if (!location)
    return res.status(404).json(new ApiError(404, "Location not found"));
  return res.status(200).json(new ApiResponse(200, null, "Location deleted"));
});

//country & city master
// create country
const createCountry = asyncHandler(async (req, res) => {
  if (!Array.isArray(countries) || countries.length === 0) {
    return res.status(400).json(new ApiResponse(400, "No countries provided"));
  }

  const createdCountry = await Country.create(countries);

  return res
    .status(201)
    .json(new ApiResponse(201, createdCountry, "Country created successfully"));
});

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
    .json(new ApiResponse(200, allCountry, "Country fetched successfully"));
});

// get Country by Id
const getCountryById = asyncHandler(async (req, res) => {
  if (req.params.id == "undefined" || !req.params.id) {
    return res.status(400).json(new ApiError(400, "id not provided"));
  }

  const country = await Country.findById(req.params.id);

  if (!country) {
    return res.status(404).json(new ApiError(404, "Country not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, country, "Country fetched successfully"));
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
    return res.status(400).json(new ApiResponse(400, "No cities provided"));
  }

  const createdCity = await City.create(cities);

  return res
    .status(201)
    .json(new ApiResponse(201, createdCity, "City created successfully"));
});

//update city by city id
const updateCity = asyncHandler(async (req, res) => {
  const { cityId } = req.params;
  const updatedCityData = req.body;

  if (!cityId || cityId === "undefined") {
    return res.status(400).json(new ApiError(400, "City ID not provided"));
  }

  if (!updatedCityData || Object.keys(updatedCityData).length === 0) {
    return res
      .status(400)
      .json(new ApiError(400, "No data provided to update"));
  }

  const city = await City.findById(cityId);

  if (!city) {
    return res.status(404).json(new ApiError(404, "City not found"));
  }

  // Update the city data
  const updatedCity = await City.findByIdAndUpdate(cityId, updatedCityData, {
    new: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCity, "City updated successfully"));
});

// get all City by country
const getAllCity = asyncHandler(async (req, res) => {
  if (req.params.countryId == "undefined" || !req.params.countryId) {
    return res.status(400).json(new ApiError(400, "id not provided"));
  }
  const allCity = await City.find({ country: req.params.countryId });

  return res
    .status(200)
    .json(new ApiResponse(200, allCity, "City fetched successfully"));
});

// get City by Id
const getCityById = asyncHandler(async (req, res) => {
  if (req.params.id == "undefined" || !req.params.id) {
    return res.status(400).json(new ApiError(400, "id not provided"));
  }

  const city = await City.findById(req.params.id);

  if (!city) {
    return res.status(404).json(new ApiError(404, "City not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, city, "City fetched successfully"));
});

//deleteAllcities
const deleteAllCities = asyncHandler(async (req, res) => {
  await City.deleteMany({});

  return res
    .status(200)
    .json(new ApiResponse(200, null, "All cities deleted successfully"));
});

// Create multiple specialties
const createSpecialties = asyncHandler(async (req, res) => {
  if (!Array.isArray(specialties) || specialties.length === 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "No specialties provided"));
  }

  const createdSpecialties = await Specialty.create(specialties);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdSpecialties,
        "Specialties created successfully"
      )
    );
});

// Create a single specialty
const createSpecialty = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) throw new ApiError(400, "Specialty name is required");

  // Check if specialty already exists (case-insensitive)
  const existingSpecialty = await Specialty.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
  });
  if (existingSpecialty) {
    return res
      .status(400)
      .json(new ApiError(400, `Specialty "${name}" already exists`));
  }

  // Upload image if provided
  const image = req.file
    ? await uploadOnCloudinary(req.file.path).then((u) => u?.secure_url)
    : "";

  const specialty = await Specialty.create({ name, image });

  return res
    .status(201)
    .json(new ApiResponse(201, specialty, "Specialty created successfully"));
});

// Update specialty by ID
const updateSpecialty = asyncHandler(async (req, res) => {
  const { specialtyId } = req.params;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(specialtyId)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid specialty ID"));
  }

  const specialty = await Specialty.findById(specialtyId);
  if (!specialty)
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Specialty not found"));

  // Check for duplicate name before updating
  if (name && name.toLowerCase() !== specialty.name.toLowerCase()) {
    const existing = await Specialty.findOne({
      _id: { $ne: specialtyId },
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existing) {
      return res
        .status(400)
        .json(
          new ApiError(400, `Specialty with name "${name}" already exists`)
        );
    }
    specialty.name = name;
  }

  // Image update
  if (req.file) {
    if (specialty.image) await deleteFromCloudinary([specialty.image]);
    const upload = await uploadOnCloudinary(req.file.path);
    specialty.image = upload?.secure_url || "";
  }

  await specialty.save();

  return res
    .status(200)
    .json(new ApiResponse(200, specialty, "Specialty updated successfully"));
});

// Get all specialties
const getAllSpecialties = asyncHandler(async (req, res) => {
  const allSpecialties = await Specialty.find();

  return res
    .status(200)
    .json(
      new ApiResponse(200, allSpecialties, "Specialties fetched successfully")
    );
});

// Get specialty by ID
const getSpecialtyById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json(new ApiError(400, "ID not provided"));
  }

  const specialty = await Specialty.findById(id);

  if (!specialty) {
    return res.status(404).json(new ApiError(404, "Specialty not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, specialty, "Specialty fetched successfully"));
});

// Delete specialty by ID
const deleteSpecialty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const specialty = await Specialty.findById(id);

  if (!specialty) {
    return res.status(404).json(new ApiError(404, "Specialty not found"));
  }

  await Specialty.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Specialty deleted successfully"));
});

// Delete all specialties
const deleteAllSpecialties = asyncHandler(async (req, res) => {
  await Specialty.deleteMany({});

  return res
    .status(200)
    .json(new ApiResponse(200, null, "All specialties deleted successfully"));
});

export {
  createTax,
  updateTax,
  getTaxes,
  deleteTax,
  getActiveTax, 

  createCategory,
  updateCategory,
  getCategories,
  getCategoryById,
  deleteCategory,

  createMeasurementTemplate,
  getAllMeasurementTemplates,
  getMeasurementTemplateById,
  updateMeasurementTemplate,
  deleteMeasurementTemplate,

  createMeasurements,
  createMeasurement,
  getAllMeasurements,
  getMeasurementById,
  updateMeasurement,
  deleteMeasurement,

  createFabric,
  updateFabricStatus,
  updateFabric,
  getAllFabric,
  deleteFabric,

  createSpecialties,
  createSpecialty,
  updateSpecialty,
  getAllSpecialties,
  getSpecialtyById,
  deleteSpecialty,
  deleteAllSpecialties,

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
