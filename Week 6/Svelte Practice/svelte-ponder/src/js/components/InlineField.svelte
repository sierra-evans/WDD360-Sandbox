<script lang="ts">
  let {
    label,
    value = $bindable(),
    type = "text",
  }: {
    label: string;
    value: string;
    type?: "text" | "email" | "textarea";
  } = $props();

  let isEditing = $state(false);
  let originalValue = value;
  // svelte-ignore non_reactive_update
  let displayEl: HTMLElement | null = null;

  function startEdit() {
    originalValue = value;
    isEditing = true;
  }

  function commitEdit() {
    isEditing = false;
    displayEl?.focus();
  }

  function cancelEdit() {
    value = originalValue;
    isEditing = false;
    displayEl?.focus();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      cancelEdit();
    } else if (event.key === "Enter" && type !== "textarea") {
      commitEdit();
    }
  }
</script>

<div class="field">
  <div class="label">{label}</div>

  {#if isEditing}
    {#if type === "textarea"}
      <!-- svelte-ignore a11y_autofocus -->
      <textarea
        bind:value
        aria-label={label}
        autofocus
        onblur={commitEdit}
        onkeydown={handleKeyDown}></textarea>
    {:else}
      <!-- svelte-ignore a11y_autofocus -->
      <input
        {type}
        bind:value
        aria-label={label}
        autofocus
        onblur={commitEdit}
        onkeydown={handleKeyDown}
      />
    {/if}
  {:else}
    <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
    <button
      class="value"
      type="button"
      aria-label={`Edit ${label}`}
      bind:this={displayEl}
      onclick={startEdit}
    >
      {value}
    </button>
  {/if}
</div>

<style>
  .field {
    margin-bottom: 1rem;
  }
  .label {
    font-size: 0.75rem;
    color: grey;
  }
  .value {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
  }
  .value:hover {
    background: lightcyan;
  }
</style>
