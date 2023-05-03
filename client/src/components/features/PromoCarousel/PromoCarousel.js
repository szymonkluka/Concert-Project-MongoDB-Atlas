import { UncontrolledCarousel } from 'reactstrap';
import './PromoCarousel.scss';

const items = [
  {
    src: '/img/promo/promo1.jpg',
    header: 'Great atmosphere!',
    caption: 'Have fun with thousands of people!',
    alt: 'Have fun with thousands of people!',
  },
  {
    src: '/img/promo/promo2.jpg',
    altText: 'Listen to the greatest hits!',
    caption: 'Take a part in phenomenal performances.',
    header: 'Listen to the greatest hits',
  },
  {
    src: '/img/promo/promo3.jpg',
    altText: 'Meet stars!',
    caption: 'Meet the biggest music starts live!',
    header: 'Meet stars!',
  }
];

const PromoCarousel = () => <UncontrolledCarousel className="promoCarousel" items={items} />;

export default PromoCarousel;