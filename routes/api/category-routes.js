const router = require('express').Router();
const { Category, Product } = require('../../models');

// `/api/categories` endpoint

// Get all categories and their associated product(s)
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a single category and its associated product(s)
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a single category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a single cateogry based on the given id
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a single cateogry based on the given id
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: { 
        id: req.params.id,
      }
    });

    // If there wasn't anything to delete, let the client know.
    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
