var Product = require('../models/product');
var ProductGroup = require('../models/productGroup');

exports.seed = async function () {
    await Product.deleteMany().then(function () {
        console.log("Product is cleared");
    }).catch(function (error) {
        console.log(error);
    });
    await ProductGroup.deleteMany().then(function () {
        console.log("ProductGroup is cleared");
    }).catch(function (error) {
        console.log(error);
    });
    
    var productsData = [
        {
            product_group: {
                name: 'Article',
                images_url: ['/images/article1.png', '/images/article2.png', '/images/article3.png']
            },
            products: [
                {
                    product_code: 'ART39',
                    size: 39,
                    unit_sell_price: 400000
                },
                {
                    product_code: 'ART40',
                    size: 40,
                    unit_sell_price: 400000
                },
                {
                    product_code: 'ART41',
                    size: 41,
                    unit_sell_price: 420000
                }
            ]
        },
        {
            product_group: {
                name: 'Bicasso',
                images_url: ['/images/bicasso1.jpg', '/images/bicasso1.jpg']
            },
            products: [
                {
                    product_code: 'BIS39',
                    size: 39,
                    unit_sell_price: 360000
                },
                {
                    product_code: 'BIS40',
                    size: 40,
                    unit_sell_price: 360000
                }
            ]
        }
    ];

    for (var i = 0; i < productsData.length; i++) {
        var productGroup = await ProductGroup.create({
            name: productsData[i].product_group.name,
            images_url: productsData[i].product_group.images_url
        });

        for (var j = 0; j < productsData[i].products.length; j++) {
            await Product.create({
                product_code: productsData[i].products[j].product_code,
                size: productsData[i].products[j].size,
                unit_sell_price: productsData[i].products[j].unit_sell_price,
                group_id: productGroup._id
            });
        }
    }
    console.log("Product and ProductGroup is Seeded");
}