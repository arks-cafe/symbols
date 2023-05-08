<script>
	import { page } from '$app/stores';
</script>

<div class="text-center my-16 font-bold text-4xl">
	<h1>{$page.status}: {$page.error?.message}</h1>
</div>
