<script lang='ts'>
    let email = $state('');
    let password = $state('');
    let errors = $state<string[]>([]);

    function loginHandler(event: SubmitEvent) {
        event.preventDefault();
        errors = [];

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            errors.push('Please enter a valid email address.');
        }
        if (password.length < 6) {
            errors.push('Password must be at least 6 charcaters long.');
        }
        if (errors.length > 0) return;

        console.log('Login button clicked', {email, password});
    }
</script>

<form onsubmit={loginHandler}>
    <label for="email">Email</label>
    <input id="email" type="email" bind:value={email}>

    <label for="password">Password</label>
    <input id="password" type="password" bind:value={password}>

    <button type='submit'>Log In</button>

    {#if errors.length > 0}
        <ul class="errors">
        {#each errors as error}
            <li>{error}</li>
        {/each}
        </ul>
    {/if}
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-width: 320px;
        margin: 2rem auto;
        padding: 1.5rem;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
</style>