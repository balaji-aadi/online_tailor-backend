import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import TailorInventory from "../models/TailorInventory.js";
import {
  Category,
  Fabric,
  MeasurementTemplate,
  Specialty,
} from "../models/Master.js";
import { UserRole } from "../models/userRole.js";
import ReadymadeCloth from "../models/readymadeCloth.js";
import { Service } from "../models/Service.js";
import { uploadOnCloudinary } from "../cloudinary.js";
import { Order } from "../models/Order.js";

// Create Readymade Cloth
const createReadymadeCloth = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    specialty,
    gender,
    fabric,
    colors,
    description,
    isActive,
    stock_qty,
    taxMaster,
  } = req.body;
  console.log("files:", req.files);

  if (!name) throw new ApiError(400, "Name is required");
  if (price === undefined) throw new ApiError(400, "Price is required");
  if (!specialty) throw new ApiError(400, "Garment type is required");
  if (!gender) throw new ApiError(400, "Gender is required");
  if (!fabric) throw new ApiError(400, "Fabric is required");
  if (!colors || colors.length === 0)
    throw new ApiError(400, "At least one color is required");

  // Handle images upload
  let images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files.slice(0, 5)) { 
      const upload = await uploadOnCloudinary(file.path);
      if (upload?.secure_url) images.push(upload.secure_url);
    }
  }

  // Check duplicates by tailorId + name + specialty
  const existing = await ReadymadeCloth.findOne({
    tailorId: req.user._id,
    name: { $regex: new RegExp("^" + name + "$", "i") },
    specialty,
  });
  if (existing)
    throw new ApiError(
      400,
      "Readymade cloth with this name and garment type already exists for this tailor"
    );

  // Save to DB
  const cloth = await ReadymadeCloth.create({
    tailorId: req.user._id,
    name,
    price,
    specialty,
    gender,
    fabric,
    colors,
    description,
    measurements: "free", // backend-controlled
    images, // uploaded images
    isActive: isActive !== undefined ? isActive : true,
    stock_qty: stock_qty !== undefined ? stock_qty : 0,
    taxMaster: taxMaster || null,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, cloth, "Readymade cloth created successfully"));
});

// Update Readymade Cloth
const updateReadymadeCloth = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    specialty,
    gender,
    fabric,
    colors,
    description,
    isActive,
    stock_qty,
    taxMaster,
  } = req.body;

  const cloth = await ReadymadeCloth.findById(id);
  if (!cloth) throw new ApiError(404, "Readymade cloth not found");

  // Handle new images if uploaded
  let images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files.slice(0, 5)) { 
      const upload = await uploadOnCloudinary(file.path);
      if (upload?.secure_url) images.push(upload.secure_url);
    }
  }

  if (name) cloth.name = name;
  if (price !== undefined) cloth.price = price;
  if (specialty) cloth.specialty = specialty;
  if (gender) cloth.gender = gender;
  if (fabric) cloth.fabric = fabric;
  if (colors && colors.length > 0) cloth.colors = colors;
  if (description !== undefined) cloth.description = description;
  if (isActive !== undefined) cloth.isActive = isActive;
  if (stock_qty !== undefined) cloth.stock_qty = stock_qty;
  if (taxMaster !== undefined) cloth.taxMaster = taxMaster;

  // measurements always "free" (not editable)

  await cloth.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cloth, "Readymade cloth updated successfully"));
});

// Get all Readymade Cloths (with filters)
const getReadymadeCloths = asyncHandler(async (req, res) => {
  const { fabric, specialty, gender, sortByPrice, tailorId } = req.body;

  let filter = { isActive: true }; // always fetch active cloths

  if (fabric) filter.fabric = fabric;
  if (specialty) filter.specialty = specialty;
  if (gender) filter.gender = gender;
  if (tailorId) filter.tailorId = tailorId;

  let sort = {};
  if (sortByPrice) {
    if (sortByPrice === "asc") sort.price = 1;
    else if (sortByPrice === "desc") sort.price = -1;
  }

  const cloths = await ReadymadeCloth.find(filter)
    .populate("specialty")
    .populate("fabric")
    .sort(sort);

  return res
    .status(200)
    .json(
      new ApiResponse(200, cloths, "Readymade cloths fetched successfully")
    );
});

