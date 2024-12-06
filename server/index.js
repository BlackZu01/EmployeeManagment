const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');


app.use(cors());
//app.use(express.json())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'empleados_crud'
});

// To create
app.post('/create', (req, res) => {
   const nombre = req.body.nombre; 
   const edad = req.body.edad;
   const pais = req.body.pais;
   const cargo = req.body.cargo;
   const años = req.body.años;

   db.query('INSERT INTO empleados(nombre, edad, pais, cargo, años) VALUES(?, ?, ?, ?, ?)', [nombre, edad, pais, cargo, años], 
    (err, result) => {
        if (err) {
            console.log(err);
        } 
        res.send('Empleado registrado exitosamente!');
    }
   );
})

// To get a value from db
app.get('/empleados', (req, res) => {
    db.query('SELECT * from empleados', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
        
    })  
})

// To update
app.put('/update', (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const años = req.body.años;

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, años=? WHERE id=?', [nombre, edad, pais, cargo, años, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Empleado actualizado exitosamente');
        }
    });

});


app.listen(3001, () => {
    console.log('Server running on port 3001...');
})