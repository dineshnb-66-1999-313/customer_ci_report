require("dotenv").config();
const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const { Client } = require('pg');
const axios = require("axios");
const path = require('path');
const moment = require('moment');

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true,limit:'50mb',type:'application/x-www-form-urlencoded' }));

const client = new Client({
    user: 'postgres',
    host: '10.133.103.121',
    database: 'postgres',
    password: 'admin',
    port: 5432,
  })
  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


router.get('/fetchCompanies/:offertype', (req,res) => {
    client.query("SELECT DISTINCT company FROM customerdetails WHERE offertype = $1 ORDER BY company ASC", [req.params.offertype], (err, company_names) => {
        if(!err){
            res.send({
                message: "Data Got Successfully !",
                data: company_names.rows,
            });
        }
        else{
            (err);
        }
    })
})

router.get('/fetchModelIds', (req,res) => {
    client.query("SELECT DISTINCT modelid FROM customerdetails ORDER BY modelid ASC", (err, model_ids) => {
        if(!err){
            res.send({
                message: "Data Got Successfully !",
                data: model_ids.rows,
            });
        }
        else{
            (err);
        }
    })
})

router.get('/fetchOperationalStatus', (req,res) => {
    client.query("SELECT DISTINCT operationalstatus FROM customerdetails ORDER BY operationalstatus ASC", (err, operation_status) => {
        if(!err){
            res.send({
                message: "Data Got Successfully !",
                data: operation_status.rows,
            });
        }
        else{
            console.log(err);
        }
    })
})

router.get('/fetchInstallstatus', (req,res) => {
    client.query("SELECT DISTINCT installstatus FROM customerdetails ORDER BY installstatus ASC", (err, install_status) => {
        if(!err){
            res.send({
                message: "Data Got Successfully !",
                data: install_status.rows,
            });
        }
        else{
            console.log(err);
        }
    })
})

router.get('/fetchStatusValidations', (req,res) => {
    client.query("SELECT DISTINCT statusvalidation FROM customerdetails ORDER BY statusvalidation ASC", (err, status_validation) => {
        if(!err){
            res.send({
                message: "Data Got Successfully !",
                data: status_validation.rows,
            });
        }
        else{
            console.log(err);
        }
    })
})

router.get('/fetchOfferTypes', (req,res) => {
    client.query("SELECT DISTINCT offertype FROM customerdetails ORDER BY offertype ASC", (err, offer_type) => {
        if(!err){
            res.send({
                message: "Data Got Successfully !",
                data: offer_type.rows,
            });
        }
        else{
            console.log(err);
        }
    })
})


//----------------------------------------------------------------------------

router.get('/getcoulmnnames', (req, res) => {
    client.query("select ordinal_position, column_name from information_schema.columns where table_name='customerdetails'", (err, columns_name) => {
        if(!err){
            res.send({
                message: "Data Got Successfully !",
                data: columns_name,
            });
        }
        else{
            console.log(err);
        }
    })
})

router.post('/getCustomerDetailsWithFilter', (req,res) => {
    const modelids = req.body.modelid;
    let queries = `SELECT *
    FROM customerdetails
    WHERE company LIKE $1
    AND operationalstatus LIKE $2
    AND installstatus LIKE $3
    AND statusvalidation LIKE $4
    AND offertype LIKE $5`;

    const values = [
    `%${req.body.company_name}%`,
    `%${req.body.operation_status}%`,
    `%${req.body.install_status}%`,
    `%${req.body.status_validation}%`,
    `%${req.body.offer_type}%`
    ];

    if (modelids.length > 0) {
        const placeholders = modelids.map((_, index) => `$${index + 6}`).join(', ');
        queries += ` AND modelid IN (${placeholders})`;
        values.push(...modelids);
    } else {
    // Add a condition that always evaluates to false
        queries += ' OR FALSE';
    }

    client.query(queries, values)
    .then((getcidata) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        console.log(getcidata.rowCount)
        res.send({
            message: "Data Inserted Successfully",
            data: getcidata.rows,
        });
    })
    .catch((err) => {
        res.statusCode = 404;
        console.log(err)
        res.send(err);
    })
})

