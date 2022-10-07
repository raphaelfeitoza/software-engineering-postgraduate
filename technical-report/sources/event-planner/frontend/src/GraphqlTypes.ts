export interface EventDefinition {
    id: string;
    name: string;
    description: string;
}

export interface EventListItem {
    id: string;
    eventType?: string;
    date: Date;
    event?: EventDefinition;
}


export interface EventListData{
    scheduledEvents?: EventListItem[]
}


export interface CreateEventData{
    eventId: string, 
    eventDefinition: EventDefinition,
    userErrors: UserError[]
}

export interface UserError{
    field:string, 
    message:string,
}
