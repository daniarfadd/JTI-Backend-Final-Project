import Monitoring from "../models/MonitoringModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getMonitoring = async (req, res) =>{
  try {
    let response;
    response = await Monitoring.findAll({
        where:{
            userId: req.userId
        },
        include:[{
            model: User
        }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}

export const updateParam = async(req, res) =>{
    try {
        const monitor = await Monitoring.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!monitor) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {param1,param2,param3} = req.body;
        if(req.userId !== monitor.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Monitoring.update({param1,param2,param3},{
                where:{
                    [Op.and]:[{id: monitor.id}, {userId: req.userId}]
                }
            });
        res.status(200).json({msg: "Parameter Berhasil diupdate"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getMonitorById = async(req, res) =>{
    try {
        const monitor = await Monitoring.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!monitor) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        response = await Monitoring.findOne({
            attributes:['uuid','param1','param2', 'param3'],
            where:{
                [Op.and]:[{id: monitor.id}, {userId: req.userId}]
            },
            include:[{
                model: User
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createParam = async(req, res) =>{
    const {param1,param2,param3} = req.body;
    try {
        await Monitoring.create({
            param1: param1,
            param2: param2,
            param3: param3,
            userId: req.userId
        });
        res.status(201).json({msg: "Parameter Berhasil dibuat"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}