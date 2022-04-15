const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");
var ObjectId = require('mongodb').ObjectId; 

var mongoObjectId = function () {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

const clear = (text) => {
  const price = text.replace(",", "").trim();
  const priceString = price.replace("₫", "").trim();
  const priceSlice = priceString.slice(0, 3).trim();
  const priceNumber = Number(priceSlice);
  return priceNumber;
};
async function crawldata() {
 await request('https://zombieclothingstore.com/collections/sweater-hoodie', (err,res,html)=>{
    let count = 40 ;
    const normalizeText = (text) => {
        return text.replace(/\\n/g, '').trim();
    };
    if(!err && res.statusCode)
    {
 
        const $  = cheerio.load(html);
        const dataJson = [];
        

        $('.product-block').each((index,el)=>{
  
           const idProduct =`P${count}`; 
           const nameProduct = normalizeText($(el).find(' .box-pro-detail a').text());
           const price = clear(normalizeText($(el).find('.box-pro-detail span').text()));
           const sizeXL = 10 ;
           const sizeM = 5 ;
           const sizeL = 15;
           const description = `
           <div class="description-productdetail"> <p><strong>MÔ TẢ SẢN PHẨM</strong></p><ul><li><p><strong>Sản phẩm Unisex cho cả nam và nữ, 1 item không thể thiếu trong tủ quần áo của những anh chàng hay cô nàng năng động cá tính.</strong></p></li><li><p><strong>HÌNH THẬT GIỐNG MẪU</strong></p></li><li><p><strong>Hàng có sẵn 100%, không phải chờ đợi lâu.</strong></p></li><li><p><strong>CHẤT LIỆU: Vải cotton hút ẩm tốt ,mịn mát,co giãn, dày vừa ko bí, mang đến cảm giác dễ chịu cho người sử dụng.</strong></p></li><li><p><strong>Màu sắc có thể đậm hoặc nhạt 1-5% do hiệu ứng ánh sáng (có thể do bóng râm, đèn sáng hoặc tối, độ phân giải của máy ảnh).</strong></p></li></ul><p><strong>&nbsp;</strong></p><p><strong>◤CAM KẾT CỦA SHOP</strong></p><ul><li><p><strong>&nbsp;HÌNH THẬT GIỐNG MẪU 100%, TẤT CẢ HÌNH ẢNH ĐỀU DO SHOP TỰ CHỤP.</strong></p></li><li><p><strong>Sản phẩm được kiểm tra kỹ càng&nbsp;trước khi giao hàng cho khách .</strong></p></li><li><p><strong>Hỗ trợ đổi size nếu khách mặt không vừa, không ưng ý sản phẩm muốn đổi sang sản phẩm khác.</strong></p></li><li><p><strong>Hỗ trợ đổi đối với các lỗi từ nhà sản xuất.</strong></p></li><li><p><strong>Hỗ trợ đổi trong vòng 7 ngày kể từ ngày nhận hàng, sản phẩm mới và còn nguyên tem mác.</strong></p></li></ul><p>&nbsp;</p><p><strong>⚠&nbsp;THÔNG SỐ CHỌN SIZE:</strong></p><p><strong>SIZE S/SIZE 28: 1m45 - 1m60 (45 - 53kg)</strong></p><p><strong>SIZE M/SIZE 30: 1m5 - 1m65 (53 - 58kg)</strong></p><p><strong>SIZE L/SIZE 32: 1m55 - 1m7 ( 58 - 68kg)</strong></p><p><strong>SIZE XL/SIZE 34: 1m60 - 1m8 (68 - 75kg)</strong></p><p><strong>SIZE XXL/SIZE 36: 1m75 - 1m85 (75 - 85kg)</strong></p><p><strong>(Bảng size trên chỉ mang tính chất tham khảo, vui lòng xem thêm bảng size cho từng sản phẩm&nbsp; hoặc chat với nhân viên của shop để được hỗ trợ)</strong></p><p><br><strong>⚠&nbsp;HƯỚNG DẪN BẢO QUẢN</strong></p><p><strong>- Giặt lần đầu tiên với nước lạnh và nước xả vải (không sử dụng bột giặt) để sản phẩm giữ màu được lâu.</strong></p><p><strong>- Giặt mặt trái, nhẹ tay, giặt xong phơi ngay, không ngâm sản phẩm trong nước quá lâu, không sử dụng các loại chất tẩy.<br>- Quần áo trắng -&nbsp; màu nên chia ra giặt riêng, không giặt chung.</strong></p><p><strong>- Không giặt chung với các sản phẩm dễ xước, tránh vướng mắc khi giặt và phơi.<br>- Với sản phẩm có in chỉ nên giặt ở chế độ giặt vải mềm để đảm bảo độ bền của sản phẩm.&nbsp;</strong></p><p><strong>- Tránh phơi sản phẩm dưới nắng trực tiếp, phơi nơi thoáng mát.</strong></p><p><strong>&nbsp;</strong></p><p><strong>⚠&nbsp;GIAO HÀNG&nbsp;</strong></p><ul><li><p><strong>Freeship cho hoá đơn mua hàng trị giá trên 200.000 vnd&nbsp;</strong></p></li><li><p><strong>Khách hàng đặt hàng , nhận hàng rồi mới thanh toán&nbsp;</strong></p></li><li><p><strong>Khách được kiểm tra hàng trước để đảm bảo giao đúng mẫu trước khi thanh toán cho shipper&nbsp;</strong></p></li><li><p><strong>Thời gian giao hàng: dao động từ 3 - 4 ngày kể từ khi xác nhận đơn (không tính thứ 7 và CN)</strong></p></li><li><p><strong>Không freeship đối với các sản phẩm SALE.</strong></p></li></ul><p>&nbsp;</p><p><strong>&nbsp;⚠&nbsp;﻿LƯU Ý:</strong></p><p><strong>ZOMBIE CÓ GỌI ĐỂ XÁC NHẬN ĐƠN, CÁC BẠN ĐỂ Ý &nbsp;GIÙM CHÚNG MÌNH NHEN!</strong></p><p><strong>*******************************************************************</strong></p><p><strong>HỆ THỐNG BÁN HÀNG TRỰC TUYẾN ZOMBIE:</strong></p><p><strong>Facebook: <a href="https://www.facebook.com/zombie.clo/?__cft__[0]=AZUNTCaoGC9RAOeucW8b_T3DHj-bIUjKUKKaUQiPHrmX2a6G9ijjRMoDVBjRCVKf2zrlJ-y9vn93RcrG26n_BeKHeVkNpYg8mk79k2l2rAzrRZB0FhnROwuYpuPL1GCGQTkfYLN26qcsr798H7bACK8ep9eo-ksLiZPfRQcRlR7WW20EzNIj2LSJDHq9uAugnbC7BPbBBuPnM4bkdZydZ_4NphR6rf5FxmJWbXDh4nbkyA&amp;__tn__=kK-R">https://www.facebook.com/zombie.clo</a></strong></p><p><strong>Instagram: <a href="https://www.instagram.com/zombie.vn/?fbclid=IwAR1kKPaSEr-dqhdnsO72Mq9LuCSO32gsh0k-n5A5c569Vf8nZhOZHz_11YI">https://www.instagram.com/zombie.vn/</a></strong></p><p><strong>Shopee: <a href="https://shopee.vn/zombieshopvn?fbclid=IwAR0FU6WkfGwwfqebJSMHA_QqXXRSENu5QGTiE3RSvjJMTTp7bF7ej2T4Qy8">&nbsp;https://shopee.vn/zombieshopvn</a></strong></p><p><strong>Website: <a href="https://zombieclothingstore.com/?fbclid=IwAR0SShWEOVQuo2gbzd7woJRJDlfu673WWH1FqfIcLQzas1RxEo6bEOZ2ZKk">https://zombieclothingstore.com/</a></strong></p><p><strong>Lazada:<a href="https://www.lazada.vn/shop/zombieclothingstore?fbclid=IwAR1gn2JL9WLetSYJUM1BzOjFUGfRDmMr_5HutAuMayGsoFF5Mz7VIRVGMh4"> https://www.lazada.vn/shop/zombieclothingstore</a>&nbsp;</strong></p><p><strong>DOSI-IN:<a href="https://dosi-in.com/zombie/?fbclid=IwAR0u8FTppFhCPOhKdSQ9LoutKV0geD_vz4XqzR5bxY6i8e8rUCG_VLgR7WE"> https://dosi-in.com/zombie/</a>&nbsp;</strong></p><p><strong>📲️Hotline :079 939 1168</strong></p><p>&nbsp;</p><p><strong>HỆ THỐNG CỬA HÀNG ZOMBIE:</strong></p><p><strong>🕹CN 1: 96 Tôn Thất Tùng , P.Bến Thành ,Quận 1,HCM.</strong></p><p><strong>🕹CN 2: 805 Hoàng Sa,Phường 9 , Quận 3 ,HCM . (Gần cầu Trần Quang Diệu)&nbsp;</strong></p><p><strong>🕹CN 3: 124/43 Xô Viết Nghệ Tĩnh ,P21,Bình Thạnh ,HCM (Hẻm 72 cũ) .</strong></p> </div>
           `;
          const idType =  `T03`;

    //     //    const image0 = $(el).find('.product-img  > a > picture > img').attr('data-src');
    //     //    const image1 = $(el).find('.product-img  > a > picture > .img-hover').attr('data-src');
      
    //         // const imageList = [image0, image1];
    //         // const productDes = "Vải cotton hút ẩm tốt ,mịn mát,co giãn, dày vừa ko bí, mang đến cảm giác dễ chịu cho người sử dụng.";


           count ++ ;
           dataJson.push({
                idProduct,
                idType,
                nameProduct ,
                price ,
                sizeXL,
                sizeM,
                sizeL,
                description
                });
                console.log(dataJson);

        })



        fs.writeFileSync('aosweater.json', JSON.stringify(dataJson)); // lưu dữ liệu vào file data.json
    }
    else{
        console.log(err);
    }
  })
}

crawldata();