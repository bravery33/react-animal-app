const MainCard = ({ src, alt, handleHeartClick, choiceFavorite }) => {
  const heartIcon = choiceFavorite ? '🤍' : '💕';

  return (
    <div className="main-card">
      <img src={`${process.env.PUBLIC_URL}/${src}`} alt={alt} width="400px" />
      <button onClick={handleHeartClick}>{heartIcon}</button>
    </div>
  );
}

export default MainCard