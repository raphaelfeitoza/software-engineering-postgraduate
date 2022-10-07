import React, { useState } from "react";
import {EventTypeSelect} from './EventTypeSelect'
import {DateToString} from '../functions'

export interface SelectedFilters {
    eventType?: string,
    startDate: Date;
    endDate?: Date;
}

interface EventListProps {
    filters: SelectedFilters;
    handleSelected: (filters: SelectedFilters) => void;
}

export function EventListFilters({ handleSelected, filters }: EventListProps) {

    const [filter, setFilters] = useState(filters);
    return (
        <>
            <div className="col text-start col-8 mt-5">
                <div className="row">
                    <div className="col col-3">
                        <label className="col-form-label">Tipo de Evento:</label>
                    </div>
                    <div className="col">
                        <EventTypeSelect handleChange={(selectedEvent) => {
                            setFilters(
                                {
                                    ...filter,
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
                                <input type="datetime-local" className="form-control" id="startDate" value={DateToString(filter.startDate)} onChange={(e) => {
                                    setFilters({
                                        ...filter,
                                        startDate: new Date(e.target.value)

                                    })
                                }} />
                                <label>Data inicial</label>
                            </div>
                            <div className="form-floating">
                                <input type="datetime-local" className="form-control" id="endDate" value={DateToString(filter.endDate)} onChange={(e) => {
                                    setFilters({
                                        ...filter,
                                        endDate: e.target.value ? new Date(e.target.value) : undefined

                                    })
                                }} />
                                <label>Data final</label>
                            </div>
                        </div>
                    </div>
                </div>
                <button id="applyFilters" type="button" className="btn btn-primary" onClick={() => handleSelected(filter)}>Filtrar</button>
            </div>
        </>
    );
};
