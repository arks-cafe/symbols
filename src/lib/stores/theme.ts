import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

function createThemeStore() {
	const { subscribe, set } = writable<Theme>('system');

	if (!browser) return { subscribe, set };

	const theme = localStorage.getItem('theme') as Theme;
	if (theme === 'light' || theme === 'dark' || theme === 'system') set(theme);
	return {
		subscribe,
		set: (theme: Theme) => {
			localStorage.setItem('theme', theme);
			set(theme);
		}
	};
}

const theme = createThemeStore();

export default theme;
