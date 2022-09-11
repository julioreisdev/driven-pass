import joi from "joi";
import { IWifi } from "../interfaces/wifis.interface";

const wifiSchema = joi.object<IWifi, 'userId'>({
    name: joi.string().required(),
    title: joi.string().required(),
    password: joi.string().required()
})

export default wifiSchema