import styles from './product.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductByKey } from '../../api/commers-tools-api';
import { Carousel } from '../../components/carousel/Carousel';
import { ModalWindow } from '../../components/modal/ModalWindow';
import { Button } from '../../components/button/Button';

// fetchedData - is 'any' -> fix it?

type ProductData = {
  title: string;
  description: string;
  imageTitle: string;
  images: Array<string>;
  modalImages: Array<string>;
  price: number;
  releaseDate: string;
  positive: string;
  userScore: string;
  categoriesAdd: Array<string>;
  movie: Array<string>;
};

export const Product = () => {
  const navigate = useNavigate();
  const { key } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [productData, setProductData] = useState<ProductData>({
    title: '',
    description: '',
    imageTitle: '',
    images: [],
    modalImages: [],
    price: 0,
    releaseDate: '',
    positive: '',
    userScore: '',
    categoriesAdd: [],
    movie: [],
  });

  async function renderProductData(productKey: string) {
    try {
      const fetchedData = await getProductByKey(productKey);

      const masterData = fetchedData.masterData.current;
      const masterVariant = masterData.masterVariant;
      const attributes = masterVariant.attributes;

      const getStringAttribute = (index: number) => attributes[index].value as string;

      const title = masterData.name.en as string;
      const description = masterData.description['en-US'] as string;
      const imageTitle = masterVariant.images[0].url as string;
      const images = JSON.parse(getStringAttribute(5)) as Array<string>;
      const modalImages = [imageTitle, ...images];
      const price = masterVariant.prices[0].value.centAmount;

      const releaseDate = getStringAttribute(4);
      const positive = getStringAttribute(7);
      const userScore = getStringAttribute(0);
      const categoriesAdd = JSON.parse(getStringAttribute(2));

      const movie = JSON.parse(getStringAttribute(3));

      setProductData({
        title,
        description,
        imageTitle,
        images,
        modalImages,
        price,
        releaseDate,
        positive,
        userScore,
        categoriesAdd,
        movie,
      });
      setIsLoading(false);
    } catch {
      navigate('/NotFoundPage');
    }
  }

  useEffect(() => {
    key && renderProductData(key);
  }, [key]);

  return isLoading ? (
    <div className={styles.productWrapper}>
      <p className={styles.loadingPage}>Page is loading...</p>
    </div>
  ) : (
    <div className={styles.productWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <h1 className={styles.title}>{productData.title}</h1>
          <p className={styles.description}>{productData.description}</p>
        </div>
        <div onClick={() => setIsModal(true)} className={styles.imageTitleWrapper}>
          <div className={styles.imageTitleBorder}>
            <img className={styles.imageTitle} src={productData.imageTitle} alt="Game Image" />
          </div>
        </div>
      </div>
      <div className={styles.buyWrapper}>
        <h3 className={styles.buyPromo}>Buy it now! </h3>
        <Button style={styles.buyBtn} title={`${productData.price / 100} USD`} />
      </div>

      <div className={styles.carouselWrapper}>
        <Carousel images={productData.images} />
      </div>

      <div className={styles.addWrapper}>
        <h3 className={styles.addTitle}>Additional game data:</h3>
        <ul className={styles.addList}>
          <li>Game released: {productData.releaseDate}</li>
          <li>Positive: {productData.positive}</li>
          <li>User score: {productData.userScore}</li>
          {productData.categoriesAdd.length && (
            <li>
              Steam categories:
              <ul>
                {productData.categoriesAdd.map((item, index) => {
                  return <li key={`${index}_steam_cat`}>{item}</li>;
                })}
              </ul>
            </li>
          )}
        </ul>
      </div>

      {productData.movie.length > 0 && (
        <div>
          <h3 className={styles.addTitle}>Game Movie</h3>
          {productData.movie.map((video, index) => {
            return (
              <div key={`${index}_video`} className={styles.videoWrapper}>
                <video className={styles.video} controls>
                  <source src={video} />
                </video>
              </div>
            );
          })}
        </div>
      )}

      {isModal && (
        <ModalWindow
          message={
            <div style={{ maxHeight: '75vh' }} className={styles.carouselWrapper}>
              <Carousel images={productData.modalImages} />
            </div>
          }
          onClose={() => {
            setIsModal(false);
          }}
        />
      )}
    </div>
  );
};