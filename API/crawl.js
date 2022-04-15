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
 await request('https://highclub.vn/collections/tops', (err,res,html)=>{
    let count = 0 ;
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
           const description = `Chất thun 100% cotton co dãn 2 chiều, dày dặn Kỹ thuật DGT tiên tiến giúp hình in bền màu, sắc nét. có 4 size : S/M/L/XL - Size S: Dưới 1m60 - Dưới 55kg - Size M: Dưới 1m65 - Dưới 65kg - Size L: Từ 1m65 -> 1m75 - Từ 65kg -> 75kg - Size XL : trên 1m75, trên 75kg Hãy inbox ngay để biết thêm chi tiết và được hưỡng những ưu đãi nhé ♡ `;
           


           //
          const idCollection =  `C01`;

    //     //    const image0 = $(el).find('.product-img  > a > picture > img').attr('data-src');
    //     //    const image1 = $(el).find('.product-img  > a > picture > .img-hover').attr('data-src');
      
    //         // const imageList = [image0, image1];
    //         // const productDes = "Vải cotton hút ẩm tốt ,mịn mát,co giãn, dày vừa ko bí, mang đến cảm giác dễ chịu cho người sử dụng.";


           count ++ ;
           dataJson.push({
                idProduct,
                idCollection,
                nameProduct ,
                price ,
                sizeXL,
                sizeM,
                sizeL,
                description
                });
                console.log(dataJson);

        })



        fs.writeFileSync('newarrival.json', JSON.stringify(dataJson)); // lưu dữ liệu vào file data.json
    }
    else{
        console.log(err);
    }
  })
}

crawldata();