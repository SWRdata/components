<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	import FormLabel from './FormLabel.svelte';
	import Select from '../Select/Select.svelte';

	const { Story } = defineMeta({
		title: 'Form/Label'
	});
</script>

<Story name="Default">
	<DesignTokens>
		<FormLabel htmlFor="">Deine Gemeinde</FormLabel>
	</DesignTokens>
</Story>

<Story name="With Select">
	<DesignTokens>
		<FormLabel htmlFor="select-gemeinde">Deine Gemeinde</FormLabel>
		<Select
			inputId="select-gemeinde"
			placeholder="..."
			value={undefined}
			items={[
				{ value: 'konstanz', label: 'Konstanz' },
				{ value: 'stuttgart', label: 'Stuttgart' },
				{ value: 'heidelberg', label: 'Heidelberg' }
			]}
		></Select>
	</DesignTokens>
</Story>
