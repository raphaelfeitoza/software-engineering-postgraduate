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
            <div className="row text-start col-8 g3">


                <div className="col-10">
                    <label className="form-label">Tipo de Evento:</label>
                    {/* <input type="text" className="form-control" id="firstName" placeholder="" value="" required=""> */}
                    <EventTypeSelect handleChange={(selectedEvent) => {
                        setFormData(
                            {
                                ...formData,
                                eventType: selectedEvent,
                            }
                        )
                    }} />
                </div>

                <div className="col-sm-6">
                    <label className="form-label">Data e hora de início: </label>
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

                <div className="col-sm-6">
                    <label className="form-label">Data e hora de término: </label>
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

                <div className="col-sm-6 mt-3">
                    <button id="createEvent" type="button" className="btn btn-primary sm" onClick={() => {

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

            </div>
            <NotificationPanel userErrors={notification?.userErrors} success={undefined} />
        </>
    );
}
