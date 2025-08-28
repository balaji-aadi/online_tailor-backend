import Order from '../models/Order.js';
import TailorProfile from '../models/TailorProfile.js';
import  User from '../models/User.js';

/**
 * Returns key real-time metrics for admin dashboard.
 */
export const getRealTimeMetrics = async () => {
  const totalUsers = await User.countDocuments();
  const activeTailors = await User.countDocuments({ roles: 'tailor', isApproved: true });
  const totalOrdersToday = await Order.countDocuments({
    createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
  });

  return {
    totalUsers,
    activeTailors,
    totalOrdersToday,
  };
};

/**
 * Returns geographic distribution of tailors.
 */
export const getGeographicDistribution = async () => {
  const distribution = await TailorProfile.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [55.2708, 25.2048] }, // Dubai center example
        distanceField: 'dist.calculated',
        spherical: true,
      },
    },
    {
      $group: {
        _id: '$gpsAddress',
        count: { $sum: 1 },
      },
    },
  ]);
  return distribution;
};

/**
 * Returns business intelligence / revenue analytics per tailor.
 */
export const getBusinessIntelligence = async () => {
  const revenueAgg = await Order.aggregate([
    { $match: { lifecycleStatus: { current: 'completed' } } },
    {
      $group: {
        _id: '$tailorId',
        totalRevenue: { $sum: '$orderDetails.price' },
        totalOrders: { $sum: 1 },
      },
    },
    { $sort: { totalRevenue: -1 } },
  ]);
  return revenueAgg;
};
