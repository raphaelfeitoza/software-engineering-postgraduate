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
            <div className="row text-start col-8 g3">
                <div className="col-12">
                    <label className="form-label">Tipo de Evento:</label>
                    <input type="text" readOnly={true} className="form-control-plaintext ps-4 text-lighter"
                        id="staticEventType" value={scheduledEvent?.event?.name} />
                </div>
                <div className="col-5">
                    <label className="form-label">Data e hora:</label>
                    <input type="text" readOnly={true} className="form-control-plaintext ps-4"
                        id="staticEventType" value={new Date(scheduledEvent?.date).toLocaleString()} />
                </div>
                <div className="col-4">
                    <label className="form-label"><span>&nbsp;</span></label>
                    <input type="text" readOnly={true} className="form-control-plaintext w-30"
                        id="staticEventType" value={new Date(scheduledEvent?.endDate).toLocaleString()} />
                </div>
            </div>
        </>
    );
};
