import React, {useState} from "react";
import { EventList } from "../components/EventList";
import { EventListFilters, SelectedFilters } from "../components/EventListFilters";
import { useQuery, gql } from '@apollo/client';
import { EventListData } from "../GraphqlTypes";
import { PageHeader } from "../components/PageHeader";


const GET_EVENTS = gql`
query scheduledEvents($eventType: ID, $startDate:ISO8601DateTime, $endDate:ISO8601DateTime, $userId:ID){
    scheduledEvents(
        eventType: $eventType,
        startDate: $startDate,
        endDate: $endDate,
        userId: $userId)
    {
        id
        date
        endDate
        event
        {
          name
        }
    }
}`;


export function EventListPage() {
    const initialState: SelectedFilters = {
        eventType: undefined,
        startDate: new Date(new Date().toISOString().slice(0, 10))
    };
    const [filters, setFilters] = useState(initialState);
    const { loading, error, data } = useQuery<EventListData>(GET_EVENTS, {variables: {...filters}});
    
    function handleSelected(filters: SelectedFilters) {
        setFilters(filters);
    }

    return (
        <div className="container">
            <PageHeader header="Eventos Planejados" ></PageHeader>
            <EventListFilters filters={filters} handleSelected={handleSelected}></EventListFilters>
            <EventList loading={loading} events={data} ></EventList>
        </div>
    );
}
