export interface EventDefinition {
    id: string;
    name: string;
    description: string;
}

export interface EventListItem {
    id: string;
    eventType: string;
    date: Date;
}
