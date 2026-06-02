const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync")

class Authorize {
    authorize = (Model, allowRoles = [], checkAuthor = false) => {
        return catchAsync(async (req, res, next) => {
            let isAllow = false;
            const entity = await Model.findById(req.params.id);
            if (!entity) throw new AppError("Not Found!", 404);

            if (entity.author.equals(req.user._id) && checkAuthor === true) isAllow = true;
            if (allowRoles.includes(req.user.role)) isAllow = true;


            if (isAllow) return next();
            throw new AppError("Bạn không có quyền!", 403);
        })
    }
}
module.exports = new Authorize();