const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({include: { model: Product }});
    res.status(200).json(allCategories);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const specCategory = await Category.findByPk(req.params.id, {
      include: {model: Product}});
    if(!specCategory){
      res.status(404).json({message: 'This category is not present! :('});
      return;
    }

    res.status(200).json(specCategory);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
    const givenCategory = await Category.create(req.body);
    res.status(200).json(givenCategory);
  } catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const newCateName = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(newCateName);
  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const reqDelete = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(reqDelete);
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
