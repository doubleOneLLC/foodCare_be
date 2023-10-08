import { NextFunction, Request, Response } from "express";
import { errorResponse } from "@/lib/validatorResponse";
import { prisma } from "@/lib/dbConnector";

export * as teamController from "@/controller/team.controller";

export const getTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await prisma.team.findMany();

    if (products.length === 0) {
      return res.status(404).json({ message: "No team found" });
    }
    res.status(201).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const createTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorResponse(req, res);

  try {
    const { name, role, univ } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image file." });
    }

    const people = await prisma.team.create({
      data: {
        name,
        role,
        univ,
        image: req.file.filename,
      },
    });
    res.status(201).json({ success: true, data: people });
  } catch (error) {
    next(error);
  }
};
