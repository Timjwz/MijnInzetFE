const { User } = require("../sequelize");
const { UserRole } = require("../sequelize");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.editUser = (req,res) => {
    console.log("edituser");
    let userId = req.params.userId;

    User.findOne({
        where:{
            id: userId
        }
    }).then(userResponse => {
      res.status(200).json(userResponse);
    })
  };

exports.doEdit = (req, res) => {
    console.log(req.params.userId);
    console.log(req.params.roleId);

    let userId = req.params.userId;
    let roleId = req.body.roleId;

    User.update({
        username: req.body.username,
    }, {
        where: {
            id: userId
        }
    })
    // .then(function(rowsUpdated){
    //     res.json(rowsUpdated);
    // })

    console.log(req.params);

    // UserRole.update({
    //     roleId: req.body.roleId
    // }, 
    // {
    //     where:{
    //         userId: userId
    // },
    // attributes: ["userId", "roleId"]
    // }).then(function(rowsUpdated){
    //     res.json(rowsUpdated);
    // })

    UserRole
        .findOne({ where: {userId: userId} })
        .then(function(obj) {
            if(obj) { // update
                UserRole.update({
                    roleId: roleId
                }, 
                {
                    where:{
                        userId: userId
                },
                attributes: ["userId", "roleId"]
                })
            }
            else { // insert
                UserRole.create({
                    userId: userId,
                    roleId: roleId
                })
            }
        })
}