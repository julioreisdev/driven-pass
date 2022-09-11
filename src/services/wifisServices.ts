import { IWifi } from "../interfaces/wifis.interface";
import wifisRepository from "../repositories/wifisRepository";
import { decrypt, encrypt } from "../utils/cryptr";

interface IWifiResult {
  id: number;
  name: string;
  title: string;
  password: string;
  userId: number;
}

export async function addWifiService(data: IWifi) {
  await wifisRepository.insert({ ...data, password: encrypt(data.password) });
  return "Wifi created successify";
}

export async function findAllWifisUserService(userId: number) {
  const wifis: IWifiResult[] = await wifisRepository.findAllWifisUser(userId);
  if (wifis.length === 0) {
    return { wifis, message: "Wifis is empty" };
  }
  const wifisView = wifis.map((w) => {
    return {
      id: w.id,
      name: w.name,
      title: w.title,
      password: decrypt(w.password),
    };
  });
  return { wifis: wifisView };
}

export async function findWifiUserService(userId: number, id: number) {
  const wifi: IWifiResult[] = await wifisRepository.findWifiUser(userId, id);
  if (wifi.length === 0) {
    throw { type: "not_found", message: "Wifi not found" };
  }
  const wifiView = wifi.map((w) => {
    return {
      id: w.id,
      name: w.name,
      title: w.title,
      password: decrypt(w.password),
    };
  });
  return { wifis: wifiView };
}

export async function deleteWifiUserService(userId: number, id: number) {
  const wifi: IWifiResult[] = await wifisRepository.findWifiUser(userId, id);
  if (wifi.length === 0) {
    throw { type: "not_found", message: "Wifi not found" };
  }
  await wifisRepository.deleteWifi(userId, id);
  return "Wifi deleted successify";
}
