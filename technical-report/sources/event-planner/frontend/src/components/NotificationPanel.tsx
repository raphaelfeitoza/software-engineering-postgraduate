import React from "react";
import { UserError } from "../GraphqlTypes";

export interface NotificationPanelProps {
    userErrors?: UserError[],
    success?: any
}

export function NotificationPanel({ userErrors, success }: NotificationPanelProps) {

    if (success) {
        return (
            <div className="alert alert-success mt-5" role="alert">
                {success}
            </div>
        );
    }

    if (userErrors && userErrors?.length > 0) {

        return (
            <div className="alert alert-warning mt-5" role="alert">
                <ul className="list-group">
                    {userErrors?.map((element) => (
                        <li className="list-group-item" key={element.field}>{element.message}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <></>
    );
}
