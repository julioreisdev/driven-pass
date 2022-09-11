import connection from "../database/config";
import { IWifi } from "../interfaces/wifis.interface";

async function insert(data: IWifi) {
  return await connection.wifis.create({ data: data });
}

async function findAllWifisUser(userId: number) {
  return await connection.wifis.findMany({ where: { userId: userId } });
}

async function findWifiUser(userId: number, id: number) {
  return await connection.wifis.findMany({ where: { userId: userId, id: id } });
}

async function deleteWifi(userId: number, id: number) {
  return await connection.wifis.deleteMany({
    where: { userId: userId, id: id },
  });
}

const wifisRepository = {
  insert,
  findAllWifisUser,
  findWifiUser,
  deleteWifi
};

export default wifisRepository;
