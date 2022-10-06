import React from "react";

export function EventListFilters() {

    return (
        <>
            <div className="col text-start col-8">
                <div className="row">
                    <div className="col">
                        <label className="col-form-label">Tipo de Evento:</label>
                    </div>
                    <div className="col">
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Selecione o tipo de Evento</option>
                            <option value="1">Evento Completo</option>
                            <option value="2">Evento sem midia</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label className="col-form-label">Periodo:</label>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input type="datetime-local" className="form-control" id="startDate" />
                            <label>Data inicial</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="datetime-local" className="form-control" id="finalDate" />
                            <label>Data final</label>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary">Filtrar</button>
            </div>
        </>
    );
};