// --------------------  Excel Generation ----------------------

router.post('/GenerateExcelData', (req,res) => {
    console.log(req.body.row);
})

// -----------------Mop Generation ------------------------------

router.post('/getselectedrowdata/', (req,res) => {
    const row_data = req.body;
    client.query(`SELECT * FROM customerdetails WHERE name IN (${row_data.map((_, i) => `$${i + 1}`).join(',')})`,row_data, (err, datagot) => {
        if(!err){
            res.send({
                Message : "Data Got successfully",
                data: datagot
            })
        }
        else{
            console.log(err);
        }
    })
})

// var mysqlconnect = mysql.createConnection({
//     host: "10.133.103.121", // database-2.cvuqcpmfyhsv.ap-southeast-1.rds.amazonaws.com
//     port: "5432",
//     user: "postgres",// admin
//     password: "admin", //  dineshnb66@D
//     database: "postgres", //farmer_portal_website
//     multipleStatements: true
// })

// mysqlconnect.connect(err => {
//     if(err){
//         console.log("Database Is not Connected" + JSON.stringify(err, undefined, 2));
//     }
//     else{
//         console.log("DataBase conneted Successfully")
//     }
// })

// // --------------------------------------------------------------------------------------

// router.get('/getcoulmnnames', (req, res) => {
//     mysqlconnect.query('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME="add_crop_image_table"', (err, columns_name) => {
//         if(!err){
//             res.send({
//                 message: "Data Got Successfully !",
//                 data: columns_name,
//             });
//         }
//         else{
//             console.log(err);
//         }
//     })
// })

// //---------------------------------------------------------------------------------------
// // ------------------------------- Address area -----------------------------------------

