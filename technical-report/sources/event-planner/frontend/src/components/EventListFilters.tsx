import React, { useState } from "react";
import { useQuery, gql } from '@apollo/client';
import { EventDefinition } from '../GraphqlTypes';
import Moment from 'moment-mini'
const GET_EVENT_DEFINITIONS = gql`
query {
    eventDefinitions
    {
        id
        name
        description
    }
}`;

export interface SelectedFilters {
    eventType?: string,
    startDate: Date;
    endDate?: Date;

}

interface EventListProps {
    handleSelected: (filters: SelectedFilters) => void;
}

interface SetValueProp {
    handleChange: (value: string) => void;
}

function BuildEventTypeSelect({ handleChange }: SetValueProp) {
    const { loading, error, data } = useQuery(GET_EVENT_DEFINITIONS);

    if (loading) return (
        <select className="form-select" defaultValue="">
            <option key="" value="">Selecione o tipo de Evento (Carregando...)</option>
        </select>
    );

    if (error) {
        console.log(error)
        return <p>Error :(</p>;
    }


    return (
        <select className="form-select" defaultValue="" onChange={(e) => handleChange(e.target.value)}>
            <option key="" value="">Selecione o tipo de Evento</option>
            {
                data.eventDefinitions.map((element: EventDefinition) => (
                    <option key={element.id} value={element.id}>{element.name} - {element.description}</option>
                ))
            }
        </select>
    )
}

function DateToString(date?: Date) {
    if (!date) return "";
    return date.getUTCFullYear() + "-" +
        ("0" + (date.getUTCMonth() + 1)).slice(-2) + "-" +
        ("0" + date.getUTCDate()).slice(-2) + "T" +
        ("0" + date.getUTCHours()).slice(-2) + ":" +
        ("0" + date.getUTCMinutes()).slice(-2) + ":" +
        ("0" + date.getUTCSeconds()).slice(-2);
}


export function EventListFilters({ handleSelected }: EventListProps) {

    const initialState: SelectedFilters = {
        eventType: "",
        startDate: new Date()
    };
    const [filters, setFilters] = useState(initialState);
    return (
        <>
            <div className="col text-start col-8">
                <div className="row">
                    <div className="col col-3">
                        <label className="col-form-label">Tipo de Evento:</label>
                    </div>
                    <div className="col">
                        <BuildEventTypeSelect handleChange={(selectedEvent) => {
                            setFilters(
                                {
                                    ...filters,
                                    eventType: selectedEvent,
                                }
                            )
                        }} />
                    </div>
                </div>
                <div className="row mt-3 mb-3">
                    <div className="col col-3">
                        <label className="col-form-label">Periodo:</label>
                    </div>
                    <div className="col">
                        <div className="input-group input-group-sm">
                            <div className="form-floating ">
                                <input type="datetime-local" className="form-control" id="startDate" value={DateToString(filters.startDate)} onChange={(e) => {
                                    setFilters({
                                        ...filters,
                                        startDate: new Date(e.target.value)

                                    })
                                }} />
                                <label>Data inicial</label>
                            </div>
                            <div className="form-floating">
                                <input type="datetime-local" className="form-control" id="endDate" value={DateToString(filters.endDate)} onChange={(e) => {
                                    setFilters({
                                        ...filters,
                                        endDate: e.target.value ? new Date(e.target.value) : undefined

                                    })
                                }} />
                                <label>Data final</label>
                            </div>
                        </div>
                    </div>
                </div>
                <button id="applyFilters" type="button" className="btn btn-primary" onClick={() => handleSelected(filters)}>Filtrar</button>
            </div>
        </>
    );
};
