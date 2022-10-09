import { useState } from "react";
import { useMutation, useQuery, gql, QueryResult } from '@apollo/client';
import { PageHeader } from "../components/PageHeader";
import { EventDefinition, EventListData, ScheduleTeamMemberData } from "../GraphqlTypes";
import { NotificationPanel, NotificationPanelProps } from "../components/NotificationPanel";
import { EventDetail } from "../components/EventDetail";
import { ScheduleEventTeamUsers } from "../components/ScheduleEventTeamUsers";


const SCHEDULE_USERS = gql`
mutation scheduleTeamMember($eventId:ID!, $userFunctions: [UserFunctionInput!]!)
{
    scheduleTeamMember(input: {
        eventId: $eventId,
         userFunctions: $userFunctions})
    {
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
    const [mutateFunction, { data, loading, error }] = useMutation(SCHEDULE_USERS);
    const [notification, setNotification] = useState<NotificationPanelProps | undefined>(undefined);

    function handleSave(eventDefinition: EventDefinition, functionUsers: Map<string, string[]>) {
        console.log("user id, functionId list");
        console.log(functionUsers);

        const userIdFunctionList: any[] = [];
        functionUsers.forEach((userIds: string[], functionId: string) => {
            console.log(functionId, userIds);
            userIds.forEach((value: string) => {
                userIdFunctionList.push({ userId: value, functionId: functionId });
            })
        });

        mutateFunction({ variables: { eventId: eventId, userFunctions: userIdFunctionList } }).then(
            function (value) {
                let scheduleResult: ScheduleTeamMemberData = value.data.scheduleTeamMember as ScheduleTeamMemberData;
                setNotification(
                    {
                        userErrors: scheduleResult.userErrors,
                        success: (scheduleResult.userErrors.length === 0 ? <>
                            Escalaçāo salva com sucesso!
                        </> : undefined)
                    }
                )
            },
            function (error) { console.log(error); }
        );
    }

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
                handleSave={handleSave}
            />
            <NotificationPanel userErrors={notification?.userErrors} success={notification?.success} />
        </div>
    );
}
