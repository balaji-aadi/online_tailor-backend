const Joi = require('joi');

exports.validateOrderPlacement = (req, res, next) => {
  const schema = Joi.object({
    tailorId: Joi.string().hex().length(24).required(),
    orderDetails: Joi.object({
      classification: Joi.string().valid('ready-made', 'alteration', 'custom').required(),
      price: Joi.number().required(),
      description: Joi.string().optional(),
      items: Joi.array().optional(),
    }).required(),
    measurements: Joi.object().optional(),
    paymentMethod: Joi.string().valid('credit_card', 'paypal', 'cash', 'wallet').required(),
    customizations: Joi.object().optional(),
    deliveryAddress: Joi.object().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

exports.validateReviewSubmission = (req, res, next) => {
  const schema = Joi.object({
    tailorId: Joi.string().hex().length(24).required(),
    ratings: Joi.object({
      quality: Joi.number().min(1).max(5).required(),
      timeliness: Joi.number().min(1).max(5).required(),
      communication: Joi.number().min(1).max(5).required(),
      value: Joi.number().min(1).max(5).required(),
    }).required(),
    reviewText: Joi.string().max(1000).optional(),
    photos: Joi.array().items(Joi.string().uri()).optional(),
    isVerifiedPurchase: Joi.boolean().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

exports.validateProfileUpdate = (req, res, next) => {
  const schema = Joi.object({
    contact: Joi.object({
      phone: Joi.string().optional(),
      email: Joi.string().email().optional(),
      address: Joi.string().optional(),
    }),
    notificationPreferences: Joi.object({
      push: Joi.boolean().optional(),
      sms: Joi.boolean().optional(),
      email: Joi.boolean().optional(),
    }).optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
