const AdminModel=require('../model/adminModel');


exports.CheckDuplicate = (req, res, next) => {
    AdminModel.findOne({
        email: req.body.email
    }).exec((err, email) => {
        // console.log(req.body);
        if (err) {
            // console.log(err);
            return
        }
        if (email) {
            req.flash('error', "Email already exist")
            // console.log("Email already exist");

            return res.redirect('/admin/registration')
        }
        next();
    })

}