// Get Readymade Cloths by Tailor
const getReadymadeClothsByTailor = asyncHandler(async (req, res) => {
  const { tailorId } = req.params;
  const { fabric, specialty, gender, sortByPrice } = req.body;

  if (!tailorId) throw new ApiError(400, "Tailor ID is required");

  let filter = { isActive: true, tailorId };

  if (fabric) filter.fabric = fabric;
  if (specialty) filter.specialty = specialty;
  if (gender) filter.gender = gender;

  let sort = {};
  if (sortByPrice) {
    if (sortByPrice === "asc") sort.price = 1;
    else if (sortByPrice === "desc") sort.price = -1;
  }

  const cloths = await ReadymadeCloth.find(filter)
    .populate("specialty")
    .populate("fabric")
    .sort(sort);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        cloths,
        "Readymade cloths by tailor fetched successfully"
      )
    );
});

// Get single Readymade Cloth
const getReadymadeCloth = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cloth = await ReadymadeCloth.findById(id)
    .populate("specialty")
    .populate("fabric");

  if (!cloth) throw new ApiError(404, "Readymade cloth not found");

  return res
    .status(200)
    .json(new ApiResponse(200, cloth, "Readymade cloth fetched successfully"));
});

// Delete Readymade Cloth
const deleteReadymadeCloth = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cloth = await ReadymadeCloth.findByIdAndDelete(id);
  if (!cloth) throw new ApiError(404, "Readymade cloth not found");

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Readymade cloth deleted successfully"));
});

//tailor inventory
const createTailorInventory = asyncHandler(async (req, res) => {
  const { fabricId, colors, price } = req.body;
  const tailorId = req.user._id;
  console.log("tailorId from token:", req.user._id);
  console.log("req.body:", req.body);

  if (!fabricId || !colors?.length || !price) {
    throw new ApiError(
      400,
      "All fields (fabricId, colors, price) are required"
    );
  }

  // fetch user from DB
  const user = await User.findById(tailorId);
  if (!user) throw new ApiError(404, "User not found");

  // fetch role using _id reference
  const userRole = await UserRole.findById(user.user_role);
  if (!userRole || !["admin", "tailor"].includes(userRole.name.toLowerCase())) {
    throw new ApiError(403, "Not authorized as tailor or admin");
  }

  // check if fabric exists
  const fabric = await Fabric.findById(fabricId);
  if (!fabric) throw new ApiError(404, "Fabric not found");

  // check if already exists (tailor + fabric)
  const existing = await TailorInventory.findOne({
    tailor: tailorId,
    fabric: fabricId,
  });
  if (existing)
    throw new ApiError(400, "Fabric already added to tailor inventory");

  const inventory = await TailorInventory.create({
    tailor: tailorId,
    fabric: fabricId,
    colors,
    price,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, inventory, "Tailor inventory created successfully")
    );
});

const updateTailorInventory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { colors, price } = req.body;

  const inventory = await TailorInventory.findById(id);
  if (!inventory) throw new ApiError(404, "Inventory item not found");

  if (colors?.length) inventory.colors = colors;
  if (price) inventory.price = price;

  await inventory.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, inventory, "Tailor inventory updated successfully")
    );
});
const getInventoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const inventory = await TailorInventory.findById(id)
    .populate("fabric", "name code image status")
    .populate("tailor", "businessName ownerName email");

  if (!inventory) throw new ApiError(404, "Inventory item not found");

  return res
    .status(200)
    .json(
      new ApiResponse(200, inventory, "Tailor inventory fetched successfully")
    );
});
const deleteTailorInventory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const inventory = await TailorInventory.findByIdAndDelete(id);
  if (!inventory) throw new ApiError(404, "Inventory item not found");

  return res
    .status(200)
    .json(
      new ApiResponse(200, inventory, "Tailor inventory deleted successfully")
    );
});
// Get all inventory for a tailor
const getTailorInventories = asyncHandler(async (req, res) => {
  const { tailorId } = req.params;
  const { fabricId, color, minPrice, maxPrice, sortBy } = req.body;

  if (!tailorId) {
    throw new ApiError(400, "Tailor ID is required");
  }

  const filter = { tailor: tailorId };

  // fabric filter
  if (fabricId) filter.fabric = fabricId;

  // color filter (case-insensitive match inside array)
  if (color) filter.colors = { $in: [new RegExp("^" + color + "$", "i")] };

  // price range filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
  }

  // sorting
  let sort = {};
  if (sortBy === "priceLowToHigh") sort.price = 1;
  else if (sortBy === "priceHighToLow") sort.price = -1;
  else sort.createdAt = -1; // default: latest first

  const inventory = await TailorInventory.find(filter)
    .populate("fabric", "name code image status")
    .populate("tailor", "businessName ownerName email")
    .sort(sort);

  return res
    .status(200)
    .json(
      new ApiResponse(200, inventory, "Tailor inventory fetched successfully")
    );
});

