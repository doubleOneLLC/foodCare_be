import { NextFunction, Request, Response } from "express";
import { prisma } from "@/lib/dbConnector";

export * as foodController from "@/controller/food.controller";

export const getFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foods = await prisma.food.findMany();

    if (foods.length === 0) {
      return res.status(404).json({ message: "No food found" });
    }
    res.status(201).json({ success: true, data: foods });
  } catch (error) {
    next(error);
  }
};
