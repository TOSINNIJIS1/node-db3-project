const db = require('../data/dbconfig')

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
    .where({ id })
    .first()
}

function findSteps(id) {
    return db('schemes')
    .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .join('steps', 'schemes.id', 'steps.scheme_id')
    .where({scheme_id: id})
}



function add(schemeData) {
    return db('schemes')
    .insert(schemeData)
    .then(id => {
        return findById(id[0])
    })
}

function update(changes, id) {
    return db('schemes')
    .where({id})
    .update(changes)
    .then(id => {       
        findById(id)
    })    
}

function remove(id) {
    return db('schemes')
    .where({id})
    .del()
}

module.exports = {
    find, findById, findSteps, add, update, remove
}