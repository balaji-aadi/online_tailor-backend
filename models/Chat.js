import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const ChatSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [MessageSchema],
    lastMessage: { type: String, default: '' },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

// Index to quickly find chats by participants
ChatSchema.index({ participants: 1 });

export default mongoose.model('Chat', ChatSchema);
