import { ref } from 'vue';

const fetchthedata = () => {
	const data = ref([]);
	const error = ref(null);

	const load = async () => {
		console.log('Load called');
		try {
			let gett = await fetch('http://localhost:3000/list');
			if (!gett.ok) {
				throw new Error('No data found');
			}
			data.value = await gett.json();
		} catch (err) {
			error.value = err.message;
			console.log(error.value);
		}
	};

	return { data, error, load };
};

export default fetchthedata;