const getAllTailorInventories = asyncHandler(async (req, res) => {
  const { tailorId, fabricId, color, minPrice, maxPrice, sortBy } = req.body;

  const filter = {};

  // tailor filter
  if (tailorId) filter.tailor = tailorId;

  // fabric filter
  if (fabricId) filter.fabric = fabricId;

  // color filter (case-insensitive match in array)
  if (color) filter.colors = { $in: [new RegExp("^" + color + "$", "i")] };

  // price range filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
  }

  // sorting
  let sort = {};
  if (sortBy === "priceLowToHigh") sort.price = 1;
  else if (sortBy === "priceHighToLow") sort.price = -1;
  else sort.createdAt = -1; // default latest first

  const inventories = await TailorInventory.find(filter)
    .populate("fabric", "name code image status")
    .populate("tailor", "businessName ownerName email")
    .sort(sort);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        inventories,
        "All tailor inventories fetched successfully"
      )
    );
});

//  List Orders
const listOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ tailorId: req.user._id }).lean();
  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

//  Get Order Details
const getOrderDetails = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOne({
    _id: orderId,
    tailorId: req.user._id,
  }).lean();

  if (!order) throw new ApiError(404, "Order not found");

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order details fetched"));
});

//  Update Order Status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const allowedStatuses = [
    "pending",
    "in_progress",
    "qc_check",
    "completed",
    "cancelled",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const order = await Order.findOne({ _id: orderId, tailorId: req.user._id });
  if (!order) throw new ApiError(404, "Order not found");

  order.lifecycleStatus.current = status;
  order.lifecycleStatus.timestamps[status] = new Date();
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated"));
});

//  Mark Rush Order
const markRushOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOne({ _id: orderId, tailorId: req.user._id });
  if (!order) throw new ApiError(404, "Order not found");

  order.rushOrder = true;
  order.rushPricingMultiplier = 1.5;
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order marked as rush order"));
});

//  Order Tracking
const getOrderTracking = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOne({
    _id: orderId,
    tailorId: req.user._id,
  }).lean();
  if (!order) throw new ApiError(404, "Order not found");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        lifecycleStatus: order.lifecycleStatus,
        deliveryCoordination: order.deliveryCoordination,
      },
      "Order tracking details fetched"
    )
  );
});

const createProductService = asyncHandler(async (req, res) => {
  const {
    serviceName,
    serviceType,
    description,
    gender,
    specialty,
    fabricType,
    stylePattern,
    measurementType,
    requestedAlteration,
    addOn,
    fittingPreferences,
    expressDelivery,
    estimatedDuration,
    expressDuration,
    preferenceDuration,
    regularDuration,
    trialsOffered,
    basePrice,
    expressPrice,
    preferencePrice,
    extraCharges,
    discount,
    status,
  } = req.body;
 console.log("req.body", req.body);
  const tailorId = req.user._id;

  //Validation
  if (!serviceName || !serviceType  || !basePrice) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  let images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files.slice(0, 5)) {
      const upload = await uploadOnCloudinary(file.path);
      if (upload?.secure_url) images.push(upload.secure_url);
    }
  }

  // Check references
  const category = await Category.findById(serviceType);
  if (!category) {
    return res.status(400).json({ message: "Invalid serviceType (Category)" });
  }

 if (specialty) {
  const specialtyDoc = await Specialty.findById(specialty);
  if (!specialtyDoc) {
    return res.status(400).json({ message: "Invalid specialty (Specialty)" });
  }
}


 if (fabricType) {
  const fabricDoc = await Fabric.findById(fabricType);
  if (!fabricDoc) {
    return res.status(400).json({ message: "Invalid fabricType (Fabric)" });
  }
}

if (measurementType) {
  const templateDoc = await MeasurementTemplate.findById(measurementType);
  if (!templateDoc) {
    return res.status(400).json({ message: "Invalid measurementType (Template)" });
  }
}


  //  Create service with auto-generated ID
  const service = await Service.create({
    serviceId: `SRV-${new Date().getTime()}`,
    serviceName,
    serviceType,
    description,
    gender,
    specialty,
    fabricType,
    tailorId,
    stylePattern,
    measurementType,
    requestedAlteration,
    addOn,
    fittingPreferences,
    expressDelivery,
    estimatedDuration,
    expressDuration,
    preferenceDuration,
    regularDuration,
    trialsOffered,
    basePrice,
    expressPrice,
    images,
    preferencePrice,
    extraCharges,
    discount,
    status,
  });

  res.status(201).json({
    message: "Service created successfully",
    data: service,
  });
});

