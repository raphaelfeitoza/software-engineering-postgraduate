import React, { Component, ReactElement, useState } from "react";
import { useMutation, gql } from '@apollo/client';
import { PageHeader } from "../components/PageHeader";
import { CreateEventForm, CreateEventParams } from "../components/CreateEvent";
import { CreateEventData, UserError } from "../GraphqlTypes";

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

export function CreateEventPage() {
    const initialState: CreateEventParams = {
        eventType: undefined,
        startDate: new Date(new Date().toISOString().slice(0, 10))
    };
    const [formData, setFormData] = useState(initialState);
    const [mutateFunction, { data, loading, error }] = useMutation(SCHEDULE_EVENT);


    const [notification, setNotification] = useState<NotificationPanelProps | undefined>(undefined);


    function handleCreate(params: CreateEventParams) {
        setFormData(params);

        mutateFunction({ variables: { ...params } }).then(
            function (value) {
                let eventData: CreateEventData = value.data.createEvent as CreateEventData;
                setNotification(
                    {
                        userErrors: eventData.userErrors,
                        success: eventData.eventId? (<>
                            Evento criado com sucesso! <a href={"/schedule_event?eventId=" + eventData?.eventId}> Criar escalação</a>
                        </>) : undefined
                    }
                )
            },
            function (error) { console.log(error); }
        );
    }

    return (
        <div className="container">
            <PageHeader header="Criar Evento" />
            <CreateEventForm params={initialState} handleCreate={handleCreate} />
            <NotificationPanel userErrors={notification?.userErrors} success={notification?.success} />
        </div>
    );
}

export function NotificationPanel({ userErrors, success }: NotificationPanelProps) {

    if (success) {
        return (
            <div className="alert alert-success mt-5" role="alert">
                {success}
            </div>
        )
    }

    if (userErrors && userErrors?.length > 0) {

        return (
            <div className="alert alert-warning mt-5" role="alert">
                <ul className="list-group">
                    {
                        userErrors?.map((element) => (
                            <li className="list-group-item" key={element.field}>{element.message}</li>
                        ))
                    }
                </ul>
            </div>
        )
    }

    return (
        <></>
    )
}

interface NotificationPanelProps {
    userErrors?: UserError[],
    success?: any
}
