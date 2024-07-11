import { Pokemon } from '../SearchResultList/SearchResultList';
import './Card.css';

interface Props {
  data: Pokemon;
}

function Card({ data }: Props) {
  return (
    <div className="card">
      <img src={data.image} className="card-img" alt={data.name} />
      <p>{data.name}</p>
    </div>
  );
}

export default Card;