const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const service = await Service.findById(id);
  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  //  Handle images
  let newImages = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files.slice(0, 5)) {
      const upload = await uploadOnCloudinary(file.path);
      if (upload?.secure_url) newImages.push(upload.secure_url);
    }
  }

  //  If replaceImages flag is true, overwrite images
  if (req.body.replaceImages === "true") {
    service.images = newImages;
  } else {
    //  Else append uploaded images
    service.images = [...service.images, ...newImages];
  }

  //  Remove specific images if requested
  if (req.body.removeImages) {
    try {
      const removeList = JSON.parse(req.body.removeImages); // expecting ["url1", "url2"]
      service.images = service.images.filter(
        (img) => !removeList.includes(img)
      );
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Invalid removeImages format. Must be JSON array." });
    }
  }

  //  Update other fields if provided
  const fieldsToUpdate = [
    "serviceName",
    "serviceType",
    "description",
    "gender",
    "specialty",
    "fabricType",
    "stylePattern",
    "measurementType",
    "requestedAlteration",
    "addOn",
    "fittingPreferences",
    "expressDelivery",
    "estimatedDuration",
    "expressDuration",
    "preferenceDuration",
    "regularDuration",
    "trialsOffered",
    "basePrice",
    "expressPrice",
    "preferencePrice",
    "extraCharges",
    "discount",
    "status",
  ];

  fieldsToUpdate.forEach((field) => {
    if (req.body[field] !== undefined) {
      service[field] = req.body[field];
    }
  });

  //  Validate references if updated
  if (req.body.serviceType) {
    const category = await Category.findById(req.body.serviceType);
    if (!category)
      return res
        .status(400)
        .json({ message: "Invalid serviceType (Category)" });
  }

  if (req.body.specialty) {
    const specialty = await Specialty.findById(req.body.specialty);
    if (!specialty)
      return res
        .status(400)
        .json({ message: "Invalid specialty (Specialty)" });
  }

  if (req.body.fabricType) {
    const fabric = await Fabric.findById(req.body.fabricType);
    if (!fabric)
      return res.status(400).json({ message: "Invalid fabricType (Fabric)" });
  }

  if (req.body.measurementType) {
    const template = await MeasurementTemplate.findById(
      req.body.measurementType
    );
    if (!template)
      return res
        .status(400)
        .json({ message: "Invalid measurementType (Template)" });
  }

  await service.save();

  res.status(200).json({
    message: "Service updated successfully",
    data: service,
  });
});

const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const service = await Service.findById(id);
  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  await service.deleteOne();

  res.status(200).json({ message: "Service deleted successfully" });
});

const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const service = await Service.findById(id)
    .populate("serviceType", "name")
    .populate("specialty", "name")
    .populate("fabricType", "name")
    .populate("measurementType", "name");

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  res.status(200).json({ data: service });
});

const getAllServices = asyncHandler(async (req, res) => {
  const {
    serviceType,
    gender,
    specialty,
    fabricType,
    status,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = req.body;

  const filter = {};

  // Apply filters only if provided
  if (serviceType) filter.serviceType = serviceType;
  if (gender) filter.gender = gender;
  if (specialty) filter.specialty = specialty;
  if (fabricType) filter.fabricType = fabricType;
  if (status) filter.status = status;

  if (minPrice || maxPrice) {
    filter.basePrice = {};
    if (minPrice) filter.basePrice.$gte = Number(minPrice);
    if (maxPrice) filter.basePrice.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const services = await Service.find(filter)
    .populate("serviceType", "name")
    .populate("specialty", "name")
    .populate("fabricType", "name")
    .populate("measurementType", "name")
    .skip(skip)
    .limit(Number(limit));

  const total = await Service.countDocuments(filter);

  res.status(200).json({
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / Number(limit)),
    data: services,
  });
});

export {
  createProductService,
  updateService,
  deleteService,
  getServiceById,
  getAllServices,
  createReadymadeCloth,
  getReadymadeCloths,
  getReadymadeCloth,
  updateReadymadeCloth,
  deleteReadymadeCloth,
  getReadymadeClothsByTailor,
  createTailorInventory,
  updateTailorInventory,
  getInventoryById,
  deleteTailorInventory,
  getTailorInventories,
  getAllTailorInventories,
  listOrders,
  getOrderDetails,
  updateOrderStatus,
  markRushOrder,
  getOrderTracking,
};
