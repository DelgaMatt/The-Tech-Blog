const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashRoutes = require('./dashboard-routes')

//localhost:3001/api
//localhost:3001/
//localhost:3001/dashboard

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashRoutes);

module.exports = router ;