import React from "react";
import { EventList } from "../components/EventList";

export function EventListPage() {
    return (
        <div className="container">
            <EventList events={defaultEvents} ></EventList>
        </div>
    );
}

const defaultEvents = [
    {
        id: "1",
        eventType: "Evento Completo",
        date: new Date()
    },
    {
        id: "2",
        eventType: "Evento sem banda",
        date: new Date()
    },

]
