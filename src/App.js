import { useEffect, useState } from "react";
import AppView from "./View/App.view";
import initialData from './data.json';
import {
	handleNormalizeInitialData,
	handleFilterAndSortData
} from "./Functions/App";

const App = () => {
	const [state, setState] = useState({
		data: [],
		cleanData: [],
		categories: [],
		filterCategory: "",
		filterCourierName: "",
	});

	
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
		const { data, categories } =
			handleNormalizeInitialData(initialData);

		setState(prevState => ({
			...prevState,
			data: data,
			categories: categories,
		}));
	}, []);

	useEffect(() => {
		if (state.data.length > 0) {
			setState(prevState => ({
				...prevState,
				cleanData: handleFilterAndSortData(state.data, {
					filterCategory: state.filterCategory,
					filterCourierName: state.filterCourierName
				}),
			}));
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
