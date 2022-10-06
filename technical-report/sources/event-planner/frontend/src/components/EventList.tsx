import React, { ReactElement } from "react";
import {EventListItem} from '../GraphqlTypes';

interface EventListProps {
    events: EventListItem[];
}

export function EventList({ events }: EventListProps): ReactElement {

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
                                <tr key={element.id}>
                                    <td>{element.eventType}</td>
                                    <td>{element.date.toLocaleTimeString()}</td>
                                    <td>

                                    <button className="btn btn-outline-secondary" onClick={()=>alert('clicou')}>
                                        <i className="bi bi-calendar-event"></i> Ver Escala
                                    </button>
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
