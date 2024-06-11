import styles from './product.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductByKey } from '../../api/catalogue-api';
import { Carousel } from '../../components/carousel/Carousel';
import { ModalWindow } from '../../components/modal/ModalWindow';
import { Button } from '../../components/button/Button';
import { getCategoryNameById } from '../../services/getCategoryNameById';
import { Breadcrumbs } from '../../components/breadcrumbs/Breadcrumbs';
import { useCategoryStore } from '../../store/useCategoryStore';
import { useCartStore } from '../../store/useCartStore';
import { Cart, addProductToCart, changeProductsQuantity } from '../../api/commerce-tools-api-cart';
import cartIcon from '/cart-check-svgrepo-com.svg';
import removeIcon from '/remove-circle-svgrepo-com.svg';

export type ProductData = {
  id: string;
  version: number;
  title: string;
  description: string;
  imageTitle: string;
  images: Array<string>;
  modalImages: Array<string>;
  price: number;
  discountPrice: number | undefined;
  releaseDate: string;
  positive: number;
  userScore: number;
  categoriesAdd: Array<string>;
  categories: { id: string }[];
  movie: Array<string>;
  taxCategory?: string;
  productId?: string;
  quantity?: number;
};

function calculateDiscount(oldPrice: number, newPrice: number) {
  const discountPercentage = ((oldPrice - newPrice) / oldPrice) * 100;
  return Math.round(discountPercentage);
}

function findInCart(cart: Cart, productId: string) {
  return cart?.lineItems.find((item) => item.productId === productId);
}

function buttonWithoutDiscount(
  productData: ProductData,
  cart: Cart,
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  setModalText: React.Dispatch<React.SetStateAction<JSX.Element>>,
) {
  return (
    <>
      <h3 className={styles.buyPromo}>
        Buy with Discount{' '}
        <span className={styles.discountPercent}>
          {calculateDiscount(productData.price, productData.discountPrice!)}%
        </span>{' '}
        !{' '}
      </h3>
      <div className={styles.discountWrapper}>
        <p className={styles.oldPrice}>{`${(productData.price / 100).toFixed(2)} USD`}</p>
        <div className={styles.discountBtnContainer}>
          <Button
            style={styles.discountBtn}
            title={`${(productData.discountPrice! / 100).toFixed(2)} USD`}
            onClick={async () => {
              setModalText(<p>Loading...</p>);
              openModal(true);
              await addProductToCart(cart, productData, 1);
              setModalText(
                <p>
                  You <span style={{ color: 'green' }}>successfully</span> added item to the cart.
                </p>,
              );
            }}
          />
        </div>
      </div>
    </>
  );
}

function buttonWithDiscount(
  productData: ProductData,
  cart: Cart,
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  setModalText: React.Dispatch<React.SetStateAction<JSX.Element>>,
) {
  return (
    <>
      <h3 className={styles.buyPromo}>Buy it now! </h3>
      <Button
        style={styles.buyBtn}
        title={`${(productData.price / 100).toFixed(2)} USD`}
        onClick={async () => {
          setModalText(<p>Loading...</p>);
          openModal(true);
          await addProductToCart(cart, productData, 1);
          setModalText(
            <p>
              You <span style={{ color: 'green' }}>successfully</span> added item to the cart.
            </p>,
          );
        }}
      />
    </>
  );
}

function ItemInTheCart(
  cart: Cart,
  productData: ProductData,
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  setModalText: React.Dispatch<React.SetStateAction<JSX.Element>>,
) {
  return (
    <div className={styles.cartBlockWrapper}>
      <span className={styles.cartBlockText}>Item in the Cart!</span>
      <img className={styles.cartIcon} src={cartIcon} alt="Cart" />
      <img
        onClick={async () => {
          openModal(true);
          setModalText(<p>Loading...</p>);
          await changeProductsQuantity(cart!, [productData], 0);
          setModalText(
            <p>
              You <span style={{ color: 'red' }}>remove</span> product from the cart.
            </p>,
          );
        }}
        className={styles.removeIcon}
        src={removeIcon}
        alt="Remove"
      />
    </div>
  );
}

