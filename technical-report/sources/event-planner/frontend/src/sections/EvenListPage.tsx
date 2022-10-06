import React from "react";
import { EventList } from "../components/EventList";
import { EventListFilters } from "../components/EventListFilters";

export function EventListPage() {
    return (
        <div className="container">
            <EventListFilters></EventListFilters>
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
