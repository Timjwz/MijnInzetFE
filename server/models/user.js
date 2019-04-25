module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  User.associate = models => {
    User.hasMany(models.UserVacancy, {
      foreignKey: "user"
    });

    User.hasMany(models.Timeslot, {
      foreignKey: "user_id"
    });
  };

  return User;
};

exports.User = User;
exports.validate = validateUser;
