const ProductsDatabase = require('../../models/products/products.mongo');
const { existsProduct } = require('../../models/products/products.model');


async function httpCreateProduct(req, res) {
    
    const existsProd = await existsProduct(req.body.title);

    if (existsProd) {
        return res.status(404).json(
            "El producto ya existe"
        );   
    };
    
    const newProduct = new ProductsDatabase(req.body);
    
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json("Error al crear nuevo producto");
        console.log(err)
    }
}


async function htttpUpdateProduct(req, res) {
    
        try {
            const updatedProduct = await ProductsDatabase.findByIdAndUpdate(req.body._id, {
                $set: req.body
            }, {new: true})
            res.status(200).json(updatedProduct)
        } catch (err) {
            console.log(err);
            res.status(400).json("Error al actualizar el producto");
        }

};


{/*async function htttpUpdateProductStock(req, res) {
    
    try {
        const stock = await ProductsDatabase.updateOne({
            _id: productId,
        }, {
            inStock: !inStock,
        });
        stock.modifiedCount === 1; 
        res.status(200).json(updatedProduct)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }

};*/}


async function htttpDeleteProduct(req, res) {

    try {
        await ProductsDatabase.findByIdAndDelete(req.params.id);
        res.status(200).json("El producto fue eliminado exitosamente");
    } catch (err) {
        res.status(400).json("Error al intentar borrar el producto");
    };

};


async function htttpGetProduct(req, res) {

    try {
        const product = await ProductsDatabase.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        console.log(err)
        res.status(400).json("Error al cargar el producto");
    };

};


async function htttpGetAllProducts(req, res) {

    const qNew = req.query.new;

    const qCategory = req.query.category;

    const qSearch = req.query.search;

    const qInStock = req.query.instock;

    const qLimit = req.query.limit || 2 ;

    const qPage = req.query.page || 1;

    const qSkip = (qPage -1) * qLimit;

    const qSort = req.query.sort;
    
    let sort;

    if (qSort === 'asc') {
        sort = {price: 1}
    } else if (qSort === 'desc') {
        sort = {price: -1}
    } else {
        sort = {createdAt: -1}
    }

    
    try {

        let products;
        let count;
        let pagesNumber;

        if (qNew) {
            products = await ProductsDatabase.find({
                inStock: true,
            })
            .sort(sort)
            .limit(4);
            count = await ProductsDatabase.count({
                inStock: true,
            })
            pagesNumber = Math.ceil(count / qLimit)
        } else if (qCategory) {
            products = await ProductsDatabase.find({
                inStock: true,
                categories: {
                    $in: [qCategory],
                }
            })
            .sort(sort)
            .skip(qSkip)
            .limit(qLimit);
            count = await ProductsDatabase.count({
                inStock: true,
                categories: {
                    $in: [qCategory],
                }
            })
            pagesNumber = Math.ceil(count / qLimit)
        } else if (qSearch) {
                products = await ProductsDatabase.find({
                    inStock: true,
                    title: {$regex: qSearch, $options: 'i' },
                }).limit(10);
                return res.status(200).json(products.splice(0,5))
        } else if (qInStock) {
            products = await ProductsDatabase.find({
                inStock: true,
            })
            .sort(sort)
            .skip(qSkip)
            .limit(qLimit)
            count = await ProductsDatabase.count({
                inStock: true,
            })
            pagesNumber = Math.ceil(count / qLimit) 
        } else {
            products = await ProductsDatabase.find();
        };
 
        

        res.status(200).json({products, pagesNumber});

    } catch (err) {
        res.status(400).json("Error al cargar los productos");
    };

};

{/*
// GET USERS STATS
*/}


module.exports = {
    httpCreateProduct,
    htttpUpdateProduct,
    htttpDeleteProduct,
    htttpGetProduct,
    htttpGetAllProducts,
};