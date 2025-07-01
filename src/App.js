import logo from './logo.svg';
import './App.css';
import React from 'react';

const jsonLocalStorage = {
  setItem: (key, value) => {
    console.log('localStorage.setItem() 실행');
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    console.log('localStorage.getItem() 실행');
    return JSON.parse(localStorage.getItem(key));
  },
};

const PageTitle = (props) => <h1>{props.children}</h1>;

const AnimalForm = ({ updateMainAnimal }) => {
  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const hangul = (text) => /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(text);

  function handleInputChange(data) {
    const userValue = data.target.value;
    setValue(userValue.toUpperCase());

    if (hangul(userValue)) {
      setErrorMessage('한글은 입력할 수 없습니다.');
    } else {
      setErrorMessage('');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (value === '') {
      setErrorMessage('빈 값은 추가할 수 없습니다.');
      return;
    }

    setErrorMessage('');
    updateMainAnimal();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="귀여운 동물을 입력하세요."
        onChange={handleInputChange}
        value={value}
      />
      <button type="submit">추가</button>
      <p style={{ color: "#f00" }}>{errorMessage}</p>
    </form>
  );
}

const MainCard = ({ src, alt, handleHeartClick, choiceFavorite }) => {
  const heartIcon = choiceFavorite ? '🤍' : '💕';

  return (
    <div className="main-card">
      <img src={src} alt={alt} width="400px" />
      <button onClick={handleHeartClick}>{heartIcon}</button>
    </div>
  );
}

const AnimalItem = ({ src, alt }) => (
  <li>
    <img src={src} alt={alt} />
  </li>
);

const Favorites = ({ favorites }) => {
  return (
    <ul className="favorites">
      {favorites.map((animal, index) => <AnimalItem src={animal} key={index} />)}
    </ul>
  );
}

function App() {
  console.log('** App 실행 **');

  const animal01 = 'img/bear.png';
  const animal02 = 'img/elephant.png';
  const animal03 = 'img/fox.png';
  const animal04 = 'img/rabbit.png';

  const [mainAnimal, setMainAnimal] = React.useState(animal01);
  const [favorites, setFavorites] = React.useState(() => {
    console.log('favorites useState() 실행됨!');
    return jsonLocalStorage.getItem('favorites') || [];
  });

  const [count, setCount] = React.useState(() => {
    console.log('count useState() 실행됨!');
    return jsonLocalStorage.getItem('count') || 1;
  });

  const choiceFavorite = favorites.includes(mainAnimal);

  function incrementCount() {
    setCount((pre) => {
      const nextCount = pre + 1;
      localStorage.setItem('count', JSON.stringify(nextCount));
      return nextCount;
    });
  }

  function updateMainAnimal() {
    setMainAnimal(animal02);
    incrementCount();
  }

  function handleHeartClick() {
    console.log('하트 버튼 클릭');
    setFavorites((pre) => {
      const nextFavorites = [...pre, mainAnimal];
      localStorage.setItem('favorites', JSON.stringify(nextFavorites));
      return nextFavorites;
    });

  }

  return (
    <div>
      <PageTitle>{count} 페이지</PageTitle>
      <AnimalForm updateMainAnimal={updateMainAnimal} />
      <MainCard
        src={mainAnimal}
        alt="아기 곰"
        handleHeartClick={handleHeartClick}
        choiceFavorite={choiceFavorite}
      />
      <Favorites favorites={favorites} />
    </div>
  );
}

export default App;