export const Product = () => {
  const navigate = useNavigate();
  const clearCategories = useCategoryStore((state) => state.clearCategories);
  const addCategories = useCategoryStore((state) => state.addCategories);
  const cart = useCartStore((state) => state.cart);
  const { key } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [isPurchase, setIsPurchase] = useState(false);
  const [modalText, setModalText] = useState(<p></p>);
  const [productData, setProductData] = useState<ProductData>({
    id: '',
    version: 1,
    taxCategory: '',
    title: '',
    description: '',
    imageTitle: '',
    images: [],
    modalImages: [],
    price: 0,
    discountPrice: undefined,
    releaseDate: '',
    positive: 0,
    userScore: 0,
    categories: [],
    categoriesAdd: [],
    movie: [],
  });

  function categoryClick(id: string) {
    clearCategories();
    addCategories([id]);
    navigate(`/`);
  }

  async function renderProductData(productKey: string) {
    try {
      const fetchedData = await getProductByKey(productKey);

      if (fetchedData) {
        const id = fetchedData.id;
        const version = fetchedData.version;
        const taxCategory = fetchedData?.taxCategory;

        const masterData = fetchedData.masterData.current;
        const masterVariant = masterData.masterVariant;
        const attributes = masterVariant.attributes;
        const prices = masterVariant.prices[0];

        const getStringAttribute = (index: number) => attributes[index].value;

        const title = masterData.name.en;
        const description = masterData.description['en-US'];
        const imageTitle = masterVariant.images[0].url;
        const images = JSON.parse(getStringAttribute(5) as string);
        const modalImages = [imageTitle, ...images];
        const price = prices.value.centAmount;
        const discountPrice = prices.discounted?.value.centAmount;

        const releaseDate = String(getStringAttribute(4));
        const positive = Number(getStringAttribute(7));
        const userScore = Number(getStringAttribute(0));
        const categories = masterData.categories;
        const categoriesAdd = JSON.parse(getStringAttribute(2) as string);
        const movie = JSON.parse(getStringAttribute(3) as string);

        setProductData({
          version,
          id,
          taxCategory,
          title,
          description,
          imageTitle,
          images,
          modalImages,
          price,
          discountPrice,
          releaseDate,
          positive,
          userScore,
          categoriesAdd,
          movie,
          categories,
        });
        setIsLoading(false);
      }
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
      <Breadcrumbs subPage={getCategoryNameById(productData.categories[0].id)!} currantPage={productData.title} />

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
        {findInCart(cart!, productData.id)
          ? ItemInTheCart(cart!, productData, setIsPurchase, setModalText)
          : productData.discountPrice
            ? buttonWithoutDiscount(productData, cart!, setIsPurchase, setModalText)
            : buttonWithDiscount(productData, cart!, setIsPurchase, setModalText)}
      </div>

      <div className={styles.carouselWrapper}>
        <Carousel images={productData.images} />
      </div>

      <div className={styles.categoryWrapper}>
        <h3 className={styles.categoryTitle}>Game Categories:</h3>
        <ul className={styles.listWrapper}>
          {productData.categories.map((item, index) => {
            return (
              <li className={styles.categoryItem} key={`${index}_cat`}>
                <Button
                  onClick={() => categoryClick(item.id)}
                  style={styles.categoryBtn}
                  title={getCategoryNameById(item.id)!}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.addWrapper}>
        <h3 className={styles.addTitle}>Additional game data:</h3>
        <ul className={styles.addList}>
          <li>Game released: {productData.releaseDate}</li>
          <li>Positive: {productData.positive}</li>
          <li>User score: {productData.userScore}</li>
        </ul>
      </div>

      {productData.movie.length > 0 && (
        <div className={styles.videoBlockWrapper}>
          <h3 className={styles.videoTitle}>Game Movie</h3>
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

      <div style={{ width: '100%', marginBottom: '10px' }}>
        <Breadcrumbs subPage={getCategoryNameById(productData.categories[0].id)!} currantPage={productData.title} />
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
      {isPurchase && (
        <ModalWindow
          message={findInCart(cart!, productData.id) ? modalText : modalText}
          onClose={() => {
            setIsPurchase(false);
          }}
        />
      )}
    </div>
  );
};
