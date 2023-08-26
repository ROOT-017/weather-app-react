const getSearchedHistory = (latestSearch) => {
  //if the last search is an empty object, return
  if (Object.keys(latestSearch).length === 0) return;
  const unique = new Set();
  const location = {
    name: latestSearch.name,
    lat: latestSearch.lat,
    lon: latestSearch.lon,
  };

  const lastSearch = JSON.parse(localStorage.getItem("searchedHistory"));
  //if there is no last search, return empty array
  if (!lastSearch) {
    unique.add(location);
    localStorage.setItem("searchedHistory", JSON.stringify([...unique]));
    return [...unique];
  }

  lastSearch.map((item) => unique.add(item));

  //check if the latest search is already in the history
  unique.forEach((item) => {
    if (item.name === location.name && item.lat === location.lat) {
      unique.delete(item);
    }
  });

  unique.add(location);

  //check if the history is more than 5 items delete the oldest
  if (unique.size > 5) {
    const iterator = unique.values();
    const firstItem = iterator.next().value;
    unique.delete(firstItem);
  }

  localStorage.setItem("searchedHistory", JSON.stringify([...unique]));
  return [...unique];
};

export default getSearchedHistory;
