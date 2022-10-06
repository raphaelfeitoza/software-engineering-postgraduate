import React, {useState} from "react";
import { EventList } from "../components/EventList";
import { EventListFilters, SelectedFilters } from "../components/EventListFilters";
import { useQuery, gql } from '@apollo/client';
import { EventListData } from "../GraphqlTypes";

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
        startDate: new Date()
    };
    const [filters, setFilters] = useState(initialState);
    const { loading, error, data } = useQuery<EventListData>(GET_EVENTS, {variables: {...filters}});
    
    function handleSelected(filters: SelectedFilters) {
        console.log(filters);
        setFilters(filters);
    }

    return (
        <div className="container">
            <EventListFilters handleSelected={handleSelected}></EventListFilters>
            <EventList loading={loading} events={data} ></EventList>
        </div>
    );
}
