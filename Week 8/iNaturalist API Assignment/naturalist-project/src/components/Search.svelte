<script lang="ts">
  import { searchPlaces, getObservations } from "../services/inaturalist";

  let searchTerm = "";              // Store the user's search input
  let places: any[] = [];           // Store the places returned by the API
  let selectedPlace: any = null;    // Store the selected place
  let observations: any[] = [];     // Store the observations returned by the API
  let observationDate = "";         // Store the optional observation date
  let loading = false;              // Track whether data is loading
  let errorMessage = "";            // Store any errors

  // Search for places
  async function handlePlaceSearch() {
    if (!searchTerm.trim()) return;

    try {
      loading = true;
      errorMessage = "";
      selectedPlace = null;
      observations = [];

      places = await searchPlaces(searchTerm);
    } catch (error) {
      errorMessage = "Unable to find places. Please try again.";
    } finally {
      loading = false;
    }
  }

  // Select a place and retrieve its observations
  async function handlePlaceSelect(place: any) {
    selectedPlace = place;
    places = [];

    await loadObservations();
  }

  // Retrieve observations for the selected place
  async function loadObservations() {
    if (!selectedPlace) return;

    try {
      loading = true;
      errorMessage = "";

      const results = await getObservations(selectedPlace.id, observationDate);

      // Remove duplicate species using their taxon ID
      const uniqueObservations = new Map();

      results.forEach((observation: any) => {
        if (
          observation.taxon &&
          !uniqueObservations.has(observation.taxon.id)
        ) {
          uniqueObservations.set(observation.taxon.id, observation);
        }
      });

      observations = Array.from(uniqueObservations.values());
    } catch (error) {
      errorMessage = "Unable to retrieve observations.";
    } finally {
      loading = false;
    }
  }
</script>

<h1>iNaturalist API Explorer</h1>

<form
  onsubmit={(event) => {
    event.preventDefault();
    handlePlaceSearch();
  }}
>
  <label for="place-search">Search for a place:</label>
  <input
    id="place-search"
    type="text"
    bind:value={searchTerm}
    placeholder="Enter a city or location..."
  />

  <button type="submit">Search</button>
</form>

{#if selectedPlace}
  <h2>Selected place: {selectedPlace.display_name}</h2>

  <label for="observation-date">Filter by observation date:</label>
  <input id="observation-date" type="date" bind:value={observationDate} />

  <button onclick={loadObservations}> Apply Date Filter </button>
{/if}

{#if places.length > 0}
  <h2>Select a place:</h2>

  {#each places as place}
    <button onclick={() => handlePlaceSelect(place)}>
      {place.display_name}
    </button>
  {/each}
{/if}

{#if errorMessage}
  <p>{errorMessage}</p>
{/if}

{#if loading}
  <p>Loading observations...</p>
{:else if observations.length > 0}
  <h2>Identifications</h2>

  <div class="observations">
    {#each observations as observation}
      <div class="observation-card">
        <img
          src={observation.photos[0]?.url?.replace("square", "medium")}
          alt={observation.taxon?.name}
        />

        <h3>
          {observation.taxon?.preferred_common_name || observation.taxon?.name}
        </h3>

        <p>{observation.taxon?.name}</p>

        <p class="observation-date">
          Observed: {observation.observed_on || "Date unknown"}
        </p>
      </div>
    {/each}
  </div>
{:else if selectedPlace && !loading}
  <p>No observations found.</p>
{/if}
