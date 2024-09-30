<script>
	import Autocomplete from '@components/Autocomplete';
	import Switcher from '@components/Switcher';
	import Container from '@components/Container';
	import gemeinden from '@data/ags.csv';

	const baseUrl = 'https://notfallrettung.swr.de';
	const dictionary = {
		age: 'selectedAge',
		gender: 'selectedGender',
		area: 'ags',
		isPersonalised: 'personalised',
		'Über 50': 'old',
		'Unter 50': 'young',
		Weiblich: 'female',
		Männlich: 'male'
	};
	$: formData = {
		gender: 'Weiblich',
		age: 'Unter 50'
	};
	$: url = `${baseUrl}?${[
		...Object.entries(formData),
		['isPersonalised', Object.entries(formData).length > 0]
	]
		.filter((el) => {
			return el[1] !== null;
		})
		.map(([key, value]) => {
			return `${dictionary[key] ? dictionary[key] : key}=${encodeURIComponent(dictionary[value] ? dictionary[value] : value)}`;
		})
		.join('&')}`;
</script>

<Container>
	<header>
		<h3 class="title">Beim Herzstillstand <em>zählt jede Sekunde.</em></h3>
		<p class="intro">
			Gib deinen Namen, Wohnort, Alter und Geschlecht ein, um zu lesen, wie die Notfallrettung bei
			Dir aussieht.
		</p>
	</header>
	<form>
		<div class="form__cols">
			<div class="form__input">
				<label for="name">Vorname</label>
				<input placeholder="Max Mustermann" id="name" type="text" bind:value={formData.name} />
			</div>
			<div class="form__input">
				<label for="name">Wohnort</label>
				<Autocomplete
					placeholder="Baden-Baden"
					on:select={(e) => {
						if (e.detail?.item) {
							formData.ags = e.detail.item.details.ags;
							formData.place = e.detail.item.value;
							formData.lat = e.detail.item.details.lat;
							formData.lon = e.detail.item.details.lon;
						} else {
							// In Svelte 5 you can "delete" from state objects, but for now:
							formData = Object.fromEntries(
								Object.entries(formData).filter(
									([key]) => !['ags', 'place', 'lat', 'lon'].includes(key)
								)
							);
						}
					}}
					data={gemeinden.map((el) => {
						return {
							value: el.name,
							label: el.name,
							details: {
								ags: el.ags,
								lon: el.lon,
								lat: el.lat
							}
						};
					})}
				/>
			</div>
		</div>
		<div class="form__cols">
			<Switcher
				label="Alter"
				groupName="age"
				options={['Unter 50', 'Über 50']}
				bind:value={formData.age}
			/>
			<Switcher
				label="Geschlecht"
				groupName="gender"
				options={['Weiblich', 'Männlich']}
				bind:value={formData.gender}
			/>
			<div class="form__submit">
				<a href={url} class="button" class:is-disabled={Object.entries(formData).length < 7}
					>Zum interaktiven Artikel</a
				>
				<a href={baseUrl} class="text-link">Ohne Personalisierung lesen</a>
			</div>
		</div>
	</form>
</Container>

<style lang="scss">
	.title {
		margin: 0;
		margin-bottom: 1.5rem;
		text-wrap: balance;
		em {
			font-style: normal;
			text-decoration: underline;
			text-underline-offset: 0.15em;
			text-decoration-thickness: 0.125em;
		}
	}
	pre {
		text-align: left;
	}

	.intro {
		text-wrap: balance;
		margin-bottom: 1em;
		display: none;
	}

	input {
		color: inherit;
		padding: 0 0.75em;
		width: 100%;
		background: transparent;
		&:focus-visible {
			outline: none;
			box-shadow: 0px 0px 1rem 0px rgb(89, 32, 192);
		}
	}

	label,
	legend {
		margin-bottom: 0.5em;
	}

	.form__input {
		display: flex;
		flex-flow: column;
		margin-bottom: 1.25em;
	}

	.form__cols {
		display: grid;
		& > * {
			flex-basis: 0;
			flex-grow: 1;
		}
	}

	.form__submit {
		display: flex;
		align-items: baseline;
		gap: 1.5em;
		flex-flow: column;
	}

	.text-link {
		color: white;
		opacity: 0.75;
	}

	.button {
		display: inline-flex;
		align-items: center;
		justify-self: flex-start;
		padding: 0 1.5em;
		color: white;
		margin-top: 0.75rem;
		&.is-disabled {
			opacity: 0.5;
			pointer-events: none;
		}
	}
</style>
