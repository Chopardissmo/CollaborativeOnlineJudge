//first, get the problem model
const ProblemModel = require("../models/problemModel");

const getProblems = function() {
  return new Promise((resolve, reject) => {
    //resolve(problems);
    //search operation in MongoDB
    ProblemModel.find({}, (err, problems) => {
      if (err) {
        reject(err);
      } else {
        resolve(problems);
      }
    });
  });
};

const getProblem = function(id) {
  return new Promise((resolve, reject) => {
    //resolve(problems.find(problem => problem.id === id));
    ProblemModel.findOne({ id: id }, (err, problem) => {
      if (err) {
        reject(err);
      } else {
        resolve(problem);
      }
    });
  });
};

const addProblem = function(newProblem) {
  return new Promise((resolve, reject) => {
    // if (problems.find(problem => problem.name === newProblem.name)) {
    //     reject("Problem already existed");
    // } else {
    //     newProblem.id = problems.length + 1;
    //     problems.push(newProblem);
    //     //console.log(newProblem);
    //     resolve(newProblem);
    // }
    ProblemModel.findOne({ name: newProblem.name }, (err, problem) => {
      if (problem) {
        reject("Problem name already existed");
      } else {
        ProblemModel.count({}, (err, num) => {
          newProblem.id = num + 1;
          //based on the schema, create mongodb recognized problem object
          let addedProblem = new ProblemModel(newProblem);
          //save object to MongoDB
          addedProblem.save();
          resolve(newProblem);
        });
      }
    });
  });
};

module.exports = {
  getProblems: getProblems,
  getProblem: getProblem,
  addProblem: addProblem
};
