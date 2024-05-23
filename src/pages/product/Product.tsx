import styles from './product.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductByKey } from '../../api/commers-tools-api';
import { Carousel } from '../../components/carousel/Carousel';
import { ModalWindow } from '../../components/modal/ModalWindow';

// fetchedData - is 'any' -> fix it?

type ProductData = {
  title: string;
  description: string;
  imageTitle: string;
  images: Array<string>;
  modalImages: Array<string>;
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

      setProductData({
        title,
        description,
        imageTitle,
        images,
        modalImages,
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

      <div className={styles.carouselWrapper}>
        <Carousel images={productData.images} />
      </div>

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
