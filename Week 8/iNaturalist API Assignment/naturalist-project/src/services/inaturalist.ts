const BASE_URL = "https://api.inaturalist.org/v1";

// Search for places using the iNaturalist API
export async function searchPlaces(searchTerm: string) {
    const response = await fetch(
        `${BASE_URL}/places/autocomplete?q=${encodeURIComponent(searchTerm)}`
    );

    if (!response.ok) {
        throw new Error("Unable to search for places.");
    }

    const data = await response.json();

    return data.results;
}


// Get observations for a selected place
export async function getObservations(
    placeId: number,
    observationDate?: string
) {
    const params = new URLSearchParams({
        place_id: String(placeId),
        photos: "true",
        per_page: "200",
        order: "desc",
        order_by: "observed_on",
    });

    // Filter observations by a specific date if one was selected
    if (observationDate) {
        params.set("d1", observationDate);
        params.set("d2", observationDate);
    }

    const response = await fetch(
        `${BASE_URL}/observations?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error("Unable to retrieve observations.");
    }

    const data = await response.json();

    return data.results;
}
