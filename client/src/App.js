import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState('');
  const [cargo, setCargo] = useState('');
  const [años, setAños] = useState(0);
  const [empleadosList, setEmpleados] = useState([]);
  const [showData, setShowData] = useState(false);

  const add = () => {
    Axios.post('http://localhost:3001/create', {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      años: años
    }).then(() => {
      getEmpleados();
    });
  }

  const getEmpleados = () => {
    Axios.get('http://localhost:3001/empleados').then((response) => {
      setEmpleados(response.data);
      setShowData(true);
    }).catch(error => console.log(JSON.stringify(error)));
  }

  const updateEmpleados = () => {
    Axios.put('http://localhost:3001/update').then((response) => {
      
    });
  }

  const hideEmpleados = () => {
    setShowData(false);
  }


  return (
    <div className="container">
    <div className="card text-center">
      <div className="card-header">
      EMPLOYEE MANAGMENT
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"> Nombre: </span>
          <input type="text" 
          onChange={(event) => {
            setNombre(event.target.value);
          }}
          className="form-control" placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"> Edad: </span>
          <input type="number" 
          onChange={(event) => {
            setEdad(event.target.value);
          }}
          className="form-control" placeholder="Ingrese la edad" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"> País: </span>
          <input type="text" 
          onChange={(event) => {
            setPais(event.target.value);
          }}
          className="form-control" placeholder="Ingrese el nombre del pais" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"> Cargo: </span>
          <input type="text" 
          onChange={(event) => {
            setCargo(event.target.value);
          }}
          className="form-control" placeholder="Ingrese el cargo" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"> Años de experiencia: </span>
          <input type="text" 
          onChange={(event) => {
            setAños(event.target.value);
          }}
          className="form-control" placeholder="Ingrese los años de experiencia" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
      </div>
      <div className="card-footer text-muted" id="botones">
        <button className="btn btn-success" onClick={(event) => add()}> Register </button>
        <button className="btn btn-info" onClick={getEmpleados}>Show employees</button>
        <button className="btn btn-primary" onClick={hideEmpleados}>Hide employees</button>
      </div>
    </div>

    <table className="table table-striped" id="tablita">
      <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Edad</th>
        <th scope="col">País</th>
        <th scope="col">Cargo</th>
        <th scope="col">Años de experiencia</th>
      </tr>
      
      {
          showData && (empleadosList.map((value, key) => {
            return <tr key={key}>
                    <th scope="row">{value.id}</th>
                    <td>{value.nombre}</td>
                    <td>{value.edad}</td>
                    <td>{value.pais}</td>
                    <td>{value.cargo}</td>
                    <td>{value.años}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-info">Edit</button>
                        <button type="button" className="btn btndanger">Delete</button>
                      </div>
                    </td>
                  </tr>

          }))
        }
    </thead>
    <tbody>
      
    </tbody>
      </table>  
    </div>
  );
}

export default App;
