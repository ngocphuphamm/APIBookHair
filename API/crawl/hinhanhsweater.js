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
 await request('https://zombieclothingstore.com/collections/sweater-hoodie?page=2', (err,res,html)=>{
    let count = 100 ;
    let countP = 50 ;
    const normalizeText = (text) => {
        return text.replace(/\\n/g, '').trim();
    };
    if(!err && res.statusCode)
    {
 
        const $  = cheerio.load(html);
        const dataJson = [];
        

        $('.product-block').each((index,el)=>{
            
            
            if(count % 2 ==0 )
            {
                const idProduct = `P${countP}`;
                const idImage =`IM${count}`; 
                const URLImage = $(el).find('.product-img  > a > picture > img').attr('data-src');
            
           
     
     

                dataJson.push({
                     idProduct,
                     idImage,
                     URLImage,
                     });
                     count ++ ;
                     console.log(dataJson);
            }
            else
            {
                const idProduct = `P${countP}`;
                const idImage =`IM${count}`; 
                const URLImage = $(el).find('.product-img  > a > picture > .img-hover').attr('data-src');
                dataJson.push({
                    idProduct,
                    idImage,
                    URLImage,
                    });
                count ++ ;
                countP++;
            }
  
         

        })



        fs.writeFileSync('hinhanhsweater.json', JSON.stringify(dataJson)); // lưu dữ liệu vào file data.json
    }
    else{
        console.log(err);
    }
  })
}

crawldata();