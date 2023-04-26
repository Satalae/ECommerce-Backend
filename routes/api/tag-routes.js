const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: { model: Product, through: ProductTag, as: 'product_id' }});
    res.status(200).json(allTags);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const specTag = await Tag.findByPk(req.params.id, {
      include: {model: Product, through: ProductTag, as: 'product_id'}});

      if(!specTag){
        res.status(404).json({message: 'This Tag is not present! :('});
        return;
      }

    res.status(200).json(specTag);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(500).json(err));
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const newTagName = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(newTagName);
  }catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const reqDelete = await Tag.destroy({
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
