import AnimalItem from "./AnimalItem";

const Favorites = ({ favorites }) => {
  return (
    <ul className="favorites">
      {favorites.map((animal, index) => <AnimalItem src={animal} key={index} />)}
    </ul>
  );
}

export default Favorites