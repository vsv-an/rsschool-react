import { Pokemon } from '../SearchResultList/SearchResultList';
import './Card.css';

interface Props {
  data: Pokemon;
}

function Card({ data }: Props) {
  return (
    <div className="card">
      <h3>{data.id}</h3>
      <img
        src={data.sprites.front_default}
        className="card-img"
        alt={data.name}
      />
      <p>{data.name}</p>
    </div>
  );
}

export default Card;
