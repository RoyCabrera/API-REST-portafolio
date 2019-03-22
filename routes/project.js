const express = require('express');
const ProjectController = require('../controllers/project');
const multiParty = require('connect-multiparty');
/***************************************************** */
var router = express.Router();
var multiPartyMiddleware = multiParty({uploadDir:'./upload'});


router.get('/home',ProjectController.home);
router.post('/test',ProjectController.test);
router.post('/save',ProjectController.saveProject);
router.get("/project/:id?",ProjectController.getProject);
router.get('/projects',ProjectController.getProjects);
router.put('/update/:id',ProjectController.updateProject);
router.delete('/delete/:id',ProjectController.deleteProject);
router.post('/upload-image/:id',multiPartyMiddleware,ProjectController.uploadImage);
router.get('/get-image/:image',ProjectController.getImageFile);

module.exports = router;
