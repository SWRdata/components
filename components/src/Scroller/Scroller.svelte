<script module lang="ts">
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

		window.addEventListener('scroll', runAllHandlers, { passive: true });
		window.addEventListener('resize', runAllHandlers, { passive: true });
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

	/**
	 * Props interface for the Scroller component
	 */
	interface ScrollerProps {
		/**
		 * The vertical position that the top of the foreground must scroll past before the background becomes fixed,
		 * as a proportion of window height (0 = top of viewport, 1 = bottom of viewport)
		 * @default 0
		 */
		top?: number;

		/**
		 * The inverse of top — once the bottom of the foreground passes this point, the background becomes unfixed.
		 * As a proportion of window height (0 = top of viewport, 1 = bottom of viewport)
		 * @default 1
		 */
		bottom?: number;

		/**
		 * Once a section crosses this point, it becomes 'active'.
		 * As a proportion of window height (0 = top of viewport, 1 = bottom of viewport)
		 * @default 0.5
		 */
		threshold?: number;

		/**
		 * A CSS selector that describes the individual sections of your foreground
		 * @default 'section'
		 */
		query?: string;

		/**
		 * If true, the background will scroll such that the bottom edge reaches the bottom at the same time as the foreground.
		 * This effect can be unpleasant for people with high motion sensitivity, so use it advisedly.
		 * @default false
		 */
		parallax?: boolean;

		/**
		 * The index of the currently active section (bindable)
		 * @default 0
		 */
		index?: number;

		/**
		 * The total number of sections (bindable)
		 * @default 0
		 */
		count?: number;

		/**
		 * How far the section has scrolled past the threshold, as a value between 0 and 1 (bindable)
		 * @default 0
		 */
		offset?: number;

		/**
		 * How far the foreground has travelled, where 0 is the top of the foreground crossing top,
		 * and 1 is the bottom crossing bottom (bindable)
		 * @default 0
		 */
		progress?: number;

		/**
		 * Whether the scroller is currently visible in the viewport (bindable)
		 * @default false
		 */
		visible?: boolean;
	}

	// Configuration props (read-only)
	let {
		top = 0,
		bottom = 1,
		threshold = 0.5,
		query = 'section',
		parallax = false,
		// Binding props (two-way binding)
		index = $bindable(0),
		count = $bindable(0),
		offset = $bindable(0),
		progress = $bindable(0),
		visible = $bindable(false)
	}: ScrollerProps = $props();

	// Element bindings
	let outer = $state<HTMLElement>();
	let foreground = $state<HTMLElement>();
	let background = $state<HTMLElement>();

	// Internal state
	let sections = $state<NodeListOf<Element>>();
	let windowHeight = $state(0);
	let offsetTop = $state(0);
	let containerWidth = $state(1);
	let containerLeft = $state(0);

	// Computed values
	let topPx = $derived(Math.round(top * windowHeight));
	let bottomPx = $derived(Math.round(bottom * windowHeight));
	let thresholdPx = $derived(Math.round(threshold * windowHeight));

	let backgroundStyle = $derived(`
		top: ${offsetTop || topPx}px;
		z-index: ${progress > 1 ? 3 : 1};
	`);

	// Reactive updates
	$effect(() => {
		if (top || bottom || threshold || parallax) {
			update();
		}
	});

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
