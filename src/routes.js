const {Router} = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const routes = Router();

/* Tipos de parâmetros:
Query Params: request.query
Route Params: request.params
Body: request.body
*/
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;