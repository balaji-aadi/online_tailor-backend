const Joi = require('joi');

exports.validateAdminUserVerification = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    documents: Joi.array()
      .items(
        Joi.object({
          type: Joi.string().required(),
          url: Joi.string().uri().required(),
        })
      )
      .required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

exports.validateBulkImport = (req, res, next) => {
  // multer middleware handles upload validation
  next();
};

exports.validateBroadcastNotification = (req, res, next) => {
  const schema = Joi.object({
    message: Joi.string().required(),
    type: Joi.string().valid('push', 'sms', 'email').required(),
    targetUserIds: Joi.array().items(Joi.string().hex().length(24)).optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

exports.validateDisputeResolution = (req, res, next) => {
  const schema = Joi.object({
    orderId: Joi.string().hex().length(24).required(),
    evidence: Joi.array().items(
      Joi.object({
        type: Joi.string(),
        url: Joi.string().uri(),
      })
    ).optional(),
    description: Joi.string().allow('').optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

exports.validateContentUpdate = (req, res, next) => {
  const schema = Joi.object({
    language: Joi.string().length(2).required(),
    type: Joi.string()
      .valid('cms', 'legal_document', 'seo', 'whitelabel', 'cultural')
      .required(),
    body: Joi.string().required(),
    seo: Joi.object({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      keywords: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    complianceFlags: Joi.array().items(Joi.string()).optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
