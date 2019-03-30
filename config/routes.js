/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'get /api/test-user': 'TestUserController.search',

  'get /api/goods': 'GoodsController.search',
  'put /api/goods': 'GoodsController.create',
  'delete /api/goods': 'GoodsController.del',
  'post /api/goods': 'GoodsController.edit',

  'get /api/goodsType': 'GoodsTypeController.search',
  'put /api/goodsType': 'GoodsTypeController.create',
  'delete /api/goodsType': 'GoodsTypeController.del',
  'post /api/goodsType': 'GoodsTypeController.edit',

  'get /api/lagou': 'LagouController.search',
  'put /api/lagou': 'LagouController.create',
  'delete /api/lagou': 'LagouController.del',
  'post /api/lagou': 'LagouController.edit',
  'get /api/lagou/getExternalData': 'LagouController.getExternalData',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
