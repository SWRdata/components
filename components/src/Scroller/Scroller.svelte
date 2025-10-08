<script context="module" lang="ts">
	interface ScrollHandler {
		(): void;
	}

	interface ScrollerInstance {
		outer: HTMLElement;
		update: ScrollHandler;
	}

	interface ScrollManager {
		add(scroller: ScrollerInstance): void;
		remove(scroller: ScrollerInstance): void;
	}

	const handlers: ScrollHandler[] = [];
	let manager: ScrollManager;

	// Global scroll and resize event handling
	if (typeof window !== 'undefined') {
		const runAllHandlers = (): void => {
			handlers.forEach((handler) => handler());
		};

		window.addEventListener('scroll', runAllHandlers);
		window.addEventListener('resize', runAllHandlers);
	}

	// Intersection Observer for performance optimization
	if (typeof IntersectionObserver !== 'undefined') {
		const handlerMap = new Map<Element, ScrollHandler>();

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const update = handlerMap.get(entry.target);
					if (!update) return;

					const handlerIndex = handlers.indexOf(update);

					if (entry.isIntersecting) {
						if (handlerIndex === -1) {
							handlers.push(update);
						}
					} else {
						update();
						if (handlerIndex !== -1) {
							handlers.splice(handlerIndex, 1);
						}
					}
				});
			},
			{
				rootMargin: '400px 0px' // TODO why 400?
			}
		);

		manager = {
			add: ({ outer, update }: ScrollerInstance): void => {
				const { top, bottom } = outer.getBoundingClientRect();

				// Add handler if element is initially visible
				if (top < window.innerHeight && bottom > 0) {
					handlers.push(update);
				}

				handlerMap.set(outer, update);
				observer.observe(outer);
			},

			remove: ({ outer, update }: ScrollerInstance): void => {
				const handlerIndex = handlers.indexOf(update);
				if (handlerIndex !== -1) {
					handlers.splice(handlerIndex, 1);
				}

				handlerMap.delete(outer);
				observer.unobserve(outer);
			}
		};
	} else {
		// Fallback for browsers without IntersectionObserver
		manager = {
			add: ({ update }: ScrollerInstance): void => {
				handlers.push(update);
			},

			remove: ({ update }: ScrollerInstance): void => {
				const handlerIndex = handlers.indexOf(update);
				if (handlerIndex !== -1) {
					handlers.splice(handlerIndex, 1);
				}
			}
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	// Configuration props
	export let top: number = 0;
	export let bottom: number = 1;
	export let threshold: number = 0.5;
	export let query: string = 'section';
	export let parallax: boolean = false;

	// Binding props
	export let index: number = 0;
	export let count: number = 0;
	export let offset: number = 0;
	export let progress: number = 0;
	export let visible: boolean = false;

	// Element bindings
	let outer: HTMLElement;
	let foreground: HTMLElement;
	let background: HTMLElement;

	// Internal state
	let sections: NodeListOf<Element>;
	let windowHeight: number = 0;
	let offsetTop: number = 0;
	let containerWidth: number = 1;
	let containerLeft: number = 0;

	// Computed values
	$: topPx = Math.round(top * windowHeight);
	$: bottomPx = Math.round(bottom * windowHeight);
	$: thresholdPx = Math.round(threshold * windowHeight);

	// Reactive updates
	$: if (top || bottom || threshold || parallax) {
		update();
	}

	$: backgroundStyle = `
        top: ${offsetTop || topPx}px;
        z-index: ${progress > 1 ? 3 : 1};
    `;

	onMount(() => {
		if (!foreground) return;

		sections = foreground.querySelectorAll(query);
		count = sections.length;

		update();

		const scrollerInstance: ScrollerInstance = { outer, update };
		manager.add(scrollerInstance);

		return () => {
			manager.remove(scrollerInstance);
		};
	});

	function update(): void {
		if (!foreground || !background || !outer) return;

		updateContainerMeasurements();
		updateScrollProgress();
		updateActiveSection();
	}

	function updateContainerMeasurements(): void {
		const outerRect = outer.getBoundingClientRect();
		containerLeft = outerRect.left;
		containerWidth = outerRect.right - outerRect.left;
	}

	function updateScrollProgress(): void {
		const foregroundRect = foreground.getBoundingClientRect();
		const backgroundRect = background.getBoundingClientRect();

		visible = foregroundRect.top < windowHeight && foregroundRect.bottom > 0;

		const foregroundHeight = foregroundRect.bottom - foregroundRect.top;
		const backgroundHeight = backgroundRect.bottom - backgroundRect.top;
		const availableSpace = bottomPx - topPx;

		progress = (topPx - foregroundRect.top) / (foregroundHeight - availableSpace);

		if (parallax) {
			offsetTop = Math.round(topPx - progress * (backgroundHeight - availableSpace));
		}
	}

	function updateActiveSection(): void {
		if (!sections.length) return;

		const foregroundRect = foreground.getBoundingClientRect();

		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			const sectionRect = section.getBoundingClientRect();
			const sectionTop = sectionRect.top;

			const nextSection = sections[i + 1];
			const sectionBottom = nextSection
				? nextSection.getBoundingClientRect().top
				: foregroundRect.bottom;

			offset = (thresholdPx - sectionTop) / (sectionBottom - sectionTop);

			if (sectionBottom >= thresholdPx) {
				index = i;
				break;
			}
		}
	}
</script>

<svelte:window bind:innerHeight={windowHeight} />

<svelte-scroller-outer bind:this={outer}>
	<svelte-scroller-background-container class="background-container">
		<svelte-scroller-background bind:this={background} style={backgroundStyle}>
			<slot name="background" {index} {count} {offset} {progress} {visible} />
		</svelte-scroller-background>
	</svelte-scroller-background-container>

	<svelte-scroller-foreground bind:this={foreground}>
		<slot name="foreground" {index} {count} {offset} {progress} {visible} />
	</svelte-scroller-foreground>
</svelte-scroller-outer>

<style>
	svelte-scroller-outer {
		display: block;
		position: relative;
	}

	svelte-scroller-background {
		display: block;
		position: sticky;
		top: 0;
		width: 100%;
	}

	svelte-scroller-foreground {
		display: block;
		position: relative;
		z-index: 2;
	}

	svelte-scroller-foreground::after {
		content: '';
		display: block;
		clear: both;
	}

	svelte-scroller-background-container {
		display: block;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		max-width: 100%;
		pointer-events: none;
		will-change: transform;
	}
</style>
