const axios = require('axios');

const axiosClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 1000,
});
async function TO(promise) {
    try {
        return [null, await promise];
    } catch (error) {
        return [error, null];
    }
}
const fetcher = async (method, url, valueOnError) => {
    const [error, result] = await TO(axiosClient[method](url));

    if (error) return valueOnError;

    return result.data;
};

class JsonPlaceholder {
    constructor() {
        this.fetcher = fetcher;
    }

    async todos() {
        return this.fetcher('get', `todos?_limit=3`, []);
    }

    async todoById(id) {
        return this.fetcher('get', `todos?id=${id}`, null);
    }
}

module.exports = new JsonPlaceholder();
