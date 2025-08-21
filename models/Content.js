const mongoose = require('mongoose');

const seoMetadataSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  keywords: [{ type: String }],
});

const legalDocumentSchema = new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  version: { type: String },
  complianceFlags: [{ type: String }],
  updatedAt: { type: Date },
});

const contentSchema = new mongoose.Schema(
  {
    language: { type: String, required: true, default: 'en' },
    type: {
      type: String,
      enum: ['cms', 'legal_document', 'seo', 'whitelabel', 'cultural'],
      default: 'cms',
    },
    body: { type: String }, // rich text / markdown / html
    seo: seoMetadataSchema,
    legalDocuments: [legalDocumentSchema],
    culturalContentType: { type: String }, // e.g. 'uae_traditional_dresses'
    complianceFlags: [{ type: String }],
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
