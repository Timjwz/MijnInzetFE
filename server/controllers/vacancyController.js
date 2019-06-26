const Model = require("../sequelize");
const Vacancy = Model.Vacancy;
const VacancyPeriods = Model.VacancyPeriods;
const Periods = Model.Periods;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// GET all vacancies
exports.getVacancies = (req, res) => {
  Vacancy.findAll({
    include: [
      {
        model: Periods,
        attributes: ["schoolYear", "quarter"]
      }
    ]
  }).then(vacancies => res.json(vacancies));
};

// GET vacancy by id
exports.getVacancyById = (req, res) => {
  var vacancyId = req.params.vacancyId;
  Vacancy.findOne({
    where: {
      id: vacancyId
    }
  }).then(userResponse => {
    console.log(req.param);
    res.status(200).json(userResponse);
  });
};

// GET all vacancies with slots open
exports.getVacanciesOpen = (req, res) => {
  Vacancy.findAll({
    where: {
      openSlots: {
        [Op.not]: 0
      }
    }
  }).then(userResponse => {
    res.status(200).json(userResponse);
  });
};

// GET all vacancies with no open slots
exports.getVacanciesClosed = (req, res) => {
  Vacancy.findAll({
    where: {
      openSlots: 0
    }
  }).then(userResponse => {
    res.status(200).json(userResponse);
  });
};

//POST a new Vacancy
exports.postVacancy = (req, res) => {
  Vacancy.create({
    title: req.body.title,
    description: req.body.description,
    contactPerson: req.body.contactPerson,
    schoolYear: req.body.schoolYear,
    period: req.body.period,
    typeCourse: req.body.typeCourse,
    typeTask: req.body.typeTask,
    contactHours: req.body.contactHours,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    openSlots: req.body.openSlots,
    createdAt: new Date(),
    updatedAt: new Date()
  })
    .then(userVacancies => res.status(200).json(userVacancies))
    .catch(err => res.status(400).send(console.error(err)));
};
