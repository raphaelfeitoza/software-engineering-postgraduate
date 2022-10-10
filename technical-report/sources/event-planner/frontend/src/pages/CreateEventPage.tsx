import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import { PageHeader } from "../components/PageTitle";
import { CreateEventForm, CreateEventParams } from "../components/CreateEvent";
import { CreateEventData, UserError } from "../GraphqlTypes";
import { NotificationPanel, NotificationPanelProps } from "../components/NotificationPanel";
import { Menu } from "../components/Menu";

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
                        success: eventData.eventId ? (<>
                            Evento criado com sucesso! <a href={"/schedule_event?eventId=" + eventData?.eventId}> Criar escalação</a>
                        </>) : undefined
                    }
                )
            },
            function (error) { console.log(error); }
        );
    }

    return (
        <div className="App">
            <Menu />
            <div className="container">
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col-10 mt-5">
                        <PageHeader header="Criar Evento" />
                        <CreateEventForm params={initialState} handleCreate={handleCreate} />
                        <NotificationPanel userErrors={notification?.userErrors} success={notification?.success} />
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>
        </div>
    );
}
