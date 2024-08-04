import { Injectable } from '@angular/core';
declare const CryptoJS:any;
declare const bolt:any;
@Injectable({
  providedIn: 'root'
})
export class PayUMoneyService {

  constructor() { }


     PayNow(OrderId:string) {debugger
      
        const date = new Date().toString();
        const  key = "ZcjxZT";
        const  txnid = OrderId+'-txnid-' + new Date().getTime();
        const  amount = "3500";
        const  phone = "8920365052";
        const  firstname = "Mohd";
        const  lastname = "Imran";
        const  email = "imran.m@ceasefire.in";
        const  salt = "RB70k1kPsReP58rm8bL7Pfl8lxfcCt6K";
        const  udf1 = "";
        const  udf2 = "";
        const  udf3 = "";
        const  udf4 = "";
        const  udf5 = "";
        const  productinfo = "EXPRESS";
        const surl = "http://pp42.thirdparty.com/testresponse.php";
        const furl = "http://pp42.thirdparty.com/testresponse.php";
        const orderid = OrderId;//Math.random().toString(36).slice(2, 7);
        const cart_details = {
            "amount": "3500",
            "items": 1,
            "sku_details": [
                {
                    "offer_key": [],
                    "amount_per_sku": "3500",
                    "quantity": "1",
                    "sku_id": "Apple69J",
                    "sku_name": "Earbuds",
                    "logo": "http://cfxtest.ceasefire.biz/assets/images/logo_white.png"
                },
            ]
        };
        const  hashString = key + '|' + txnid + '|' + amount + '|' + productinfo + '|' + firstname + '|' + email + '|' + udf1 + '|' + udf2 + '|' + udf3 + '|' + udf4 + '|' + udf5 + '||||||' + salt;
        const hash = CryptoJS.SHA512(hashString).toString(CryptoJS.enc.Hex);
        const expressData = {
            key: key,
            hash: hash,
            txnid: txnid,
            amount: amount,
            phone: phone,
            firstname: firstname,
            lastname: lastname,
            email: email,
            salt: salt,
            udf1: udf1,
            udf2: udf2,
            udf3: udf3,
            udf4: udf4,
            udf5: udf5,
            isCheckoutExpress: true,
            icp_source: "express",
            productinfo: "EXPRESS",
            surl: surl,
            furl: furl,
            orderid: orderid,
            cart_details: cart_details
        }
        const AUTH_TYPE = 'sha512';
        const data = JSON.stringify(expressData);
        const hash_string = data + '|' + date + '|' + salt;
        const v2hash = CryptoJS.SHA512(hash_string).toString(CryptoJS.enc.Hex);
        const  authHeader = 'hmac username="' + key + '", ' + 'algorithm="' + AUTH_TYPE + '", headers="date", signature="' + v2hash + '"';
        const  expressRequestObj = {
            data: data,
            date: date,
            isCheckoutExpress: true,
            v2Hash: authHeader
        }
        var handlers = {
            responseHandler:  (BOLT:any)=> {
              debugger
                    if(BOLT.response.txnStatus == "SUCCESS"){
                      console.log('Your payment has been successful');
                    }
                    if (BOLT.response.txnStatus == "FAILED") {
                       console.log('Payment failed. Please try again.');
                    }
                    if(BOLT.response.txnStatus == "CANCEL"){
                       console.log('Payment failed. Please try again.');
                    }
                },
            catchException:  (BOLT:any)=> {
                    console.log('Payment failed. Please try again.');
        }};
        bolt.launch( expressRequestObj , handlers);
    }
    //$(document).on('click', '#submit', function () { handleSubmit(); });
  //}
}
