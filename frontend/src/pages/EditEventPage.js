import { useRouteLoaderData } from "react-router-dom";

import EventForm from "../components/EventForm";

export default function EditEventPage() {
  const data = useRouteLoaderData("event-detail"); // оскільки ми використовуємо loader з батьківського елемента, то замість хука useLoaderData використовуємо хук useRouteLoaderData
  return <EventForm event={data.event} method="patch" />;
}
