import React from 'react';
import { Menu } from '../components/Menu';

export function HomePage() {
  return (
    <div className="App">
      <Menu />
      <div className="col-lg-6 mx-auto px-4 py-5 my-5 text-center">
        <p className="lead mb-4">
          Bem vindo ao sistema EventPlanner.
          <br />
          <br />
          Prova de conceito criada como parte do Projeto Integrado do curso Arquitetura de Software Distribuído
          Puc Minas Virtual
        </p>

      </div>
    </div>
  );
}
