import { Request, Response } from "express";

export async function addWifi(req: Request, res: Response) {
  try {
    return res.send("add wifi");
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function findAllWifis(req: Request, res: Response) {
  try {
    return res.send("find all wifi");
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function findWifi(req: Request, res: Response) {
  try {
    return res.send("find wifi");
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deleteWifi(req: Request, res: Response) {
  try {
    return res.send("delete wifi");
  } catch (error) {
    return res.status(500).send(error);
  }
}
