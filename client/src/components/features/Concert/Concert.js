import { Row, Col } from 'reactstrap';

import './Concert.scss';

const Concert = ({ performer, price, genre, day, image }) => (
  <article className="concert">
    <Row noGutters>
      <Col xs="6">
        <div className="concert__image-container">
          <img className="concert__image-container__img" src={image} alt={performer}/>
        </div>
      </Col>
      <Col xs="6">
        <div className="concert__info">
          <img className="concert__info__back" src={image} alt={performer}/>
          <h2 className="concert__info__performer">{ performer }</h2>
          <h3 className="concert__info__genre">{ genre }</h3>
          <p className="concert__info__day-n-price">Day: {day}, Price: { price }$</p>
        </div>
      </Col>
    </Row>
  </article>
);

export default Concert;