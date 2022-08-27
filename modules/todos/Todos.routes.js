const Joi = require('joi');

const Todos = require('./Todos.database');
const Todo = require('./dto/Todo');

module.exports = [
    {
        method: 'GET',
        path: '/todos',
        handler: async (_, h) => {
            return h.response(await Todos.findAll());
        },
    },

    {
        method: 'GET',
        path: '/todos-local',
        handler: async (_, h) => {
            return h.response(await Todos.findAllLocal());
        },
    },

    {
        method: 'GET',
        path: '/todos/{id}',
        handler: async (req, h) => {
            return h.response(await Todos.findById(req.params.id));
        },
    },

    {
        method: 'POST',
        path: '/todos',
        handler: async ({ payload: p }, h) => {
            return h.response(await Todos.insert(new Todo(p.title, p.userId, p.completed)));
        },
        options: {
            validate: {
                payload: Joi.object({
                    title: Joi.string().trim(),
                    userId: Joi.number(),
                    completed: Joi.bool().optional(),
                }),
            },
        },
    },
];
