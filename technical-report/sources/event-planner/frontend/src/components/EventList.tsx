import { EventListData } from '../GraphqlTypes';

interface EventListProps {
    loading: boolean;
    events?: EventListData | undefined;
}

export function EventList({ loading, events }: EventListProps) {

    if (loading) {
        return (
            <div className="card mt-5 col-10">
                <div className="card-body">
                    Buscando eventos... 
                </div>
            </div>
        );
    }


    if (!events?.scheduledEvents || events.scheduledEvents?.length === 0) {
        return (
            <div className="card mt-5 col-10">
                <div className="card-body">
                    Nenhum evento encontrado com esses filtros.
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
                            <th scope="col">Data de início</th>
                            <th scope="col">Data de término</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.scheduledEvents?.map((element) => (
                                <tr key={element.id}>
                                    <td>{element.event?.name}</td>
                                    <td>{new Date(element.date).toLocaleString()}</td>
                                    <td>{new Date(element.endDate).toLocaleString()}</td>
                                    <td>

                                    <a href= {"/events/" + element.id} className="btn btn-secondary">
                                            <i className="bi bi-calendar-event"></i> Ver Escala
                                    </a>
                                        {/* <button id="scheduleEvent" className="btn btn-secondary" onClick={() => alert('clicou')}>
                                        </button> */}
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
