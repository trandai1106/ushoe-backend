var User = require('../models/user');
var District = require('../models/district');

exports.seed = async function () {
    await User.deleteMany().then(function () {
        console.log("User is cleared");
    }).catch(function (error) {
        console.log(error);
    });

    const district = (await District.find())[0];
    
    var data = [
        {            
            phone: '0941740238',
            name: 'Chị Quản Lý',
            encrypted_password: '$2b$10$fb.F5M82/JcQ8eScq4tfHO1MaQDx426th.mH03RC9IG3BvKC6qfLC',
            email: 'tranquangdai11062001@gmail.com',
            avatar_url: '/avatars/default_avatar.png',
            status: 1,
            role: 'ADMIN',
            province_id: district.province_id,
            district_id: district._id,
            address_detail: 'Số 1 Kim Mã'
        },
        {            
            phone: '0386599347',
            name: 'Anh Nhân Viên',
            encrypted_password: '$2b$10$fb.F5M82/JcQ8eScq4tfHO1MaQDx426th.mH03RC9IG3BvKC6qfLC',
            email: 'tranquangdaichv@gmail.com',
            avatar_url: '/avatars/default_avatar.png',
            status: 1,
            role: 'SALE',
            province_id: district.province_id,
            district_id: district._id,
            address_detail: 'Số 2 Liễu Giai'
        },
        {            
            phone: '0987405781',
            name: 'Bạn Khách Hàng',
            encrypted_password: '$2b$10$fb.F5M82/JcQ8eScq4tfHO1MaQDx426th.mH03RC9IG3BvKC6qfLC',
            email: 'dai.tq194006@sis.hust.edu.vn',
            avatar_url: '/avatars/default_avatar.png',
            status: 1,
            role: 'CUSTOMER',
            province_id: district.province_id,
            district_id: district._id,
            address_detail: 'Số 3 Phố Cửa Bắc'
        }
    ];

    for (var i = 0; i < data.length; i++) {
        await User.create({
            phone: data[i].phone,
            name: data[i].name,
            encrypted_password: data[i].encrypted_password,
            email: data[i].email,
            status: data[i].status,
            role: data[i].role,
            province_id: data[i].province_id,
            district_id: data[i].district_id,
            address_detail: data[i].address_detail
        });       
    }
    console.log("User is Seeded");
}