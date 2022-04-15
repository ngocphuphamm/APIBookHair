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
   request('https://highclub.vn/collections/new-arrivals', (err,res,html)=>{
   // hinh anh = > id Image
     let count = 0 ;
    // số sản phẩm vừa crawl về  => idProduct ==  product (idProduct);
    let countP = 0 ;
    const normalizeText = (text) => {
        return text.replace(/\\n/g, '').trim();
    };
    if(!err && res.statusCode)
    {
 
        const $  = cheerio.load(html);
        const dataJson = [];

     
        $('.product-block').each((index,el)=>{
              const idProduct = `P${countP}`;
                const idImage =`IM${count}`; 
                const URLImage = $(el).find('.product-img  > a > picture > img').attr('data-src');
                dataJson.push({
                     idProduct,
                     idImage,
                     URLImage,
                     });
                     count ++ ;
                     countP++;
                console.log(dataJson);
 
          })
        



        fs.writeFileSync('hianh.json', JSON.stringify(dataJson)); // lưu dữ liệu vào file data.json
    }
    else{
        console.log(err);
    }
  })



}

crawldata();