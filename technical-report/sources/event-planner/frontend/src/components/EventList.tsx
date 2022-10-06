import React, { ReactElement } from "react";
import {EventListData} from '../GraphqlTypes';

interface EventListProps {
    loading:boolean;
    events?: EventListData | undefined;
}

export function EventList({ loading, events }: EventListProps): ReactElement {

    if (!events?.scheduledEvents || events.scheduledEvents?.length === 0) {
        return (
            <div className="card">
                <div className="card-body">
                    Empty State.
                </div>
            </div>
        )
    }

    return (
        <div className="row mt-5">
            <div className='col-10'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Tipo de evento</th>
                            <th scope="col">Data</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.scheduledEvents?.map((element) => (
                                <tr key={element.id}>
                                    <td>{element.event?.name}</td>
                                    <td>{element.date.toString()}</td>
                                    <td>

                                    <button id="scheduleEvent" className="btn btn-secondary" onClick={()=>alert('clicou')}>
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
