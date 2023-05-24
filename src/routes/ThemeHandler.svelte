<script lang="ts">
	import theme from '$lib/stores/theme';
	import { browser } from '$app/environment';

	$: if ($theme && browser) {
		document.documentElement.removeAttribute('data-theme');
		if ($theme !== 'system') {
			document.documentElement.dataset.theme = $theme;
		}
	}
</script>
