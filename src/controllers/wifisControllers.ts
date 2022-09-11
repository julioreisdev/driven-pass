import { Request, Response } from "express";
import { IWifi } from "../interfaces/wifis.interface";
import {
  addWifiService,
  deleteWifiUserService,
  findAllWifisUserService,
  findWifiUserService,
} from "../services/wifisServices";

export async function addWifi(req: Request, res: Response) {
  const data: IWifi = req.body;
  const userId: number = res.locals.userId;
  try {
    const result = await addWifiService({ ...data, userId });
    return res.send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function findAllWifis(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  try {
    const result = await findAllWifisUserService(userId);
    return res.send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function findWifi(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const id: number = Number(req.params.id);
  try {
    const result = await findWifiUserService(userId, id);
    return res.send(result);
  } catch (error: any) {
    if (error.type === "not_found") return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}

export async function deleteWifi(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const id: number = Number(req.params.id);
  try {
    const result = await deleteWifiUserService(userId, id);
    return res.send(result);
  } catch (error: any) {
    if (error.type === "not_found") return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}
