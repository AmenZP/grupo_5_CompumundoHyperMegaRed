const fs = require('fs');
const path = require('path');

const pathUsers = path.join(__dirname, '../data/userData.json');
const users = JSON.parse(fs.readFileSync(pathUsers, 'utf-8'));

module.exports = {

    create: (req, res) => {
        res.render('registro')
    },

    store: (req, res) => {
        let nuevoUsuario ={
            id: users[users.length - 1].id + 1,
            ...req.body
        }
        users.push(nuevoUsuario);
        fs.writeFileSync(pathUsers, JSON.stringify(users, null, ' '));
        res.redirect('/');
    },

    edit: (req, res) => {
        let id = req.params.id
        let userEdit = users.find(user => user.id == id)
        res.render('perfil',{ userEdit })
        //res.send(userEdit)
        
    },
    
    update: (req,res)=> {
        let id = req.params.id
        let userEdit = users.find(user => user.id == id)

        userEdit ={
            id: userEdit.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            pass_confirm :  req.body.pass_confirm
        }

        let newUsers = users.map(user =>{
            if(user.id == userEdit.id){
                return user = {...userEdit}
            }
            return user
        })
        fs.writeFileSync(pathUsers, JSON.stringify(newUsers, null, ' '));
        res.redirect('/')
    },

    borrarUser: (req,res)=> {
        let id = req.params.id
        let finalUsers = users.filter(usuario => usuario.id != id)
        fs.writeFileSync(pathUsers, JSON.stringify(finalUsers, null, ' '));
        res.redirect('/')
    },
};
