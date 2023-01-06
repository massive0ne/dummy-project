
export const handleNormalizeInitialData = (data) => {
    const categories = Object.keys(data);
    const categoryItems = Object.values(data);
    const modifiedData = [];

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
            modifiedData.push(categoryItems[rowItem][item]);
        }
    }
    // sort by recent to oldest date
    modifiedData.sort((a, b) => b.epochTimestamp - a.epochTimestamp);
    return {
        data: modifiedData,
        categories: categories,
    }
}


export const handleFilterAndSortData = (data, filters) => {
    const filterCategory = filters.filterCategory;
    const filterCourierName = filters.filterCourierName;
    // filter by category on unclean data
    let uncleanData = filterCategory ?
        data.filter(item => item.category === filterCategory) : data;
    // filter by courier name
    if (filterCourierName && filterCategory === 'trip_financials') {
        uncleanData = uncleanData.filter(
            item => item.driver === filterCourierName ||
                item.driver.split(" ").indexOf(filterCourierName) > -1);
    }
    const cleanData = [];
    const usedDates = [];

    for (const uncleanDataIndex in uncleanData) {
        if (usedDates.indexOf(uncleanData[uncleanDataIndex].faDate) === -1) {
            const dateObject = {
                faDate: uncleanData[uncleanDataIndex].faDate,
                transactions: [uncleanData[uncleanDataIndex]],
            }
            cleanData.push(dateObject);
            usedDates.push(uncleanData[uncleanDataIndex].faDate);
        } else {
            for (const cleanDataIndex in cleanData) {
                if (
                    cleanData[cleanDataIndex].faDate ===
                    uncleanData[uncleanDataIndex].faDate
                ) {
                    cleanData[cleanDataIndex].transactions.push(
                        uncleanData[uncleanDataIndex]
                    );
                    break;
                }
            }
        }
    }
    return cleanData;
}