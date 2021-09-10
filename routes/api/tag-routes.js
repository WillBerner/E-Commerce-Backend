const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// `/api/tags` endpoint

// Get all tags and product(s) associated with each
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}],
    });

    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a single tag and the product(s) associated with it
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a single tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);

    res.status(200).json(newTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a tag based on the given id
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a tag based on the given id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { 
        id: req.params.id,
      }
    });

    // If there wasn't anything to delete, let the client know.
    if (!tagData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
