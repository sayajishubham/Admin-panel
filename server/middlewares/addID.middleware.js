const addID = (heroes) => {
  let lastID = heroes.length > 1 ? heroes[heroes.length - 2].id : 0; 
  heroes[heroes.length - 1].id = lastID + 1;
  return heroes;
};

module.exports = { addID };
