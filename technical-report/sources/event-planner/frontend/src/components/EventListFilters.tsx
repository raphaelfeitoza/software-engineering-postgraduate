import React from "react";
import { useQuery, gql } from '@apollo/client';
import {EventDefinition} from '../GraphqlTypes';

export function EventListFilters() {

    const GET_EVENT_DEFINITIONS = gql`
    query {
        eventDefinitions
        {
            id
            name
            description
        }
    }
`;



    function BuildEventTypeSelect() {
        const { loading, error, data } = useQuery(GET_EVENT_DEFINITIONS);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return (
            <select className="form-select" aria-label="Default select example" defaultValue="">
                <option key="">Selecione o tipo de Evento</option>
                {
                    data.eventDefinitions.map((element: EventDefinition) => (
                        <option key={element.id} value={element.id}>{element.name} - {element.description}</option>
                    ))
                }
            </select>
        )
    }

    return (
        <>
            <div className="col text-start col-8">
                <div className="row">
                    <div className="col col-3">
                        <label className="col-form-label">Tipo de Evento:</label>
                    </div>
                    <div className="col">
                        <BuildEventTypeSelect></BuildEventTypeSelect>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-3">
                        <label className="col-form-label">Periodo:</label>
                    </div>
                    <div className="col">
                        <div className="input-group">
                            <div className="form-floating">

                                <input type="datetime-local" className="form-control" id="startDate" />
                                <label>Data inicial</label>
                            </div>
                            <div className="form-floating">
                                <input type="datetime-local" className="form-control" id="finalDate" />
                                <label>Data final</label>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={() => alert('clicou!')}>Filtrar</button>
            </div>
        </>
    );
};
