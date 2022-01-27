import express from "express";

const router = express.Router();

// Public Routes
router.get('/', (req, res) => res.render('index'));


export default router;