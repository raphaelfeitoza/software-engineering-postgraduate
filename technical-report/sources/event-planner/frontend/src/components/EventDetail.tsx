import { useEffect } from 'react';
import { EventListItem } from '../GraphqlTypes';
import { NotificationPanel } from './NotificationPanel';

interface EventDetailProps {
    loading: boolean;
    scheduledEvent?: EventListItem | undefined;
}

export function EventDetail({ loading, scheduledEvent }: EventDetailProps) {
    if (loading) {
        return (
            <div className="card mt-5 col-10">
                <div className="card-body">
                    Buscando eventos...
                </div>
            </div>
        );
    }

    if (!scheduledEvent) return (
        <>
            <NotificationPanel userErrors={[{ field: "eventId", message: "Evento inválido" }]} />
        </>
    )

    return (
        <>
            <div className="col text-start col-8 mt-5">
                <div className="row">
                    <div className="col col-3">
                        <label className="col-form-label">Tipo de Evento:</label>
                    </div>
                    <div className="col">
                        <input type="text" readOnly={true} className="form-control-plaintext"
                            id="staticEventType" value={scheduledEvent?.event?.name} />
                    </div>
                </div>
                <div className="row mt-3 mb-3">
                    <div className="col col-3">
                        <label className="col-form-label">Data e hora:</label>
                    </div>
                    <div className="col form-inline">
                        <div className="input-group">
                            <input type="text" readOnly={true} className="form-control-plaintext w-50"
                                id="staticEventType" value={new Date(scheduledEvent?.date).toLocaleString()} />
                            <input type="text" readOnly={true} className="form-control-plaintext w-50"
                                id="staticEventType" value={new Date(scheduledEvent?.endDate).toLocaleString()} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
