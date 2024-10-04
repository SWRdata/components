<script>
	import Autocomplete from '@components/Autocomplete';
	import Switcher from '@components/Switcher';
	import Card from '@components/Card';
	import Container from '@components/Container';
	import Input from '@components/Input';
	import Button from '@components/Button';
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
	<Card>
		<header>
			<h3 class="title">Beim Herzstillstand <em>zählt jede Sekunde.</em></h3>
			<p class="intro">
				Gib deinen Namen, Wohnort, Alter und Geschlecht ein, um zu lesen, wie die Notfallrettung bei
				Dir aussieht.
			</p>
		</header>
		<form>
			<Input
				label="Vorname"
				placeholder="Vorname"
				name="name"
				type="text"
				bind:value={formData.name}
			/>
			<Autocomplete
				label="Wohnort"
				name="wohnort"
				placeholder="Trage hier eine Gemeinde ein"
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
				<Button
					href={url}
					label="Zum Artikel"
					as="a"
					disabled={Object.entries(formData).length < 7}
				/>
				<a href={baseUrl} class="text-link">Ohne Personalisierung lesen</a>
			</div>
		</form>
	</Card>
</Container>

<style lang="scss">
	header,
	form {
		font-family: var(--swr-sans);
	}
	.title {
		font-family: var(--swr-sans);
		font-size: 2.2rem;
		line-height: 1.15;
		font-weight: 600;
		letter-spacing: 0.0025em;
		margin: 0;
		margin-bottom: 1.5rem;
		text-wrap: balance;
		em {
			font-style: normal;
			text-decoration: underline;
			text-underline-offset: 0.15em;
			text-decoration-thickness: 0.125em;
			text-decoration-color: var(--orange);
		}
	}

	.intro {
		text-wrap: balance;
		font-size: 1.25em;
		margin-bottom: 1em;
	}

	form {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1em 1.5em;
	}

	.form__submit {
		grid-column: span 2;
		display: flex;
		align-items: baseline;
		gap: 1.5em;
		margin-top: 1.5em;
	}

	.text-link {
		color: white;
		opacity: 0.75;
	}
</style>
