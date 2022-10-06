import React, { ReactElement } from "react";
import { JsxElement } from "typescript";

interface EventListProps {
    events: EventListItem[];
}

interface EventListItem {
    id: string;
    eventType: string;
    date: Date;
}

export function EventList({ events }: EventListProps) :ReactElement {

    if (events.length === 0) {
        return (
            <div className="card">
                <div className="card-body">
                    Empty State.
                </div>
            </div>
        )
    }

    return (
        <div className="row">
            <div className='col-6'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Tipo de evento</th>
                            <th scope="col">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.map((element) => (
                                <tr>
                                    <td>{element.eventType}</td>
                                    <td>{element.date.toLocaleTimeString()}</td>
                                    <button className="btn btn-outline-secondary">
                                        <i className="bi bi-calendar-event"></i> Ver Escala
                                    </button>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
