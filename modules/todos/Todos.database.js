const JP = require('../../core/JsonPlaceholderApi');
const database = require('../../core/database');

class TodosDB {
    constructor() {
        this.db = database;
        this.JP = JP;
    }

    async insert(todo) {
        return this.db.asyncInsert(todo.model);
    }

    async find(query = {}) {
        return this.db.asyncFind(query);
    }

    async findOne(query) {
        return this.db.asyncFindOne(query);
    }

    async findAll() {
        return (await Promise.all([this.findAllLocal(), this.JP.todos()])).flat();
    }

    async findAllLocal() {
        return this.find({});
    }

    async findById(id) {
        let todo = await this.findOne({ _id: id });

        if (!todo) todo = (await this.JP.todoById(id))[0];

        return todo || null;
    }
}

module.exports = new TodosDB();
