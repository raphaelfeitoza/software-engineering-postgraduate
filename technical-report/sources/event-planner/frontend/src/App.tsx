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
    </>
  );
}


export default App;