// router.get('/address/addressdefult', AuthenticateUser, (req, res) => {
//     mysqlconnect.query("SELECT COUNT(*) AS Address_count FROM user_address_info where E_mail_id = ?", [req.user], (err, address_data) => {
//         res.send({
//             data: address_data
//         })
//     })
// })
// router.get('/address/getaddress', AuthenticateUser, (req, res) => {
//     mysqlconnect.query("SELECT * FROM user_address_info where E_mail_id = ?", [req.user], (err, got_address_data) => {
//         res.send({
//             data: got_address_data
//         })
//     })
// })
// router.get('/address/getaddress/:ID', AuthenticateUser, (req, res) => {
//     mysqlconnect.query("SELECT * FROM user_address_info where E_mail_id = ? AND ID = ?", [req.user, req.params.ID], (err, got_address_data) => {
//         res.send({
//             data: got_address_data
//         })
//     })
// })
// router.post('/address/addaddress', AuthenticateUser, (req, res) => {
//     var UserAddress = [
//         Math.floor(Math.random() * 90000) + 10000,
//         req.body.AddressName,
//         req.user,
//         req.body.AddressPhoneNumber,
//         req.body.Defualt,
//         req.body.AddressPinCode,
//         req.body.AddressState,
//         req.body.AddressDistrict,
//         req.body.AddressLandmark,
//         req.body.AddressHouseNumber
//     ]
//     console.log(UserAddress);
//     mysqlconnect.query("INSERT INTO user_address_info (ID, Name, E_mail_id, phone_number, address_default, pincode, State, District, landmark, AddressHouseNumber) VALUES (?)", [UserAddress], (err, added_address_data) => {
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.send({
//                 data: added_address_data
//             })
//         }
//     })
// })

// router.put('/address/addaddress', AuthenticateUser, (req, res) => {
//     const Values = []
//     mysqlconnect.query("UPDATE user_address_info SET Name = ?, E_mail_id = ?, phone_number = ?, pincode = ?, State = ?, District = ?, landmark = ?, AddressHouseNumber = ? WHERE ID = ?", [req.body.AddressName,req.user,req.body.AddressPhoneNumber,req.body.AddressPinCode,req.body.AddressState,req.body.AddressDistrict,req.body.AddressLandmark,req.body.AddressHouseNumber,req.body.AddressId], (err, added_address_data) => {
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.send({
//                 data: added_address_data
//             })
//         }
//     })
// })
// router.delete('/address/deleteaddress/:ID', AuthenticateUser, (req, res) => {
//     mysqlconnect.query("DELETE FROM user_address_info where E_mail_id = ? AND ID = ?", [req.user, req.params.ID], (err, deleted_address_data) => {
//         res.send({
//             data: deleted_address_data
//         })
//     })
// })


// // --------------------------------------------------------------------------------------



// router.get('/getallcropid', (req,res) => {
//     mysqlconnect.query("SELECT crop_id from add_crop_image_table", (err, crop_id_data) => {
//         if(!err){
//             res.send({
//                 message: "Data Got !",
//                 data: crop_id_data
//             })
//         }
//         else {
//             res.statusCode = 404;
//             res.send(err);
//         }
//     })
// })

// router.get('/getallcrop_category',(req,res) => {
//     mysqlconnect.query("SELECT * FROM crop_category",(err, crop_category_data) => {
//         if(!err){
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.send({
//               message: "Data fetched Successfully",
//               data: crop_category_data,
//             });
//         }
//     });
// })

// router.get('/getallcrop_name/:crop_category',(req,res) => {
//     mysqlconnect.query("SELECT * FROM crop_category_items WHERE Crop_Category = ?",[req.params.crop_category],(err, crop_name_data) => {
//         if(!err){
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.send({
//               message: "Data fetched Successfully",
//               data: crop_name_data,
//             });
//         }
//     });
// })

// router.get('/getentireData/:ID',(req,res) => {
//     mysqlconnect.query("SELECT * FROM add_crop_image_table WHERE Crop_id = ?",[req.params.ID],(err, crop_details) => {
//         if(!err){
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.send({
//               message: "Data fetched Successfully",
//               data: crop_details,
//             });
//         }
//     });
// })

// router.get('/getpurchaserDatils/:ID', (req,res) => {
//     mysqlconnect.query("SELECT * FROM purchased_crop_item WHERE Crop_id = ?",[req.params.ID],(err, purchaser_info) => {
//         if(!err){
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.send({
//               message: "Data fetched Successfully",
//               data: purchaser_info,
//             });
//         }
//     });
// })

// // graph related

// router.get('/getcropnamesprice/:emailid', (req,res) => {
//     mysqlconnect.query("SELECT E_mail_id, crop_name, max(crop_price) AS crop_price FROM add_crop_image_table WHERE E_mail_id = ? GROUP BY crop_name;", [req.params.emailid],(err,data) => {
//         if(!err){
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.send({
//               message: "Data fetched Successfully",
//               data: data,
//             });
//         }
//     })
// })
// router.get('/getfarmeremailid',(req,res) => {
//     mysqlconnect.query("SELECT DISTINCT E_mail_id FROM add_crop_image_table", (err,data) => {
//         if(!err){
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.send({
//               message: "Data fetched Successfully",
//               data: data,
//             });
//         }
//     })
// })
// router.get('/getcrop_status_count/:emailid', (req,res) => {
//     mysqlconnect.query("SELECT crop_status, COUNT(crop_status) AS Approved_count FROM add_crop_image_table WHERE E_mail_id = ? GROUP BY crop_status", [req.params.emailid], (err, data) => {
//         if(!err){
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.send({
//               message: "Data fetched Successfully",
//               data: data,
//             });
//         }
//     })
// })
// router.get('/getinitialchartdata', (req,res) => {
//     mysqlconnect.query("SELECT E_mail_id, crop_name, max(crop_price) AS crop_price FROM add_crop_image_table GROUP BY E_mail_id, crop_name ORDER BY E_mail_id", (err, data) => {
//         if(!err){
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.send({
//               message: "Data fetched Successfully",
//               data: data,
//             });
//         }
//     })
// })

// ///// sign up details

// router.post('/signupUser', async (req, res) => {
//     const saltpassword = await bcrypt.genSalt(10);
//     const securpassword = await bcrypt.hash(req.body.Password, saltpassword)
//     const signupuser = [
//         req.body.FirstName,
//         req.body.LastName,
//         req.body.EmailId,
//         req.body.PhoneNumber,
//         req.body.DOB,
//         req.body.Gender,
//         securpassword
//     ]
//     mysqlconnect.query("INSERT INTO sign_up_users_details (First_Name, Last_Name, E_mail_id, phone_number, date_of_birth, user_gender, cre_password) VALUES (?)", [signupuser], (err, rows)=>{
//         if(req.body.Gender === "Male"){
//             mysqlconnect.query("INSERT INTO user_profile_information (E_mail_id, Profile_Status, Default_profile, Actual_profile_image) VALUES (?, ?, ?, ?)", [req.body.EmailId, "NO",Default_Male_profile, Default_Male_profile], (err, Profile_data) => {
//                 if (!err) {
//                     res.statusCode = 200;
//                     res.setHeader("Content-Type", "application/json");
//                     res.send({
//                       message: "Profile Data Inserted Successfully",
//                       data: rows,
//                       Profile_data: Profile_data
//                     });
//                   } else {
//                     res.statusCode = 404;
//                     res.send(err);
//                   }
//             })
//         }
//         else{
//             mysqlconnect.query("INSERT INTO user_profile_information (E_mail_id, Profile_Status, Default_profile, Actual_profile_image) VALUES (?, ?, ?, ?)", [req.body.EmailId, "NO", Default_Female_profile, Default_Female_profile], (err, Profile_data) => {
//                 if (!err) {
//                     res.statusCode = 200;
//                     res.setHeader("Content-Type", "application/json");
//                     res.send({
//                       message: "Profile Data Inserted Successfully",
//                       data: rows,
//                       Profile_data: Profile_data
//                     });
//                   } else {
//                     res.statusCode = 404;
//                     res.send(err);
//                   }
//             })
//         }
//     })
// })

// router.get('/getemailunique/:email', (req, res) => {
//     mysqlconnect.query("SELECT COUNT(*) AS email_unique FROM sign_up_info WHERE email_id = ?", [req.params.email], (err, data) => {
//         if(!err){
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.send({
//               message: "Data fetched Successfully",
//               data: data,
//             });
//         }
//         else{
//             res.statusCode = 404;
//             res.send(err);
//         }
//     })
// })

// router.get('/getphoneunique/:phone', (req, res) => {
//     mysqlconnect.query("SELECT COUNT(*) AS phone_unique FROM sign_up_info WHERE phone_number = ?", [req.params.phone], (err, data) => {
//         if(!err){
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.send({
//               message: "Data fetched Successfully",
//               data: data,
//             });
//         }
//         else{
//             res.statusCode = 404;
//             res.send(err);
//         }
//     })
// })


// router.post('/login', async(req, res) => {
//     const loginData = [
//         req.body.Emailid,
//         req.body.Password
//     ]
//     mysqlconnect.query("SELECT * FROM sign_up_users_details WHERE E_mail_id = ?", [loginData[0]], (err, email_password)=>{
//         if(!err){
//             if(email_password.length > 0){
//                 bcrypt.compare(loginData[1], email_password[0].cre_password)
//                 .then(data => {
//                     if(data){
//                         const accesstoken = jwt.sign(email_password[0].E_mail_id, `${process.env.ACCESS_TOKEN_SECRET}`)
//                         console.log(accesstoken);
//                         localStorage.setItem('Token', `Bearer ${accesstoken}`)
//                         //console.log(client.get('Token'));
//                         res.status(200).send({
//                             successmessage: "login Successfuly",
//                             Token: accesstoken
//                         })
//                     }
//                     else{
//                          res.send({
//                             errormessage: "Password Is Not Correct",
//                             Token: null
//                         })
//                     }
//                 })
//             }
//             else{
//                  res.send({
//                     errormessage: "Email is Not Found",
//                     Token: null
//                 })
//             }
//         }
//         else{
//              res.send({
//                 errormessage: "Some error occur",
//                 Token: null
//             })
//         }
//     })
// })

// router.post('/loggout_user', (req,res) => {
//     localStorage.clear();
//     res.send({
//         message : "User Logged Out",
//         data : null
//     })
// })

// // middle ware funtion :
// function AuthenticateUser(req,res,next){
//     const authHeader = localStorage.getItem('Token');
//     const token = authHeader && authHeader.split(' ')[1];
//     if(token == null){
//         return res.send({
//             ErrorMessage : "Token is not correct",
//             data: null
//         })
//     }
//     else{
//         jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, userdata) => {
//             if(err){
//                 return res.send({
//                     ErrorMessage : "error",
//                     data : null
//                 }) 
//             }
//             req.user = userdata
//             next();
//         })
//     }
// }


// let date_conversion = (data) => {
//     const data_info = data.map(user_data => {
//       user_data.date_of_birth = moment(user_data.date_of_birth).format('LL');
//       return user_data;
//     });
//     return data_info;
//   }

// router.get('/logged_user', AuthenticateUser, (req,res)=>{
//     mysqlconnect.query("SELECT * FROM sign_up_users_details WHERE E_mail_id = ?", [req.user], (err, LoginUserData) => {
//         if(!err){
//             res.send({
//                 message:"Data Got",
//                 data: LoginUserData,
//                 Token : localStorage.getItem('Token')
//             })
//         }
//         else{
//             res.send({
//                 message: "Some error"
//             })
//         }
//     })
// })
// router.delete('/all_user/:user_id', (req,res) => {
//     mysqlconnect.query("DELETE FROM sign_up_info WHERE user_id = ?",[req.params.user_id],(err, deleteddata) => {
//         if(!err){
//             res.send({
//                 message:"data deleted successfully",
//                 data: deleteddata
//             })
//         }
//         else{
//             res.send({
//                 message: "Some error"
//             })
//         }
//     })
// })
// router.get('/user_sign_up_details/userPhone/:PhoneNumber', (req,res) => {
//     mysqlconnect.query("SELECT COUNT(*) as PhoneNumberCount FROM sign_up_users_details WHERE phone_number =?", [req.params.PhoneNumber], (err, Phonecount) => {
//         if(!err){
//             res.send({
//                 message:"data collected successfully",
//                 data: Phonecount
//             })
//         }
//         else{
//             res.send({
//                 message: "Some error"
//             })
//         }
//     })
// })

// router.get('/user_sign_up_details/userEmail/:Emailid', (req,res) => {
//     mysqlconnect.query("SELECT COUNT(*) as EmailIDCount FROM sign_up_users_details WHERE  E_mail_id=?", [req.params.Emailid], (err, Emailcount) => {
//         if(!err){
//             res.send({
//                 message:"data deleted successfully",
//                 data: Emailcount
//             })
//         }
//         else{
//             res.send({
//                 message: "Some error"
//             })
//         }
//     })
// })
// router.post('/user_sign_up_details/:Register_data', (req,res) => {
//     mysqlconnect.query("INSERT INTO sign_up_users_details (First_Name, Last_Name, E_mail_id, date_of_birth, user_gender, phone_number, cre_password) VALUES (?, ?, ?, ?, ?, ?, ?)", [Register_data.FirstName,Register_data.LastName, Register_data.EmailId, Register_data.DOB, Register_data.Gender, Register_data.PhoneNumber, Register_data.Password ], (err, response) => {
//         if(!err){
//             res.send({
//                 message:"data deleted successfully",
//                 data: response
//             })
//         }
//         else{
//             res.send({
//                 message: "Some error"
//             })
//         }
//     })
// })



module.exports = router;