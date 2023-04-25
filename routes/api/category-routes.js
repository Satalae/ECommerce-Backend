const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({include: Product});
    res.status(200).json(allCategories);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const specificCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'category_products'}]
    });

    if(!specificCategory){
      res.status(404).json({message: 'This category is not present! :('});
      return;
    }

    res.status(200).json(specificCategory);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
