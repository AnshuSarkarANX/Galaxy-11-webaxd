const productModel = require('../model/productModel');
const bannerModel = require('../model/bannerImg');
const adminModel = require('../model/adminModel')
const offerModel = require('../model/OfferModel')
const bookingModel = require('../model/bookingModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path');
const { name } = require('ejs');


exports.adminauth = (req, res, next) => {
    if (req.admin) {
        // console.log(req.admin, "aa");
        next();
    } else {
        // console.log(req.admin, "bb");
        req.flash('error', "can not access this page ..please login first")
        res.redirect('/admin/')
    }
}

exports.registration = (req, res) => {
    // console.log(result);
    res.render('admin/registration', {
        title: 'registration Page',
        data: req.admin,
        message: req.flash('message'),
        error: req.flash('error'),
    })
}

exports.register_create = (req, res) => {
    const signup = new adminModel({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    })
    if (req.file) {
        signup.image = req.file.path
    }
    signup.save().then(result => {
        // console.log(result);
        req.flash('message', "Admin Register Successfull..")

        res.redirect('/admin/')
    }).catch(err => {
        // console.log(err);
        req.flash('error', "Admin Register Try again...")
        res.redirect('/admin/registation')

    })
}

exports.login = (req, res) => {
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('./admin/login', {
        title: "admin || login",
        message: req.flash('message'),
        error: req.flash('error'),
        data1: loginData,
        data: req.admin,

    })
}

exports.logincreate = (req, res) => {
    adminModel.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data) {
            const haspassword = data.password
            if (bcrypt.compareSync(req.body.password, haspassword)) {
                const token = jwt.sign({
                    id: data._id,
                    name: data.name,
                    image: data.image
                }, 'galaxy11cafe@2024', { expiresIn: '1h' })
                res.cookie('AdminToken', token)
                // console.log(data.name);
                // console.log(data.image);
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                // console.log(data);
                // console.log(req.body);
                req.flash('message', "You are Login Successfully")
                res.redirect('/admin/dashboard')
            } else {
                // console.log("Incorrect password");
                req.flash('error', "Incorrect password")

                res.redirect('/admin/')
            }
        } else {
            // console.log("Incorrect email");
            req.flash('error', "Incorrect Email")
            res.redirect('/admin/')
        }
    })
}

exports.logout = (req, res) => {
    res.clearCookie('AdminToken')
    res.redirect('/admin/')
}

exports.dashboard = (req, res) => {
    bookingModel.find().then(result => {
    res.render('admin/dashboard', {
        title: 'dashboard Page',
        data: req.admin,
        displayData: result,
        message: req.flash('message'),
        error: req.flash('error'),
    })
    })
}

exports.product = (req, res) => {
    productModel.find().then(result => {
        res.render('admin/product', {
            title: 'product Page',
            data: req.admin,
            message: req.flash('message'),
            error: req.flash('error'),
            displayData: result,

        })
    })
}

exports.createProduct = (req, res) => {
    const image = req.file
    productModel({
        product_name: req.body.product_name,
        image: image.path,
        // image: req.file.filename,
        description: req.body.description,
        price: req.body.price
    }).save().then(result => {
        // console.log(result);
        // console.log("Item added successfull..")
        req.flash('message', "Product added successfull..")

        res.redirect('/admin/product')
    }).catch(err => {
        // console.log(err);
        req.flash('error', "Product not added..")
        res.redirect('/admin/product')

    })
}

exports.edit = (req, res) => {
    pId = req.params.id;
    // console.log("pid", pId);
    productModel.findById(pId).then(result => {
        res.render('admin/edit', {
            title: 'Item Page',
            data: req.admin,
            editData: result,
            message: req.flash('message'),
            error: req.flash('error'),
        })
    }).catch((err) => {
        console.log(err);
    })
    // console.log("itemId:", pId);
}

exports.update = (req, res) => {
    // const image = req.file
    const prod_id = req.body.pId
    // console.log("prod_Id:", prod_id);
    const product_name = req.body.product_name
    const description = req.body.description
    const price = req.body.price

    productModel.findById(prod_id).then((result) => {

        result.product_name = product_name
        result.description = description
        result.price = price
        // result.image = image.path
        result.save().then(data => {
            res.redirect('/admin/product')
            // console.log(data, "Product Update Successfully");
            req.flash(data, "Item Update Successfully");
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })

}

exports.deleteProduct = (req, res) => {
    const pid = req.params.id
    productModel.deleteOne({ _id: pid }).then(del => {
        res.redirect('/admin/product')
        req.flash('error', "Product Delete Successfully");
        // console.log(del, "data deleted successfully")
    }).catch(err => {
        console.log(err)
    })
}

exports.banner = (req, res) => {
    bannerModel.find().then(result => {
        res.render('admin/banner', {
            title: 'Banner ',
            data: req.admin,
            message: req.flash('message'),
            error: req.flash('error'),
            displayData: result,
        })
    })
}


exports.createBanner = (req, res) => {
    const banner = new bannerModel({
        description: req.body.description,
    });

    if (req.files['image']) {
        banner.image = req.files['image'][0].path;
    }
    if (req.files['mobileImage']) {
        banner.mobileImage = req.files['mobileImage'][0].path;
    }

    banner.save().then(result => {
        req.flash('message', "Banner added successfully.");
        res.redirect('/admin/banner');
    }).catch(err => {
        console.log(err);
        req.flash('error', "Banner not added.");
        res.redirect('/admin/banner');
    });
};


exports.deleteBanner = (req, res) => {
    const bannerid = req.params.id
    bannerModel.deleteOne({ _id: bannerid }).then(del => {
        res.redirect('/admin/banner')
        req.flash(del, "Banner deleted successfully")
        // console.log(del, "Banner deleted successfully")
    }).catch(err => {
        console.log(err)
    })
}

exports.offer = (req, res) => {
    offerModel.find().then(result => {
        res.render('admin/offer', {
            title: 'offer ',
            data: req.admin,
            message: req.flash('message'),
            error: req.flash('error'),
            displayData: result,
        })
    })
}

exports.createoffer = (req, res) => {
    const offer = new offerModel({
        offer_name: req.body.offer_name,
        offer_percentage: req.body.offer_percentage,
    })
    if (req.file) {
        offer.image = req.file.path
    }
    offer.save().then(result => {
        // console.log(result);
        req.flash('message', "Offer added successfull..")
        // console.log('message', "Offer added successfull..")

        res.redirect('/admin/offer')
    }).catch(err => {
        console.log(err);
        req.flash('error', "Offer not added ..")
        res.redirect('/admin/offer')

    })
}

exports.deleteoffer = (req, res) => {
    const offerId = req.params.id
    offerModel.deleteOne({ _id: offerId }).then(del => {
        res.redirect('/admin/offer')
        console.log(del, "Offer deleted successfully")
    }).catch(err => {
        console.log(err)
    })
}