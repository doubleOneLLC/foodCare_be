import { Router } from "express";
import { fileUploader } from "@/lib/fileUploader";
import { teamController } from "@/controller/team.controller";

export const router = Router();

router.get("/", teamController.getTeam);
router.post(
  "/",
  fileUploader.imageUploader.single("image"),
  teamController.createTeam
);
