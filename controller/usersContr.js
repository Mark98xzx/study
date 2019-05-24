//引入 userdb.js
const userdb = require('../modul/userdb.js');

//处理所有与  用户 相关的逻辑
module.exports = {
    getUsers : (req,res) => {
        //将所有的用户信息读取出来
        userdb.query('SELECT * FROM users',res1 =>{
             //渲染页面,渲染数据
        res.render('users', {result: res1});
        });
    },
    //添加用户数据
    addUser : (req,res) => {
        //1.0 接收用户参数
        var params = req.body;
        //req.body
        //2.0 将数据 提交到数据库
        let addSql = `INSERT INTO users (slug, email, password, nickname, status) VALUES ('${params.slug}','${params.email}','${params.password}','${params.nickname}','activated')`
        //3.0 执行 sql 语句
        userdb.query(addSql, result => {
            res.send({
                status:200,
                msg:'新增用户成功',
            });
        });
    },
    //动态获取所有用户信息
    getAllUsers: (req,res) => {
        //1.0 去数据库中得到所有数据
        let selSql = `SELECT * FROM users`;
        //2.0 将结果响应会浏览器
        userdb.query(selSql,result => {
            res.send({
                data: result,
                status: 200,
                msg: '数据获取成功',
            });
        });
    },
    
    //根据用户 id 删除用户
    delUser: (req,res) => {
        //接收 id
        let id = req.query.id;
        //执行 sql 语句
        let delSql = `DELETE FROM users WHERE id = ${id}`;
        userdb.query(delSql, result => {
            res.send({
                status:200,
                msg: '删除成功',
            });
        });
    },

    //根据用户 id 得到用户对象
    getUserById: (req, res) => {
        //1.0 接收 id
        let id = req.query.id;
        //2.0 根据 id 查询数据
        let selSql = `SELECT * FROM users WHERE id = ${id}`;
        userdb.query(selSql, result => {
            // console.log(result[0]);
            res.send({
                status: 200,
                msg: '查询成功',
                data: result[0],
            });
        });
    },

    //修改用户
    updateUser: (req,res) => {
        //获取参数
        var params = req.body;
        console.log(params);
        //修改数据到 mysql
        let updateSql = `UPDATE users SET email='${params.email}', nickname='${params.nickname}', password='${params.password}' WHERE id=${params.id} `;
        userdb.query(updateSql, result => {
            res.send({
                status: 200,
                msg: '修改成功',
            });
        });
    },

    //批量删除
    delUsersByIds: (req,res) => {
        //获取 参数 id
        let ids = req.body.id;
        //将数组转为字符串, 用逗号隔开
        var idStr = ids.join(',');
        //执行 sql 语句
        let delSql = `DELETE FROM users WHERE id in (${idStr})`;
        userdb.query(delSql, result => {
            res.send({
                status: 200,
                msg: '删除成功',
            });
        });
    },
};

   
