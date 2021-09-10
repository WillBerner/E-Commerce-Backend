const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// `/api/products` endpoint

// Get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{model: Category}, {model: Tag}],
    });

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a single product and the categories/tags associated with it
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{model: Category}, {model: Tag}]
    });

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a single product
router.post('/', async (req, res) => {

  /* req.body should look like this:
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

  Product.create(req.body)
    .then((product) => {

      // If there're product tags, create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }

      // If no product tags given, respond.
      res.status(200).json(product);
      
    })

    // If product tags given, also respond
    .then((productTagIds) => res.status(200).json(productTagIds))

    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update a product based on the given id
router.put('/:id', async (req, res) => {
  
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {

      // Find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })

    .then((productTags) => {

      // Get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      // Create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })

    .then((updatedProductTags) => res.json(updatedProductTags))

    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// Delete a product based on the given id
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: { 
        id: req.params.id,
      }
    });

    // If there wasn't anything to delete, let the client know.
    if (!productData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
