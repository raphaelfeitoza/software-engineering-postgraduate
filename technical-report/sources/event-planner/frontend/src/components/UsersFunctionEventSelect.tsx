
import { useQuery, gql } from '@apollo/client';
import { EventDefinition, TeamUserFunction, User, UserByEventDefinitionData } from "../GraphqlTypes";

const FETCH_USERS_EVENT_DEFINITION = gql`
query ($eventDefinitionId: ID!, $teamId: ID!, $functionId:ID!) {
  usersByEventDefinition(
    eventDefinitionId: $eventDefinitionId
    teamId: $teamId, 
    functionId: $functionId
  ) {
    user {
      id
      firstName
      lastName
    }
  }
}`;

interface SetValueProp {
    eventDefinitionId: string,
    teamId: string,
    functionId: string,
    handleChange: (value: string) => void;
}

export function UsersFunctionEventSelect({ eventDefinitionId, teamId, functionId, handleChange }: SetValueProp) {
    const { loading, error, data } = useQuery<UserByEventDefinitionData>(FETCH_USERS_EVENT_DEFINITION,
        {
            variables: {
                eventDefinitionId: eventDefinitionId,
                teamId: teamId, 
                functionId: functionId
            }
        });

    if (loading) return (
        <select className="form-select" defaultValue="">
            <option key="" value="">Selecione o membro da equipe (Carregando...)</option>
        </select>
    );

    if (error) {
        console.log(error)
        return <p>Error :(</p>;
    }


    return (
        <select className="form-select" defaultValue="" onChange={(e) => handleChange(e.target.value)}>
            <option key="" value="">Selecione o membro da equipe </option>
            {
                data?.usersByEventDefinition.map((element: TeamUserFunction) => (
                    <option key={element.user.id} value={element.user.id}>{element.user.firstName} - {element.user.lastName}</option>
                ))
            }
        </select>
    )
}
