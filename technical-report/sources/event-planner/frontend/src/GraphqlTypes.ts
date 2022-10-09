export interface UserError {
    field: string,
    message: string,
}
export interface EventDefinition {
    id: string;
    name: string;
    description: string;
    teams?: Team[]
}

export interface EventDefinitionData{
    eventDefinition?: EventDefinition
}

export interface EventListItem {
    id: string;
    eventType?: string;
    date: Date;
    endDate: Date;
    event: EventDefinition;
}

export interface EventListData {
    scheduledEvents?: EventListItem[]
}

export interface CreateEventData {
    eventId: string,
    eventDefinition: EventDefinition,
    userErrors: UserError[]
}

export interface Team {
    id: string,
    name: string,
    functions?: EventFunction[]
}

export interface EventFunction {
    id: string,
    functionId:string,
    name: string,
    quantity: number
}

export interface UserByEventDefinitionData{
    usersByEventDefinition:TeamUserFunction[]
}

export interface TeamUserFunction{
    user:User
}

export interface User{
    id:string, 
    firstName:string, 
    lastName:string
}
