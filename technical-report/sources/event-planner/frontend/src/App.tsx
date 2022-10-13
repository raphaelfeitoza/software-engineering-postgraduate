import './App.css';
import { ScheduleUsersPage } from './pages/ScheduleUsersPage';
import { Routes, Route } from "react-router-dom";
import { EventListPage } from './pages/EvenListPage';
import { HomePage } from './pages/HomePage';
import { CreateEventPage } from './pages/CreateEventPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="events/:eventId" element={<ScheduleUsersPage />} />
        <Route path="events" element={<EventListPage />} />
        <Route path="new-event" element={<CreateEventPage />} />
      </Routes>
      <div className="col-lg-6 mx-auto px-4 py-5 my-5 text-center">
        <p className="lead mb-4">
          Bem vindo ao sistema EventPlanner.

          <br/>
          <br/>
          Prova de conceito criada como parte do Projeto Integrado do curso Arquitetura de Software Distribuído
          Puc Minas Virtual
        </p>

      </div>
    </>
  );
}


export default App;
