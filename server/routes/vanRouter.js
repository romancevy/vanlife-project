import express from "express";
import {
  getHostVan,
  getHostVans,
  getVan,
  getVans,
} from "../controller/vanController.js";
const router = express.Router();

router.route("/vans").get(getVans);
router.route("/vans/:id").get(getVan);

router.route("/host/vans").get(getHostVans);
router.route("/host/vans/:id").get(getHostVan);

export default router;
