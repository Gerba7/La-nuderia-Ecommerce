const CartDatabase = require('../../models/cart/cart.mongo');


async function httpCreateCart(req, res) {

    const newCart = new CartDatabase(req.body)

    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (err) {
        res.status(400).json(err);
    }
}


async function htttpUpdateCart(req, res) {

        try {
            const updatedCart = await CartDatabase.findByIdAndUpdate(req.userId, {
                $set: req.body
            }, {new: true})
            res.status(200).json(updatedCart)
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
   

};


async function htttpDeleteCart(req, res) {

        try {
            await CartDatabase.findByIdAndDelete(req.params.id);
            res.status(200).json("Cart has been deleted");
        } catch (err) {
            res.status(400).json(err);
        };


};


async function htttpGetCart(req, res) {

        try {
            const cart = await CartDatabase.findOne({userId: req.params.userId});
            res.status(200).json(cart);
        } catch (err) {
            res.status(400).json(err);
        };

};


async function htttpGetAllCarts(req, res) {

    try {
        const carts = await CartDatabase.find();
        res.status(200).json(carts)
    } catch (err) {
        res.status(400).json(err);
    }
    
};




module.exports = {
    httpCreateCart,
    htttpUpdateCart,
    htttpDeleteCart,
    htttpGetCart,
    htttpGetAllCarts
};

