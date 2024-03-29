const ProductsDatabase = require('./products.mongo');


async function findProduct(filter) {

    return await ProductsDatabase.findOne(filter);

}


async function existsProduct(productTitle) {

    return await findProduct({
        title: productTitle,
    })

};


module.exports = {
    existsProduct
};