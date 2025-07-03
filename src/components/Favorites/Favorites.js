import AnimalItem from "../AnimalItem/AnimalItem";
import styles from './Favorites.module.css';

const Favorites = ({ favorites }) => {
  return (
    <ul className={styles.favorites}>
      {favorites.map((animal, index) => <AnimalItem src={animal} key={index} />)}
    </ul>
  );
}

export default Favorites