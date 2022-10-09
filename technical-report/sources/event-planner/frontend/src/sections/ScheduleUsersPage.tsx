import React, { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQuery, gql, QueryResult } from '@apollo/client';
import { PageHeader } from "../components/PageHeader";
import { CreateEventForm, CreateEventParams } from "../components/CreateEvent";
import { CreateEventData, EventDefinition, EventDefinitionData, EventFunction, EventListData, EventListItem, UserError } from "../GraphqlTypes";
import { NotificationPanel, NotificationPanelProps } from "../components/NotificationPanel";
import { EventDetail } from "../components/EventDetail";
import { UsersFunctionEventSelect } from "../components/UsersFunctionEventSelect";

const SCHEDULE_EVENT = gql`
mutation create_event($eventType: ID!, $startDate:ISO8601DateTime!, $endDate:ISO8601DateTime!){
    createEvent( input: {
        eventDefinitionId: $eventType,
        startDate: $startDate,
        endDate: $endDate
    })
    {
        eventId
        eventDefinition
        {
            id
            name
        }
        userErrors
        {
            field
            message
        }
    }
}`;

const FETCH_EVENT_BY_ID = gql`
query scheduledEvents($id:ID){
    scheduledEvents(
        id: $id)
    {
        id
        date
        endDate
        event{
            id
            name
            description
            teams
            {
                id
                name
                functions
                {
                    id
                    name
                    quantity
                    functionId
                }
            }
        }
    }
}`;

interface ScheduleUsersProps {
    eventId: string,
}

export function ScheduleUsersPage({ eventId }: ScheduleUsersProps) {
    const eventListQuery = useQuery<EventListData>(FETCH_EVENT_BY_ID, { variables: { id: eventId } });
    return (
        <div className="container">
            <PageHeader header="Criar Escalação" />
            <EventDetail loading={eventListQuery.loading}
                scheduledEvent={(eventListQuery?.data?.scheduledEvents && eventListQuery?.data?.scheduledEvents?.length > 0) ?
                    eventListQuery.data?.scheduledEvents[0] : undefined
                } />
            <ScheduleEventTeamUsers loading={eventListQuery.loading}
                eventDefinition={(eventListQuery?.data?.scheduledEvents && eventListQuery?.data?.scheduledEvents?.length > 0) ?
                    eventListQuery.data?.scheduledEvents[0].event : undefined}
            />
        </div>
    );
}

interface ScheduleEventTeamUsersProps {
    loading: boolean,
    eventDefinition: EventDefinition | undefined;
}

export function ScheduleEventTeamUsers({ loading, eventDefinition }: ScheduleEventTeamUsersProps) {

    if (loading) {
        return (
            <div className="card mt-5 col-10">
                <div className="card-body">
                    Buscando detalhes do evento...
                </div>
            </div>
        );
    }

    if (!eventDefinition) return (
        <>
            <NotificationPanel userErrors={[{ field: "eventDefinitionId", message: "Definição de evento inválida" }]} />
        </>
    )

    return <>
        {
            eventDefinition.teams?.map((team) => (
                <div className="card mt-3" >
                    <div className="card-body">
                        <h3 >{team.name}</h3>
                        {
                            team.functions?.map((func) => (
                                <>
                                    {[Array(func.quantity).keys()].map((index) => (
                                        <div className="row border-bottom">
                                            <div className="col col-3">
                                                <label className="col-form-label"> {func.name}</label>
                                            </div>
                                            <div className="col">
                                                <UsersFunctionEventSelect eventDefinitionId={eventDefinition.id} teamId={team.id} functionId={func.functionId}
                                                handleChange={(value)=>console.log('selected value' + value)} />
                                            </div>
                                        </div>
                                    ))
                                    }
                                </>
                            ))
                        }
                    </div>
                </div>
            ))
        }

        <button id="createEvent" type="button" className="btn btn-primary mt-3" onClick={() => {
            alert('salva escalacao')
            // let errors = validateFormData(formData);

            // if (errors.length > 0) {
            //     setNotification({ userErrors: errors });
            //     return;
            // }

            // setNotification({ userErrors: undefined });
            // handleCreate(formData)
        }}>
            Salvar
        </button>
    </>
}




