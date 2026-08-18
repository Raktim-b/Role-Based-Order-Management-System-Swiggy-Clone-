const categoryModel = require("../model/categoryModel");
const httpStatusCode = require("../utils/httpStatusCode");
const logger = require("../utils/logger");
const {
  createCategoryValidation,
  updateCategoryValidation,
} = require("../validation/categoryValidation");

class CategoryController {
  // Create Category
  async createCategory(req, res) {
    try {
      const { error, value } = createCategoryValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { name, description } = value;

      const existingCategory = await categoryModel.findOne({
        name,
        isDeleted: false,
      });

      if (existingCategory) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Category already exists",
        });
      }

      const category = new categoryModel({
        name,
        description,
      });

      const result = await category.save();

      logger.info("Category created successfully: %s", result.name);

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Category created successfully",
        data: result,
      });
    } catch (error) {
      logger.error("Error while creating category: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get All Categories
  async getAllCategories(req, res) {
    try {
      const categories = await categoryModel.find({
        isDeleted: false,
      });

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Categories fetched successfully",
        count: categories.length,
        data: categories,
      });
    } catch (error) {
      logger.error("Error while fetching categories: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get Category By ID
  async getCategoryById(req, res) {
    try {
      const { id } = req.params;

      const category = await categoryModel.findOne({
        _id: id,
        isDeleted: false,
      });

      if (!category) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Category fetched successfully",
        data: category,
      });
    } catch (error) {
      logger.error("Error while fetching category: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update Category
  async updateCategory(req, res) {
    try {
      const { id } = req.params;

      const { error, value } = updateCategoryValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { name, description } = value;

      const category = await categoryModel.findOne({
        _id: id,
        isDeleted: false,
      });

      if (!category) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Category not found",
        });
      }

      const existingCategory = await categoryModel.findOne({
        name,
        _id: { $ne: id },
        isDeleted: false,
      });

      if (existingCategory) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Category name already exists",
        });
      }

      const updatedCategory = await categoryModel.findByIdAndUpdate(
        id,
        {
          name,
          description,
        },
        {
          new: true,
          runValidators: true,
        },
      );

      logger.info("Category updated successfully: %s", id);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      logger.error("Error while updating category: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete Category
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const category = await categoryModel.findOne({
        _id: id,
        isDeleted: false,
      });

      if (!category) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Category not found",
        });
      }

      const deletedCategory = await categoryModel.findByIdAndUpdate(
        id,
        {
          isDeleted: true,
        },
        {
          new: true,
        },
      );

      logger.info("Category deleted successfully: %s", id);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Category deleted successfully",
        data: deletedCategory,
      });
    } catch (error) {
      logger.error("Error while deleting category: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new CategoryController();
