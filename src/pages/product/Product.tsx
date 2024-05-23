import styles from './product.module.scss';
import { useParams, useNavigate, json } from 'react-router-dom';
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
      console.log(fetchedData);

      const title = fetchedData.masterData.current.name.en as string;
      const description = fetchedData.masterData.current.description['en-US'] as string;
      const imageTitle = fetchedData.masterData.current.masterVariant.images[0].url as string;
      const imagesJson = fetchedData.masterData.current.masterVariant.attributes[5].value as string;
      const images = JSON.parse(imagesJson) as Array<string>;
      const modalImages = [imageTitle, ...images];
      const price = fetchedData.masterData.current.masterVariant.prices[0].value.centAmount;

      const releaseDate = fetchedData.masterData.current.masterVariant.attributes[4].value as string;
      const positive = fetchedData.masterData.current.masterVariant.attributes[7].value as string;
      const userScore = fetchedData.masterData.current.masterVariant.attributes[0].value as string;
      const categoriesJson = fetchedData.masterData.current.masterVariant.attributes[2].value as string;
      const categoriesAdd = JSON.parse(categoriesJson);

      const movieJson = fetchedData.masterData.current.masterVariant.attributes[3].value as string;
      const movie = JSON.parse(movieJson);

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
          <p className={styles.title}>{productData.title}</p>
          <p className={styles.description}>{productData.description}</p>
        </div>
        <div onClick={() => setIsModal(true)} className={styles.imageTitleWrapper}>
          <div className={styles.imageTitleBorder}>
            <img className={styles.imageTitle} src={productData.imageTitle} alt="Game Image" />
          </div>
        </div>
      </div>
      <div className={styles.buyWrapper}>
        <p className={styles.buyPromo}>Buy it now! </p>
        <Button style={styles.buyBtn} title={`${productData.price / 100} USD`} />
      </div>

      <div className={styles.carouselWrapper}>
        <Carousel images={productData.images} />
      </div>

      <div>
        <h2 className={styles.addTitle}>Additional game data:</h2>
        <ul className={styles.addWrapper}>
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
          <h2 className={styles.addTitle}>Game Movie</h2>
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
