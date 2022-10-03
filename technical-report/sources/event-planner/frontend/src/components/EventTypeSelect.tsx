import { useQuery, gql } from '@apollo/client';
import { EventDefinition } from "../GraphqlTypes";

const GET_EVENT_DEFINITIONS = gql`
query {
    eventDefinitions
    {
        id
        name
        description
    }
}`;

interface SetValueProp {
    handleChange: (value: string) => void;
}

export function EventTypeSelect({ handleChange }: SetValueProp) {
    const { loading, error, data } = useQuery(GET_EVENT_DEFINITIONS);

    if (loading) return (
        <select className="form-select" defaultValue="">
            <option key="" value="">Selecione o tipo de Evento (Carregando...)</option>
        </select>
    );

    if (error) {
        console.log(error)
        return <p>Error :(</p>;
    }


    return (
        <select className="form-select" defaultValue="" onChange={(e) => handleChange(e.target.value)}>
            <option key="" value="">Selecione o tipo de Evento</option>
            {
                data.eventDefinitions.map((element: EventDefinition) => (
                    <option key={element.id} value={element.id}>{element.name} - {element.description}</option>
                ))
            }
        </select>
    )
}
