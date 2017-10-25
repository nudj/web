const {
  promiseMap
} = require('@nudj/library')

const request = require('../lib/request')
const queries = require('../lib/queries-mutations')

function fetchIncompleteTasksByCompanyAndType (company, type) {
  return request(queries.GetIncompleteTasks, { company, type })
    .then(data => data.tasks)
}

function fetchIncompleteTasksByHirerAndType (hirer, type) {
  return request(queries.GetIncompleteTasks, { hirer, type })
    .then(data => data.tasks)
}

function editTask (id, input) {
  return request(queries.UpdateTask, { id, input })
    .then(data => data.task)
}

function completeTask (task, hirer) {
  const completed = hirer
  const type = task.type // the query wants the type again ¯\_(ツ)_/¯
  return editTask(task.id, {completed, type})
}

const completeTaskByHirerAndType = function (data, hirer, type) {
  data.completedTasks = fetchIncompleteTasksByHirerAndType(hirer, type)
    .then(tasks => Promise.all(tasks.map(task => completeTask(task, hirer))))
  return promiseMap(data)
}

const completeTaskByCompanyAndType = function (data, company, type, hirer) {
  data.completedTasks = fetchIncompleteTasksByCompanyAndType(company, type)
    .then(tasks => Promise.all(tasks.map(task => completeTask(task, hirer))))
  return promiseMap(data)
}

module.exports.completeTaskByType = function (data, company, hirer, type) {
  data.completedTasks = Promise.all([
    completeTaskByHirerAndType({}, hirer, type),
    completeTaskByCompanyAndType({}, company, type, hirer)
  ]).then(completedTasks => [].concat.apply([], completedTasks || []))

  return promiseMap(data)
}
