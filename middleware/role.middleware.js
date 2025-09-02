import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';


export const adminOnly = asyncHandler(async (req, res, next) => {
    // console.log('req adminOnly:', req.user);
  if (!req.user || !req.user._id) {
    return res.status(401).json(new ApiError(401, "Unauthorized User"));
  }

  try {
    const user = await User.findById(req.user._id).populate("user_role");

    if (!user) {
      return res.status(401).json(new ApiError(401, "Unauthorized User"));
    }

    const userRole = user.user_role;

    if (
      userRole.role_id === 1 ||
      userRole.name === "admin" ||
      userRole.role_id === 6 ||
      userRole.name === "adminview"
    ) {
      return next();
    } else {
      return res.status(401).json(new ApiError(401, "Unauthorized User"));
    }
  } catch (error) {
    return res.status(401).json(new ApiError(401, "Unauthorized User"));
  }
});


export const trainerOnly = asyncHandler(async (req, res, next) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json(new ApiError(401, "Unauthorized User"));
    }

    try {
         const user = await User.findById(req.user._id).populate('user_role');

        if (!user) {
            return res.status(401).json(new ApiError(401, "Unauthorized User"));
        }

        const userRole = user.user_role;

        if (userRole.role_id === 2 || userRole.name === 'trainer') {
            return next();
        } else {
            return res.status(401).json(new ApiError(401, "Unauthorized User"));

        }
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized User' });
    }

});



export const customerOnly = asyncHandler(async (req, res, next) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: 'Unauthorized User' });
    }

    try {
         const user = await User.findById(req.user._id).populate('user_role');

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized User' });
        }

        const userRole = user.user_role;

        if (userRole.role_id === 3 || userRole.name === 'customer') {
            return next();
        } else {
            return res.status(401).json({ error: 'Unauthorized User' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized User' });
    }

});

export const managerOnly = asyncHandler(async (req, res, next) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: 'Unauthorized User' });
    }

    try {
         const user = await User.findById(req.user._id).populate('user_role');

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized User' });
        }

        const userRole = user.user_role;

        if (userRole.role_id === 4 || userRole.name === 'manager') {
            return next();
        } else {
            return res.status(401).json({ error: 'Unauthorized User' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized User' });
    }

});
