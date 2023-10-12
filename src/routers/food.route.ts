import { Router } from "express";
import { foodController } from "@/controller/food.controller";

export const router = Router();

router.get("/", foodController.getFood);
