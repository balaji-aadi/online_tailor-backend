import Joi from "joi";

export const validateProfileUpdate = (req, res, next) => {
  const schema = Joi.object({
    businessLicenseInfo: Joi.object({
      licenseNumber: Joi.string().optional(),
      issuedBy: Joi.string().optional(),
      validFrom: Joi.date().optional(),
      validTo: Joi.date().optional(),
      licenseDocumentUrl: Joi.string().uri().optional().allow(""),
    }).optional(),
    gpsAddress: Joi.object({
      type: Joi.string().valid("Point").required(),
      coordinates: Joi.array().items(Joi.number()).length(2).required(),
    }).optional(),
    contact: Joi.object({
      phone: Joi.string().optional(),
      email: Joi.string().email().optional(),
      website: Joi.string().uri().optional(),
    }),
    specializations: Joi.array().items(Joi.string()).optional(),
    certifications: Joi.array()
      .items(
        Joi.object({
          name: Joi.string(),
          documentUrl: Joi.string().uri(),
          issuedDate: Joi.date(),
          expiryDate: Joi.date(),
        })
      )
      .optional(),
    operatingHours: Joi.array()
      .items(
        Joi.object({
          day: Joi.string()
            .valid(
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            )
            .required(),
          open: Joi.string().optional(),
          close: Joi.string().optional(),
          isClosed: Joi.boolean().optional(),
        })
      )
      .optional(),
    serviceCatalog: Joi.array()
      .items(
        Joi.object({
          serviceName: Joi.string(),
          description: Joi.string(),
          pricingTiers: Joi.array().items(
            Joi.object({
              minQty: Joi.number(),
              maxQty: Joi.number(),
              price: Joi.number(),
            })
          ),
          currency: Joi.string().optional(),
        })
      )
      .optional(),
    capacityLimits: Joi.object({
      maxOrdersPerDay: Joi.number().optional(),
      maxBatchSize: Joi.number().optional(),
    }).optional(),
    availabilityCalendar: Joi.array()
      .items(
        Joi.object({
          date: Joi.date().required(),
          isAvailable: Joi.boolean().required(),
          specialDescription: Joi.string().optional(),
        })
      )
      .optional(),
    insuranceInfo: Joi.object({
      policyNumber: Joi.string(),
      provider: Joi.string(),
      expiryDate: Joi.date(),
    }).optional(),
    warrantyInfo: Joi.object({
      durationMonths: Joi.number(),
      termsUrl: Joi.string().uri(),
    }).optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateOrderUpdate = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string()
      .valid("pending", "in_progress", "qc_check", "completed", "cancelled")
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateAppointmentScheduling = (req, res, next) => {
  const schema = Joi.object({
    dateTime: Joi.date().required(),
    customerId: Joi.string().hex().length(24).required(),
    notes: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateFinancialData = (req, res, next) => {
  const schema = Joi.object({
    orderId: Joi.string().hex().length(24).required(),
    invoiceData: Joi.object().required(),
    vatNumber: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
