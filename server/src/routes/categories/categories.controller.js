const CategoryDatabase = require('../../models/categories/categories.mongo');


async function httpCreateCategory(req, res) {
    
    const newCategory = new CategoryDatabase(req.body)

    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(400).json('Error al crear categoria');
    }
}



async function htttpDeleteCategory(req, res) {

        try {
            await CategoryDatabase.findByIdAndDelete(req.params.id);
            res.status(200).json("La categoria fue eliminada con exito!");
        } catch (err) {
            res.status(400).json("Error al intentar eliminar categoria");
        };


};


async function htttpGetCategory(req, res) {

        try {
            const category = await CategoryDatabase.findOne({userId: req.params.userId});
            res.status(200).json(category);
        } catch (err) {
            res.status(400).json('Error al cargar categoria');
        };

};


async function htttpGetAllCategories(req, res) {

    try {
        const categories = await CategoryDatabase.find();
        res.status(200).json(categories)
    } catch (err) {
        res.status(400).json('Error al cargar categorias');
    }
    
};




module.exports = {
    httpCreateCategory,
    htttpDeleteCategory,
    htttpGetCategory,
    htttpGetAllCategories
};

