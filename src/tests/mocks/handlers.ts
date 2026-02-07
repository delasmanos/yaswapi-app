import { http, HttpResponse } from "msw";
import { API_CONFIG } from "@/lib/config";

const BASE = API_CONFIG.BASE_URL;

export const handlers = [
  http.get(`${BASE}${API_CONFIG.ENDPOINTS.FILMS}`, () => {
    return HttpResponse.json({
        results: [
            {
                title: "A New Hope",
                episode_id: 4,
                opening_crawl: "It is a period of civil war...",
                director: "George Lucas",
                producer: "Gary Kurtz, Rick McCallum",
                release_date: "1977-05-25",
                users: [],
                planets: [],
                starships: [],
                vehicles: [],
                species: [],
                created: "2014-12-10T14:23:31.880000Z",
                edited: "2014-12-20T19:49:45.256000Z",
                url: "https://swapi.dev/api/films/1/"
            }
        ],
        count: 1
    });
  }),
  http.get(`${BASE}${API_CONFIG.ENDPOINTS.PEOPLE}`, () => {
    return HttpResponse.json({
        results: [
            {
                name: "Luke Skywalker",
                height: "172",
                mass: "77",
                hair_color: "blond",
                skin_color: "fair",
                eye_color: "blue",
                birth_year: "19BBY",
                gender: "male",
                homeworld: "https://swapi.dev/api/planets/1/",
                films: ["https://swapi.dev/api/films/1/"],
                species: [],
                vehicles: ["https://swapi.dev/api/vehicles/14/"],
                starships: ["https://swapi.dev/api/starships/12/"],
                created: "2014-12-09T13:50:51.644000Z",
                edited: "2014-12-20T21:17:56.891000Z",
                url: "https://swapi.dev/api/people/1/"
            }
        ],
        count: 1
    });
  }),
];
