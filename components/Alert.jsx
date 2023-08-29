import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { alertService } from 'services';

export { Alert };

function Alert() {
    const router = useRouter();
    const [alert, setAlert] = useState(null);

    // Le premier useEffect()hook est utilisé pour s'abonner à l'observable alertService.alert, cela permet au composant d'alerte d'être averti chaque fois qu'un message d'alerte est envoyé au service d'alerte.
    useEffect(() => {
        // subscribe to new alert notifications
        const subscription = alertService.alert.subscribe(alert => setAlert(alert));

        // unsubscribe when the component unmounts
        return () => subscription.unsubscribe();
    }, []);

    // Le composant efface automatiquement l'alerte en cas de changement d'emplacement avec le deuxième useEffect()hook qui a une dépendance sur l' routerobjet.
    useEffect(() => {
        // clear alert on location change
        alertService.clear();
    }, [router]);

    if (!alert) return null;

    return (
        <div className="container">
            <div className="m-3">
                <div className={`alert alert-dismissible ${alert.type}`}>
                    {alert.message}
                    <button type="button" className="btn-close" onClick={() => alertService.clear()}></button>
                </div>
            </div>
        </div>
    );
}
