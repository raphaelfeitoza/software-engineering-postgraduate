import React from 'react';
import logo from './logo.svg';
import './App.css';
import { EventListPage } from './sections/EvenListPage';

function App() {
  return (

    <div className="App">
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
              <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
            </ul>


            <div className="text-end">
              <button type="button" className="btn btn-outline-light me-2">Login</button>
              <button type="button" className="btn btn-warning">Sign-up</button>
            </div>
          </div>
        </div>
      </header>

      <div className="container text-center">
        <div className="row">
          <div className="col">
          </div>
          <div className="col-10 mt-5">
            <EventListPage></EventListPage>
          </div>
          <div className="col">
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

interface ResponderEscalacaoFunc {
  (eventId: string, aceita: boolean): void;
}

interface ResponderEscalacaoProps {
  eventoId: string;
  tipoEvento: string;
  data: Date;
  onAceitar?: ResponderEscalacaoFunc;
  onRecusar?: ResponderEscalacaoFunc;
}

function ResponderEscalacao({ eventoId, tipoEvento, data }: ResponderEscalacaoProps) {

  return (
    <form className="container-md px-4">
      <div className="mb-3 row">
        <label className="col-form-label">Você foi escalado para trabalhar!</label>
      </div>
      <div className="mb-3 row">
        <label htmlFor="tipoEventoLabel" className="col-sm-2 col-form-label">Evento:</label>
        <div className="col-sm-10">
          <input type="text" readOnly className="form-control-plaintext" id="staticTipoEvento" value={tipoEvento} />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="eventoDataLabel" className="col-sm-2 col-form-label">Data</label>
        <div className="col-sm-10">
          <input type="text" readOnly className="form-control-plaintext" id="inputPassword" value={data.toLocaleDateString()} />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Funçāo:</label>
        <div className="col-sm-10">
          <input type="text" readOnly className="form-control-plaintext" value={data.toLocaleDateString()} />
        </div>
      </div>
      <div className="d-grid gap-2 d-sm-flex">
        <button type="button" className="btn btn-success btn-lg px-4 gap-3">Aceitar</button>
        <button type="button" className="btn btn-danger btn-lg px-4 gap-3">Recusar</button>
      </div>

    </form>
  );
}



// -------------------

function FazerEscalaForm() {
  return (
    <>
      <div className="row">
        <div className="col">
          <label className="col-form-label">Tipo de Evento:</label>
        </div>
        <div className="col">
          <select className="form-select" aria-label="Default select example">
            <option selected>Selecione o tipo de Evento</option>
            <option value="1">Evento Completo</option>
            <option value="2">Evento sem midia</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label className="col-form-label">Data:</label>
        </div>
        <div className="col">
          <select className="form-select" aria-label="Default select example">
            <option selected>Selecione o data do evento</option>
            <option value="1"></option>
            <option value="2">Evento sem midia</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col">

        </div>
        <div className="col">

        </div>
      </div>
    </>
  );
}
