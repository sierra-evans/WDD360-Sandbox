export function useInlineEdit<T extends Record<string, any>>(
    initial: T,
    onSave: (value: T) => Promise<void> | void
) {
    const draft = $state<T>($state.snapshot(initial) as T);
    let original = $state<T>($state.snapshot(initial) as T);

    const isDirty = $derived(
        () => JSON.stringify(draft) !== JSON.stringify(original)
    );


    async function save() {
        await onSave($state.snapshot(draft) as T);
        original = $state.snapshot(draft) as T;
    }

    function cancel() {
        Object.assign(draft, $state.snapshot(original));
    }

    function reset(newValue: T) {
        Object.assign(draft, $state.snapshot(newValue));
        original = $state.snapshot(newValue) as T;
    }
    return {
        draft,
        isDirty,
        save,
        cancel,
        reset
    };
}