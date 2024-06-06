import { render, screen } from '@testing-library/react';
import { Carousel } from './Carousel';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

vi.mock('swiper/modules', () => ({
  Pagination: vi.fn(),
  Navigation: vi.fn(),
}));

describe('<Carousel />', () => {
  const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

  it('renders images inside SwiperSlides', () => {
    render(<Carousel images={images} />);

    const imageElements = screen.getAllByAltText('img');
    expect(imageElements).toHaveLength(images.length);
  });
});
