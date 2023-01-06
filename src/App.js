import { useEffect, useState } from "react";
import AppView from "./app.view";
import initialData from './data.json';

const App = () => {
	const [state, setState] = useState({
		data: [],
		cleanData: [],
		categories: [],
		filterCategory: "",
		filterCourierName: "",
	});


	const handleNormalizeInitialData = (data) => {
		const categories = Object.keys(data);
		const categoryItems = Object.values(data);
		const categorizedData = [];

		for (const rowItem in categoryItems) {
			for (const item in categoryItems[rowItem]) {
				const target = categoryItems[rowItem][item];
				const targetDate = target.request_datetime ||
					target.datetime ||
					target.created_at;
				const dateOptions = {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				};

				target.category = categories[rowItem];
				target.epochTimestamp = new Date(targetDate).valueOf();
				target.faDate = new Date(targetDate)
					.toLocaleDateString('fa-IR', dateOptions)
					.split(",").join(" ").split(" ").reverse().join(" ");
				categorizedData.push(categoryItems[rowItem][item]);
			}
		}
		// sort by recent to oldest date
		categorizedData.sort((a, b) => b.epochTimestamp - a.epochTimestamp);
		setState(prevState => ({
			...prevState,
			data: categorizedData,
			categories: categories,
		}));
	}

	const handleFilterAndSortData = (data) => {
		// filter by category on unclean data
		let uncleanData = state.filterCategory ?
			data.filter(item => item.category === state.filterCategory) : data;
		// filter by courier name
		if (state.filterCourierName && state.filterCategory === 'trip_financials') {
			uncleanData = uncleanData.filter(
				item => item.driver === state.filterCourierName ||
					item.driver.split(" ").indexOf(state.filterCourierName) > -1);
		}
		const cleanData = [];
		const usedDates = [];

		for (const uncleanDataIndex in uncleanData) {
			if (usedDates.indexOf(uncleanData[uncleanDataIndex].faDate) === -1) {
				const dateObject = {
					faDate: uncleanData[uncleanDataIndex].faDate,
					activities: [uncleanData[uncleanDataIndex]],
				}
				cleanData.push(dateObject);
				usedDates.push(uncleanData[uncleanDataIndex].faDate);
			} else {
				for (const cleanDataIndex in cleanData) {
					if (
						cleanData[cleanDataIndex].faDate ===
						uncleanData[uncleanDataIndex].faDate
					) {
						cleanData[cleanDataIndex].activities.push(uncleanData[uncleanDataIndex]);
						break;
					}
				}
			}
		}
		setState(prevState => ({ ...prevState, cleanData: cleanData }));
	}

	const handleUpdateCategory = (category) => {
		setState(prevState => ({
			...prevState,
			filterCategory: category,
			filterCourierName: "",
		}));
	}

	const handleUpdateCourierName = (name) => {
		setState(prevState => ({
			...prevState,
			filterCourierName: name,
		}));
	}
	

	useEffect(() => {
		handleNormalizeInitialData(initialData);
	}, []);

	useEffect(() => {
		if (state.data.length > 0) {
			handleFilterAndSortData(state.data);
		}
	}, [state.data, state.filterCategory, state.filterCourierName]);


	return <AppView
		data={state.cleanData}
		category={state.filterCategory}
		categories={state.categories}
		updateCategory={(category) => handleUpdateCategory(category)}
		updateCourierName={(name) => handleUpdateCourierName(name)}
	/>;
}

export default App;
