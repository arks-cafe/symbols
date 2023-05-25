<script lang="ts">
	import { page } from '$app/stores';
	let profile = $page.data.profile;
	$: profile = $page.data.profile;
	import SettingsForm from './settings/SettingsForm.svelte';
</script>

<header class="sticky top-4 z-40 mb-8 px-8">
	<div class="navbar mx-auto max-w-5xl rounded-xl bg-primary bg-opacity-90 px-2">
		<div class="navbar-start">
			<div class="dropdown-start dropdown-bottom dropdown">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label
					aria-label="button"
					title="Theme Settings"
					tabindex="0"
					class="btn-ghost btn-square btn text-primary-content"
				>
					<i class="fa-solid fa-lightbulb text-lg" />
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<div tabindex="0" class="dropdown-content rounded-box mt-2 w-52 bg-base-100 p-4 shadow-lg">
					<SettingsForm />
				</div>
			</div>
		</div>

		<div class="navbar-center">
			<a
				href="/"
				title="Home"
				class="btn-ghost btn overflow-x-clip text-4xl font-black normal-case text-primary-content"
			>
				<h1>Symbol Bucket</h1>
			</a>
		</div>

		<div class="navbar-end">
			{#if profile?.userId}
				<div class="dropdown-bottom dropdown dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label
						aria-label="button"
						title="Account"
						tabindex="0"
						class="btn-ghost btn-square btn text-primary-content"
					>
						<i class="fa-solid fa-user text-lg" />
					</label>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<div tabindex="0" class="dropdown-content rounded-box mt-2 w-52 bg-base-100 shadow-lg">
						<div class="px-4 pt-4">
							<span class="font-bold">@{profile.name}</span>
						</div>

						<ul class="menu rounded-box p-2">
							<li>
								<a href="/users/{profile.userId}">Profile</a>
							</li>
							<li>
								<a href="/logto/signout">Sign Out</a>
							</li>
						</ul>
					</div>
				</div>
			{:else}
				<div class="dropdown-bottom dropdown dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label
						aria-label="button"
						title="Account"
						tabindex="0"
						class="btn-ghost btn-square btn text-primary-content"
					>
						<i class="fa-solid fa-right-to-bracket" />
					</label>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<div tabindex="0" class="dropdown-content rounded-box mt-2 w-52 bg-base-100 shadow-lg">
						<div class="px-4 pt-4">
							<span class="font-bold">Not Logged In</span>
						</div>
						<ul class="menu rounded-box p-2">
							<li>
								<a href="/logto/signin">Sign In</a>
							</li>
						</ul>
					</div>
				</div>
			{/if}
		</div>
	</div>
</header>
