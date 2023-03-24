# [React Router v6 - Lernnotizen](https://reactrouter.com/en/main)

## Nested Routes

- [Outlet](https://reactrouter.com/en/main/components/outlet)
  - Wenn wir bestimmte Komponenten auf mehreren Seiten anzeigen, aber den Inhalt erweitern wollen.
  - ähnlicher Ansatz wie react `{children}`.
  - Ein Outlet ist ein spezielles Element(eine art Platzhalter), das definiert, wo der Inhalt gerendert wird, der von einer Route übereinstimmt.

```jsx
// Anwendungsbeispiel
// in der App()
<BrowserRouter>
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/vans" element={<VansList />} />
      <Route path="/vans" element={<VansList />} />
      <Route path="vans/:id" element={<VanDetail />} />
    </Route>
  </Routes>
</BrowserRouter>
```

```jsx
// in der Layout.jsx
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
```

Beispiel: auf dem Pfad "/" App wird Navbar-Komponente und Home-Komponente angezeigt.

- Outlet Context

  - Oft verwalten übergeordnete Routen den State oder andere Werte, die man mit untergeordneten Routen teilen kann. Hierzu kann man mit React einen [context provider](https://react.dev/reference/react/createContext) erstellen oder man greift auf den context von `<Outlet/>`
  - [useOutletContext](https://reactrouter.com/en/main/hooks/use-outlet-context)

  ```jsx
  // Anwendungsbeispiel
  // in der App()
  <Route path="vans/:id" element={<HostVanDetail />}>
    <Route index element={<HostVanInfo />} />
    <Route path="pricing" element={<HostVanPricing />} />
    <Route path="photos" element={<HostVanPhotos />} />
  </Route>
  ```

  ```jsx
  // HostVanDetail
  ... fetch currentVan
  return (
  <Outlet context={{ currentVan }} />
  )
  ```

  ```jsx
  // HostVanPhotos
  import { useOutletContext } from "react-router-dom";

  export default function HostVanPhotos() {
    const { currentVan } = useOutletContext();
    return <img src={currentVan.imageUrl} />;
  }
  ```

## Relative and Absolute paths

### relative
- "income" und "reviews" verhält sich relativ zu "host"
- Es kann zu weniger repetitivem Code führen, wenn wir eine Menge verschachtelter Routen haben.

  ```jsx
  <Route path="host" element={<HostLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="income" element={<Income />} />
    <Route path="reviews" element={<Reviews />} />
  </Route>
  ```

  Was ist eine "Index-Route"? [🔗](https://reactrouter.com/en/main/start/concepts#index-routes)
  Es ist die "Standardroute", die wir rendern möchten, wenn der Pfad der übergeordneten Route übereinstimmt. Es gibt uns die Möglichkeit, ein Element innerhalb des <Outlet /> der übergeordneten Route am selben Pfad wie die übergeordnete Route zu rendern.

### absolute

  - Wenn ein Pfad mit einem Schrägstrich "/" beginnt, bedeutet dies, dass er sich auf die Wurzel der gesamten Anwendung bezieht. (Absolute Pfade)

  ```jsx
  <Route path="/host" element={<HostLayout />}>
    <Route path="/host" element={<Dashboard />} />
    <Route path="/host/income" element={<Income />} />
    <Route path="/host/reviews" element={<Reviews />} />
  </Route>
  ```

- relative links
  ```jsx
  // statt absolute Pfade kann man für Link auch...
  <Link to={`host/vans/${id}`}> Go to details </Link>
  // ... relativen Pfad nutzen
  <Link to={`vans/${id}`}> Go to details </Link>
  ```

## Query Parameters

- Abfrage Parameter, die an die URL angehängt werden (sorting, filtering, pagination)
- Verwendung als "einzige Quelle der Wahrheit" für bestimmte Anwendungszustände
  - "Soll ein Nutzer diese Seite so, wie sie ist, erneut besuchen oder teilen können?" Wenn ja, könnte man in Erwägung ziehen, diesen Zustand über einen Abfrageparameter in die URL aufzunehmen
- Beginnen mit `?`
  - `vans?type=simple`
  - Schlüssel/Wert-Parameter
- Getrennt durch `&`
  - `vans?type=rugged&filterBy=price`

## [useSearchParams](https://reactrouter.com/en/main/hooks/use-search-params)

- Der `useSearchParams` Hook vereinfacht den Umgang mit Query-Parametern, indem er eine Schnittstelle bereitstellt, die es ermöglicht, die Parameter zu lesen und zu aktualisieren, während der Zustand der Anwendung automatisch aktualisiert wird.
  - Gibt ein Array mit zwei Elementen zurück
    1. Ein Objekt, das die Schlüssel-Wert-Paare der Suchparameter enthält.
    2. Eine Funktion zum Aktualisieren der Suchparameter in der URL.
- [Suchparameter](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams)

  `url: /vans?type=rugged`

  ```jsx
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  console.log(typeFilter); // rugged
  ```

- Die Verwendung von setSearchParams ermöglicht uns komplexere und flexiblere Parameter.
  ```jsx
  <div className="van-list-filter-buttons">
    <button onClick={() => setSearchParams({ type: "simple" })}>simple</button>
    <button onClick={() => setSearchParams({ type: "luxury" })}>luxury</button>
    <button onClick={() => setSearchParams({ type: "rugged" })}>rugged</button>
    <button onClick={() => setSearchParams({})}> clear </button>
  </div>
  ```

## 404 Error Page

- Die `catch-all` Route verwendet im Grunde genommen `*` als Pfad.
- Da `ErrorPage` Route ein "Kind" von `Layout` Komponente darstellt, wird man in der Lage sein `Navigation` und `Footer` anstelle einer leeren Seite zu sehen.

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="vans" element={<Vans />} />
      <Route path="vans/:id" element={<VanDetail />} />
      <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="income" element={<Income />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="vans" element={<HostVans />} />
        <Route path="vans/:id" element={<HostVanDetail />}>
          <Route index element={<HostVanInfo />} />
          <Route path="pricing" element={<HostVanPricing />} />
          <Route path="photos" element={<HostVanPhotos />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} /> // CATCH-ALL ROUTE
    </Route>
  </Routes>
</BrowserRouter>
```

## New Data API - React-Router v6.4

- die neue Data API erfordert einen neuen [Router](https://reactrouter.com/en/main/routers/picking-a-router#using-v64-data-apis)
-
- statt `BrowserRouter` verwendet man [createrBrowserRouter](https://reactrouter.com/en/main/routers/create-browser-router)
- für die Umwandlung kann man [createRoutesFromElements](https://reactrouter.com/en/main/utils/create-routes-from-elements) benutzen
- [RouterProvider](https://reactrouter.com/en/main/routers/router-provider)

```jsx
import ...
import {
BrowserRouter,
Route,
Link,
RouterProvider,
createBrowserRouter,
createRoutesFromElements } from "react-router-dom"

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          ...
          <Route path="*" element={<NotFound />}/>
    </Route>
))

function App() {
  return (
   <RouterProvider router={router} />
  )
}
```

## [Loader](https://reactrouter.com/en/main/route/loader)

- Eine Funktion, die Daten im Voraus lädt, bevor eine bestimmte Route in einer React-Komponente gerendert wird.
- Was sind einige Vorteile der Verwendung einer Data-Loader-Funktion anstelle des Abrufs unserer Daten in einem useEffect in einer Komponente?
  1. Wir müssen uns keine Gedanken über das Handling des Ladezustands in der Komponente machen
  2. Wir benötigen keinen umfangreichen/komplizierten useEffect-Code in unserer Komponente
  3. Wir müssen den Fehlerzustand nicht in der Komponente behandeln
- Bevor man `Loader` (oder eine der neuen Data-Layer-API-Funktionen) verwendet bedarf es Änderung:
  1. BrowserRouter-Komponente entfernen
  2. stattdessen createBrowserRouter() verwenden
  3. createRoutesFromElements() verwenden, um den Übergang etwas einfacher zu gestalten.
- Schritte, die wir unternehmen müssen, um einen Loader für eine beliebige Route zu verwenden.
  1. Definieren und exportieren Sie eine Loader-Funktion
  2. Loader importieren und an die Route übergeben, von der wir Daten abrufen möchten (loader={xyLoader})
  3. [useLoaderData](https://reactrouter.com/en/main/hooks/use-loader-data) Hook verwenden, um die Daten aus der Loader-Funktion abzurufen.

```jsx
// utils/api.js
export async function getVans() {
  const res = await fetch("/api/vans");
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}
```

```jsx
// Vans.jsx
import { getVans } from "../../api";

export function loader() {
  return getVans();
}
export function Vans() {
  // ... code
}
```

```jsx
// App.jsx
import Vans, { loader as vansLoader } from "./pages/Vans/Vans"

//innerhalb von createRoutesFromElements
...
 <Route path="vans" element={<Vans />} loader={vansLoader} />
...
```

> Das Abrufen der Daten erfolgt nun nicht mehr wie bisher im `useEffect()`!!!

### Error Handling

Zu den neuen Funktionen, die nun innerhalb der Route übergeben werden können (Objekt oder Element)
können wir `errorElement` übergeben, wenn das aktuelle Element einen Error auslöst.

- Tipp: `errorElement` in der übergreifenden Eltern Route platzieren, um alle exceptions innerhalb der der App abzufangen.

```jsx
<Route
  path="vans"
  element={<Vans />}
  loader={vansLoader}
  errorElement={<ShowError />} //errorElement which catches errors
/>
```

- [useRouteError](https://reactrouter.com/en/main/hooks/use-route-error)
  - Innerhalb eines errorElements gibt dieser Hook alles zurück, was während `action`, einem `loader` oder einem Rendering ausgelöst wird.

```jsx
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  return (
    <>
      <h1> Error: {error.message} </h1>
      <pre>
        {" "}
        {error.status} - {error.statusText}{" "}
      </pre>
    </>
  );
}
// {message: "Failed to fetch vans", statusText: "Bad Request", status: 400}
```

## Forms and Actions

- Die [Form](https://reactrouter.com/en/main/components/form) Komponente ist ein Wrapper um das HTML `form`-element, der den Browser für das clientseitige Routing und die Datenumwandlung emuliert.

```jsx
// unbedingt namen vergeben, sonst wird man nicht auf die Werte zugreifen können
<Form method="post" action="/events">
  <input type="text" name="title" />
  <input type="text" name="description" />
  <button type="submit">Create</button>
</Form>
```

All dies wird "state updates" für alle gerenderten `useNavigation` Hooks auslösen, so dass Sie ausstehende Indikatoren erstellen können, während die asynchronen Operationen im Gange sind.

- [action](https://reactrouter.com/en/main/route/action)

  ```jsx
  // Anwendungsbeispiel - Login.jsx
  // eine action Funktion oberhalb von Login Komponente definieren
  export async function action({ request }) {
    // native JS FormData Object
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const data = await loginUser({ email, password });
      return data;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
  export default const Login = () => {
     <Form action="/login" method="post">
      // wir zeigen auf den relativen! Pfad, in dem sich unsere action-function befindet
      <input type="email" name="email" placeholder="Email address" />
      <br />
      <input type="password" name="password" placeholder="Password" />
      <br />
      <button>Log in</button>
    </Form>
  }
  ```

  ```jsx
  // App.jsx
  import Login, {action as loginAction } from "./Login"

  // ... router code
  createRoutesFromElements(
  <Route path="/" element={<Layout />}
  	<Route path="login" element={<Login />} action={loginAction} />
    // Wir stellen eine Funktion zur Verfügung, die aufgerufen wird,
    // wenn das Formular mit dem Pfad /login abgeschickt wird.
  </Route>
  )
  ```

  - [useActionData](https://reactrouter.com/en/main/hooks/use-action-data) - Dieser Hook liefert den Rückgabewert von `action` der vorherigen Navigation oder `undefined`, wenn keine Übermittlung stattgefunden hat.

    ```jsx
    // ... action code

    export default const Login = () => {
       const data = useActionData();
       //...
       return (
       	 {data?.error && <h4>{data.error}</h4>} //conditionally render error message
         	 //...rest of JSX
       )
    }
    ```

## Handling loading state with useNavigation Hook

- [useNavigation](https://reactrouter.com/en/main/hooks/use-navigation)
  - sammelt Informationen über den aktuellen Status

```jsx
export default function Login() {
const data = useActionData();
const navigation = useNavigation();

return (
  <div className="login-container">
    <Form action="/login" method="post" className="login-form">
      <input name="email" type="email" placeholder="Email address" />
      <input name="password" type="password" placeholder="Password" />
      <button disabled={navigation?.state === "submitting"}>
        {/* DOING CONDITIONAL RENDERING DEPENDING ON THAT STATE */}
        {navigation?.state === "submitting" ? "Logging in..." : "Log in"}
      </button>
    </Form>
  </div>
  /
);
}
```

### [Deferring data](https://reactrouter.com/en/main/guides/deferred#deferred-data-guide)

- [defer](https://reactrouter.com/en/main/utils/defer)

  - aufschieben oder besser gesagt: warte nicht bis die Daten geladen sind
  - [gute Erklärung](https://youtu.be/L2kzUg6IzxM?t=2120)
  - Syntax: `defer({key: value})`
    - value kann alles sein worauf man Zugriff haben möchte
    - value muss ein Promise als Rückgabewert haben?

  ```jsx
  import { defer } from "react-router-dom"
  import { getVans } from "../../api"

  export functin loader() {
  	return defer({vans: getVans()})
  }
  //
  ```

- [Await](https://reactrouter.com/en/main/components/await) Component

  - wird verwendet, um verzögerte Werte mit automatischer Fehlerbehandlung wiederzugeben.
  - Await hat einen `resolve`-Parameter, mit dem wir Daten übergeben, die wir in unserer Komponente schließlich rendern müssen.

  ```jsx
  // Vans.jsx
  export default Vans = () => {
    const dataPromise = useLoaderData();

    return (
      <Await resolve={dataPromise.vans}>
        {(vans) => {
          vans.map((van) => <h1>{van.name}</h1>);
        }}
      </Await>
    );
  };
  ```

  ### Await Children

  - könnten React-Elemente oder Funktionen sein

  Als Funktion:

  ```jsx
  <Await resolve={reviewsPromise}>
    {(resolvedReviews) => <Reviews items={resolvedReviews} />}
  </Await>
  ```

  Bei der Verwendung von React-Elementen liefert [useAsyncValue](https://reactrouter.com/en/main/hooks/use-async-value) die Daten:

  ```jsx
  <Await resolve={reviewsPromise}>
    <Reviews />
  </Await>;

  function Reviews() {
    const resolvedReviews = useAsyncValue();
    return <div>{/* ... */}</div>;
  }
  ```

  ### React [Suspense](https://react.dev/reference/react/Suspense)

  - Anzeige eines Fallbacks, während der Inhalt geladen wird

### Kombination aus loader, defer, Await und Suspense

```jsx
import { Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../api";

export const loader = () => {
  return defer({ hostVans: getHostVans() });
};

export default function HostVans() {
  const hostVansPromise = useLoaderData();

  function renderHostVans(hostVans) {
    return hostVans.map((van) => {
      return (
        <Link to={van.id} key={van.id} className="host-van-link-wrapper">
          <div className="host-van-single" key={van.id}>
            <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
            <div className="host-van-info">
              <h3>{van.name}</h3>
              <p>${van.price}/day</p>
            </div>
          </div>
        </Link>
      );
    });
  }
  // When Await will wait for promise to resolve and actually get the vans data, "Loading..." will be displayed in the UI.
  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        <section>
          <Suspense fallback={<h1>Loading... </h1>}>
            <Await resolve={hostVansPromise.hostVans}>{renderHostVans}</Await>
          </Suspense>
        </section>
      </div>
    </section>
  );
}
```

## INDEX

- [useNavigation](https://reactrouter.com/en/main/hooks/use-navigation)
- [useLocation](https://reactrouter.com/en/main/hooks/use-location)
- [useNavigate](https://reactrouter.com/en/main/hooks/use-navigate)
- [useActionData](https://reactrouter.com/en/main/hooks/use-action-data)
- [useRouteError](https://reactrouter.com/en/main/hooks/use-route-error)
- [useLoaderData](https://reactrouter.com/en/main/hooks/use-loader-data)
- [Form](https://reactrouter.com/en/main/components/form)
- [Suspense](https://react.dev/reference/react/Suspense) _React_
- [Await](https://reactrouter.com/en/main/components/await)
- [defer](https://reactrouter.com/en/main/utils/defer)
- [loader](https://reactrouter.com/en/main/route/loader)
