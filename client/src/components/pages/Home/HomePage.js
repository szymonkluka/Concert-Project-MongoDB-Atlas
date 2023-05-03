import { Container } from 'reactstrap';

import PromoCarousel from './../../features/PromoCarousel/PromoCarousel';
import Lineup from './../../features/Lineup/Lineup';

const HomePage = () => (
  <div>
    <PromoCarousel />
    <Container>
      <h1>Who's on?</h1>
      <Lineup />
    </Container>
  </div>
);

export default HomePage;
