const { v4: makeId } = require('uuid');

class Todo {
    constructor(title, userId, completed) {
        this.title = title || '';
        this.userId = userId;
        this.completed = completed || false;
        this._id = makeId();
    }

    get model() {
        return {
            title: this.title,
            userId: this.userId,
            completed: this.completed,
            _id: this._id,
        };
    }
}

module.exports = Todo;
