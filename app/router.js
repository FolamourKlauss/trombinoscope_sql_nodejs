const express = require('express');
const router = express.Router();

const defaultController = require('./controllers/defaultController');
const promoController = require('./controllers/promoController');

router.get("/", defaultController.homepage);
router.get("/promos", promoController.list);
router.get("/promos/:id", promoController.view);
router.get("/promos/:id/students", promoController.listStudents);

module.exports = router;
