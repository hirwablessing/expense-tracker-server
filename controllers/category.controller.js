const asyncHandler = require("express-async-handler");
const Category = require("../models/Category.model");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.postCategory = asyncHandler(async (req, res, next) => {
  const { title, color, icon } = req.body;

  let category = await CategoryModel.create({ title, color, icon });

  if (!category) {
    return next(
      new ErrorResponse(
        "An occured while creating a new cateogory but don't fret, let's try again",
        500
      )
    );
  }

  res.json({ succes: true, data: category });
});

module.exports.getMyCategories = asyncHandler(async (req, res, next) => {
  let categories = await Category.find();
  if (!categories)
    return next(
      new ErrorResponse("An error occured while getting categories!")
    );

  res.json({ success: true, data: categories });
});

module.exports.getOneCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  if (!category)
    return next(
      new ErrorResponse("An error occured while getting a category!")
    );

  //work on what happens when we get zero categories

  res.json({ success: true, data: category });
});

module.exports.updateMyCategory = asyncHandler(async (req, res, next) => {
  let updatedCategory = await Category.findByAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedCategory)
    return next(new ErrorResponse("Failed updaint category"));

  res.json({ success: true, data: updatedCategory });
});

module.exports.deleteOneCategory = asyncHandler(async (req, res, next) => {
  const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);
  if (!deletedCategory) {
    return next(new ErrorResponse("Failed deleting category", 500));
  }
  res.json({
    success: true,
    data: deletedCategory,
  });
});
