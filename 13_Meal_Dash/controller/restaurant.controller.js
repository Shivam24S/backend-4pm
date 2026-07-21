import restaurantModel from "../model/restaurant.model.js";

import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
    try {
        const {
            restaurantName,
            description,
            address,
            state,
            city,
            phone,
            openingTime,
            closingTime,
            isOpen,
        } = req.body;

        const newRestaurant = await restaurantModel.create({
            restaurantName,
            description,
            address,
            state,
            city,
            phone,
            openingTime,
            closingTime,
            isOpen,
            restaurantImage: req.file?.path || null,
            cloudinary_id: req.file?.filename || null,
            owner: req.user._id,
        });

        res
            .status(201)
            .json({
                success: true,
                message: "restaurant added successfully",
                newRestaurant,
            });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};


export default { add }