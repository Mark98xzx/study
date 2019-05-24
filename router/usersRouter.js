//处理所有相关用户的信息路由
const express = require('express');
const usersContr = require('../controller/usersContr.js');

const router = express.Router();

//得到静态页面
router.get('/users', (req, res) => {
    usersContr.getUsers(req,res);
});

//添加用户的路由
router.post('/addUser', (req,res) => {
    usersContr.addUser(req,res);
});

//添加获取所有用户的信息
router.get('/getAllUsers', (req,res) => {
    usersContr.getAllUsers(req,res);
});

//添加一个删除路由
router.get('/delUser', (req,res) => {
    usersContr.delUser(req,res);
});

//添加一个根据 id 得到用户信息的路由
router.get('/getUserById',(req,res) => {
    usersContr.getUserById(req,res);
});

//添加一个修改用户的路由
router.post('/updateUser', (req,res) => {
    usersContr.updateUser(req,res);
});

//添加一个 批量删除 的路由
router.post('/delUsersByIds', (req, res) => {
    usersContr.delUsersByIds(req, res);
});

//暴露接口
module.exports = router;