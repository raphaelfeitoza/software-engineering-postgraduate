import { useState } from "react";
import { EventDefinition } from "../GraphqlTypes";
import { NotificationPanel } from "./NotificationPanel";
import { UsersFunctionEventSelect } from "./UsersFunctionEventSelect";

interface ScheduleEventTeamUsersProps {
    loading: boolean,
    eventDefinition: EventDefinition | undefined;
    handleSave: (eventDefinition:EventDefinition, functionUsers:Map<string, string[]>) => void;
}

export function ScheduleEventTeamUsers({ loading, eventDefinition, handleSave }: ScheduleEventTeamUsersProps) {

    const [userEventFunctionMap, setUserEventFunctionMap] = useState(new Map<string, string[]>)

    if (loading) {
        return (
            <div className="card mt-5 col-10">
                <div className="card-body">
                    Buscando detalhes do evento...
                </div>
            </div>
        );
    }

    if (!eventDefinition) return (
        <>
            <NotificationPanel userErrors={[{ field: "eventDefinitionId", message: "Definição de evento inválida" }]} />
        </>
    )

    return <>
        {
            eventDefinition.teams?.map((team) => (
                <div className="card mt-3" >
                    <div className="card-body">
                        <h3 >{team.name}</h3>
                        {
                            team.functions?.map((func) => (
                                <>
                                    {[Array(func.quantity).keys()].map((index) => (
                                        <div className="row border-bottom">
                                            <div className="col col-3">
                                                <label className="col-form-label"> {func.name}</label>
                                            </div>
                                            <div className="col-5">
                                                <UsersFunctionEventSelect eventDefinitionId={eventDefinition.id} teamId={team.id} functionId={func.functionId}
                                                    handleChange={(value) => {
                                                        if (value) {
                                                            let arr = userEventFunctionMap.has(func.functionId) ? userEventFunctionMap.get(func.functionId) : [];
                                                            arr?.push(value);
                                                            userEventFunctionMap.set(func.functionId, arr ? arr : []);
                                                            setUserEventFunctionMap(userEventFunctionMap);
                                                        } else {
                                                            if (userEventFunctionMap.has(func.id) && userEventFunctionMap.get(func.functionId)?.includes(value)) {
                                                                const index = userEventFunctionMap.get(func.functionId)?.indexOf(value, 0);
                                                                if (index && index > -1) {
                                                                    let arr = userEventFunctionMap.get(func.functionId)?.splice(index, 1);

                                                                    userEventFunctionMap.set(func.functionId, arr ? arr : []);

                                                                    setUserEventFunctionMap(userEventFunctionMap);
                                                                }
                                                            }
                                                        }
                                                    }} />
                                            </div>
                                        </div>
                                    ))
                                    }
                                </>
                            ))
                        }
                    </div>
                </div>
            ))
        }

        <button id="createEvent" type="button" className="btn btn-primary mt-3" onClick={() => {
            handleSave(eventDefinition,userEventFunctionMap);
        }}>
            Salvar
        </button>
    </>
}
