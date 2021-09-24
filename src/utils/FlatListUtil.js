const addIndex = (items = []) => {
	const mappedItems = items.map((item, i) => {return {id: i, name:item}})
	return mappedItems;
}

export {
	addIndex
}
