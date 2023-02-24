var Cart = require('../models/cart');
var Product = require('../models/product');

var User = require('../models/user');

exports.seed = async () => {
    await Cart.deleteMany().then(function () {
        console.log("Cart is cleared");
    }).catch(function (error) {
        console.log(error);
    });
    
    const userId = (await User.findOne({phone: '0941740238'}))._id;
    const productId1 = (await Product.findOne({ product_code: 'kante'}))._id;
    const productId2 = (await Product.findOne({ product_code: 'pulisic'}))._id;
    const productId3 = (await Product.findOne({ product_code: 'kai havert'}))._id;
    var x = [{
        product_id: productId1,
        quantity: 2
    },
    {
        product_id: productId2,
        quantity: 1
    },
    {
        product_id: productId3,
        quantity: 2
    }];

    await Cart.create({
        customer_id: userId,
        products: x
    }).catch((error)=>{
        console.log(error);
    });
    // District.insertMany(data)
    console.log('test is Seeded');
}
