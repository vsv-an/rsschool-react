import { Component } from 'react';

import { Pokemon } from '../SearchResultList/SearchResultList';
import './Card.css';

interface Props {
  data: Pokemon;
}

class Card extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const data = this.props.data;
    return (
      <div className="card">
        <img src={data.image} className="card-img" alt={data.name} />
        <p>{data.name}</p>
        <p>{data.description}</p>
      </div>
    );
  }
}

export default Card;
