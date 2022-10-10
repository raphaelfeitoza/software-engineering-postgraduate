import React from 'react';
import { Link } from "react-router-dom";


export function Menu() {
  return (
    <>
      <nav>
        <header className="p-3 text-bg-dark">
          <div className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <div className="navbar-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-calendar-week" viewBox="0 0 16 16">
                  <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"></path>
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"></path>
                </svg>
                <span className='ms-3'>Event Planner</span>
              </div>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                  <li className="nav-item">
                    <a className="nav-link" href="/">Início</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle show"
                     href="/events" data-bs-toggle="dropdown">Eventos</a>
                    <ul className="dropdown-menu" data-bs-popper="static">
                      <li><a className="dropdown-item" href="/events">Eventos Planejados</a></li>
                      <li><a className="dropdown-item" href="/new-event">Novo evento</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </nav>
    </>
  );
}



