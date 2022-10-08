import { useState } from "react";
import { EventTypeSelect } from "./EventTypeSelect";
import { DateToString } from '../functions'
import { UserError } from "../GraphqlTypes";
import { NotificationPanel, NotificationPanelProps } from "./NotificationPanel";

export interface CreateEventParams {
    eventType?: string,
    startDate?: Date;
    endDate?: Date;
}

interface CreateEventFormProps {
    params: CreateEventParams;
    handleCreate: (params: CreateEventParams) => void;
}


export function CreateEventForm({ params, handleCreate }: CreateEventFormProps) {

    function validateFormData(formData: CreateEventParams): UserError[] {
        var userErrors: UserError[] = [];

        if (!formData.eventType)
            userErrors.push({ field: "eventType", message: "Selecione o tipo de evento" })

        if (!formData.startDate)
            userErrors.push({ field: "startDate", message: "Data e hora de início" })

        if (!formData.endDate)
            userErrors.push({ field: "endDate", message: "Data e hora de término" })

        return userErrors;

    }

    const [formData, setFormData] = useState(params);
    const [notification, setNotification] = useState<NotificationPanelProps | undefined>(undefined);
    return (
        <>
            <div className="col text-start col-8 mt-5">
                <div className="row">
                    <div className="col col-3">
                        <label className="col-form-label">Tipo de Evento:</label>
                    </div>
                    <div className="col">
                        <EventTypeSelect handleChange={(selectedEvent) => {
                            setFormData(
                                {
                                    ...formData,
                                    eventType: selectedEvent,
                                }
                            )
                        }} />
                    </div>
                </div>
                <div className="row mt-3 mb-3">
                    <div className="col col-3">
                        <label className="col-form-label">Data e hora de início:</label>
                    </div>
                    <div className="col">
                        <div className="form-floating ">
                            <input type="datetime-local" className="form-control" id="eventStartDate"
                                value={DateToString(formData.startDate)}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        startDate: new Date(e.target.value)
                                    })
                                }}
                            />
                            <label>Data e hora de início do evento</label>
                        </div>
                    </div>
                </div>

                <div className="row mt-3 mb-3">
                    <div className="col col-3">
                        <label className="col-form-label">Data e hora de término:</label>
                    </div>
                    <div className="col">
                        <div className="form-floating">
                            <input type="datetime-local" className="form-control" id="eventEndDate" value={DateToString(formData.endDate)}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        endDate: new Date(e.target.value)
                                    })
                                }}
                            />
                            <label>Data e hora do término do evento</label>
                        </div>
                    </div>
                </div>
                <button id="createEvent" type="button" className="btn btn-primary" onClick={() => {

                    let errors = validateFormData(formData);

                    if (errors.length > 0) {
                        setNotification({ userErrors: errors });
                        return;
                    }

                    setNotification({ userErrors: undefined });
                    handleCreate(formData)
                }}>
                    Criar Evento
                </button>
            </div>

            <NotificationPanel userErrors={notification?.userErrors} success={undefined} />
        </>
    );
}
