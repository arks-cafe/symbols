<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	async function handleSignIn() {
		goto('/logto/signin');
	}

	async function handleSignOut() {
		goto('/logto/signout');
	}
</script>

<button class="btn" on:click={handleSignIn}>Sign IN</button>
<button class="btn" on:click={handleSignOut}>Sign Out</button>
