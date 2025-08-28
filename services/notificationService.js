import Notification from "../models/Notification.js";
import { socketService } from "../messaging_feature/socket.js";
import User from "../models/User.js";
import { UserRole } from "../models/userRole.js";

class NotificationService {
  async sendNotification({ userId, title, message, type = "General" }) {
    if (!userId || !title || !message) {
      throw new Error("Notification requires userId, title, and message");
    }

    const notification = await Notification.create({
      userId,
      title,
      message,
      type,
    });

    socketService.emitToUser(userId, "notification", notification);

    return notification;
  }

  async sendToCustomer({ userId, title, message, type = "General" }) {
    return this.sendNotification({ userId, title, message, type });
  }

  async sendToGroomer({ userId, title, message, type = "General" }) {
    return this.sendNotification({ userId, title, message, type });
  }

  async sendToAdmin({ title, message, type = "General" }) {
    // 1️⃣ Find admin role
    const adminRole = await UserRole.findOne({ name: "admin", role_id: 1 });
    if (!adminRole) {
      throw new Error("Admin role not found");
    }

    // 2️⃣ Find all users with admin role
    const adminUsers = await User.find({ user_role: adminRole._id });

    if (!adminUsers.length) {
      throw new Error("No admin users found");
    }

    // 3️⃣ Send notification to each admin
    const notifications = [];
    for (const admin of adminUsers) {
      notifications.push(
        this.sendNotification({
          userId: admin._id,
          title,
          message,
          type,
        })
      );
    }

    return Promise.all(notifications);
  }
}

export default new NotificationService();
