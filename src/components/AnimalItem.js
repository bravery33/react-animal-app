const AnimalItem = ({ src, alt }) => {
  console.log(process.env.PUBLIC_URL)
  return (
  <li>
    <img src={src} alt={alt} />
  </li>
);
}
export default AnimalItem;