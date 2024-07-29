import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

// Тут ми показуємо варіант відкладення завантаження даних
// Буде завантажуватись компонент сторінки і рендеритись до того, як отримаються дані з бекенду
// і поки іде завантаження даних на сторінці буде показано запасний варіант, який прописаний в <Suspense fallback>

export default function EventsPage() {
  const { events } = useLoaderData(); //витягуємо дані з eventsLoader
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    return json(
      { message: "Could not fetch events" },
      {
        status: 500,
      }
    );
  } else {
    // return response;
    const resData = await response.json(); // вручну розписуємо response, оскільки ми працюємо з відкладеними даними
    return resData.events;
  }
}

//Це відкладені дані. Рендеримо компонент, навіть якщо цього майбутнього значення ще немає, ми відкладаємо Promise.
export function loader() {
  return defer({
    events: loadEvents(),
  });
}
