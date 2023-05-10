<script>
	import { page } from '$app/stores';
</script>

<div class="my-16 text-center text-4xl font-bold">
	<h1>{$page.status}: {$page.error?.message}</h1>
</div>
