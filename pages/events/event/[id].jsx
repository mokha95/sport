import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout, ViewEvent } from "components/events";
import { Spinner } from "components";
import { eventService, alertService } from "services";

export default Event;

function Event() {
  const router = useRouter();
  const [event, setEvent] = useState(null);

  // recupere l id dans le query du chemin
  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    // fetch article and set default form values if in edit mode
    eventService
      .getById(id)
      .then((x) => setEvent(x))
      .catch(alertService.error);
  }, [router]);
  return (
    <Layout>

      {/* remplacer le addeditevent et creer un composant l'article en plein pages */}
      {event ? <ViewEvent event={event} /> : <Spinner />}
    </Layout>
  );
}