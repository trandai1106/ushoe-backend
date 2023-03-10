var Province = require('../models/province');

exports.seed = async function () {
    await Province.deleteMany().then(function () {
        console.log("Province is cleared");
    }).catch(function (error) {
        console.log(error);
    });
    
    var data = [
        { id: 1, name: 'Thành phố Hà Nội', type: 'Thành phố Trung ương', },
        { id: 2, name: 'Tỉnh Hà Giang', type: 'Tỉnh' },
        { id: 4, name: 'Tỉnh Cao Bằng', type: 'Tỉnh' },
        { id: 6, name: 'Tỉnh Bắc Kạn', type: 'Tỉnh' },
        { id: 8, name: 'Tỉnh Tuyên Quang', type: 'Tỉnh' },
        { id: 10, name: 'Tỉnh Lào Cai', type: 'Tỉnh' },
        { id: 11, name: 'Tỉnh Điện Biên', type: 'Tỉnh' },
        { id: 12, name: 'Tỉnh Lai Châu', type: 'Tỉnh' },
        { id: 14, name: 'Tỉnh Sơn La', type: 'Tỉnh' },
        { id: 15, name: 'Tỉnh Yên Bái', type: 'Tỉnh' },
        { id: 17, name: 'Tỉnh Hoà Bình', type: 'Tỉnh' },
        { id: 19, name: 'Tỉnh Thái Nguyên', type: 'Tỉnh' },
        { id: 20, name: 'Tỉnh Lạng Sơn', type: 'Tỉnh' },
        { id: 22, name: 'Tỉnh Quảng Ninh', type: 'Tỉnh' },
        { id: 24, name: 'Tỉnh Bắc Giang', type: 'Tỉnh' },
        { id: 25, name: 'Tỉnh Phú Thọ', type: 'Tỉnh' },
        { id: 26, name: 'Tỉnh Vĩnh Phúc', type: 'Tỉnh' },
        { id: 27, name: 'Tỉnh Bắc Ninh', type: 'Tỉnh' },
        { id: 30, name: 'Tỉnh Hải Dương', type: 'Tỉnh' },
        { id: 31, name: 'Thành phố Hải Phòng', type: 'Thành phố Trung ương' },
        { id: 33, name: 'Tỉnh Hưng Yên', type: 'Tỉnh' },
        { id: 34, name: 'Tỉnh Thái Bình', type: 'Tỉnh' },
        { id: 35, name: 'Tỉnh Hà Nam', type: 'Tỉnh' },
        { id: 36, name: 'Tỉnh Nam Định', type: 'Tỉnh' },
        { id: 37, name: 'Tỉnh Ninh Bình', type: 'Tỉnh' },
        { id: 38, name: 'Tỉnh Thanh Hóa', type: 'Tỉnh' },
        { id: 40, name: 'Tỉnh Nghệ An', type: 'Tỉnh' },
        { id: 42, name: 'Tỉnh Hà Tĩnh', type: 'Tỉnh' },
        { id: 44, name: 'Tỉnh Quảng Bình', type: 'Tỉnh' },
        { id: 45, name: 'Tỉnh Quảng Trị', type: 'Tỉnh' },
        { id: 46, name: 'Tỉnh Thừa Thiên Huế', type: 'Tỉnh' },
        { id: 48, name: 'Thành phố Đà Nẵng', type: 'Thành phố Trung ương' },
        { id: 49, name: 'Tỉnh Quảng Nam', type: 'Tỉnh' },
        { id: 51, name: 'Tỉnh Quảng Ngãi', type: 'Tỉnh' },
        { id: 52, name: 'Tỉnh Bình Định', type: 'Tỉnh' },
        { id: 54, name: 'Tỉnh Phú Yên', type: 'Tỉnh' },
        { id: 56, name: 'Tỉnh Khánh Hòa', type: 'Tỉnh' },
        { id: 58, name: 'Tỉnh Ninh Thuận', type: 'Tỉnh' },
        { id: 60, name: 'Tỉnh Bình Thuận', type: 'Tỉnh' },
        { id: 62, name: 'Tỉnh Kon Tum', type: 'Tỉnh' },
        { id: 64, name: 'Tỉnh Gia Lai', type: 'Tỉnh' },
        { id: 66, name: 'Tỉnh Đắk Lắk', type: 'Tỉnh' },
        { id: 67, name: 'Tỉnh Đắk Nông', type: 'Tỉnh' },
        { id: 68, name: 'Tỉnh Lâm Đồng', type: 'Tỉnh' },
        { id: 70, name: 'Tỉnh Bình Phước', type: 'Tỉnh' },
        { id: 72, name: 'Tỉnh Tây Ninh', type: 'Tỉnh' },
        { id: 74, name: 'Tỉnh Bình Dương', type: 'Tỉnh' },
        { id: 75, name: 'Tỉnh Đồng Nai', type: 'Tỉnh' },
        { id: 77, name: 'Tỉnh Bà Rịa - Vũng Tàu', type: 'Tỉnh' },
        { id: 79, name: 'Thành phố Hồ Chí Minh', type: 'Thành phố Trung ương' },
        { id: 80, name: 'Tỉnh Long An', type: 'Tỉnh' },
        { id: 82, name: 'Tỉnh Tiền Giang', type: 'Tỉnh' },
        { id: 83, name: 'Tỉnh Bến Tre', type: 'Tỉnh' },
        { id: 84, name: 'Tỉnh Trà Vinh', type: 'Tỉnh' },
        { id: 86, name: 'Tỉnh Vĩnh Long', type: 'Tỉnh' },
        { id: 87, name: 'Tỉnh Đồng Tháp', type: 'Tỉnh' },
        { id: 89, name: 'Tỉnh An Giang', type: 'Tỉnh' },
        { id: 91, name: 'Tỉnh Kiên Giang', type: 'Tỉnh' },
        { id: 92, name: 'Thành phố Cần Thơ', type: 'Thành phố Trung ương' },
        { id: 93, name: 'Tỉnh Hậu Giang', type: 'Tỉnh' },
        { id: 94, name: 'Tỉnh Sóc Trăng', type: 'Tỉnh' },
        { id: 95, name: 'Tỉnh Bạc Liêu', type: 'Tỉnh' },
        { id: 96, name: 'Tỉnh Cà Mau', type: 'Tỉnh' }
    ];

    for (var i = 0; i < data.length; i++) {
        await Province.create({
            id: data[i].id,
            name: data[i].name,
            type: data[i].type,
        }).catch((error) => {
            console.log(error);
        });
    }
    // Province.insertMany(data)
    console.log("Province is Seeded");
}