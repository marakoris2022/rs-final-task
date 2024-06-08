import styles from './basket.module.scss';
import { useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useCartStore } from '../../store/useCartStore';
import { changeProductsQuantity } from '../../api/commerce-tools-api-cart';
import { Loading } from '../../components/loading/Loading';
import { Button } from '../../components/button/Button';

export const Basket = () => {
  const cart = useCartStore((state) => state.cart);
  const navigate = useNavigate();

  if (!cart) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className={styles.basketPageTitle}>Basket Page</h2>
      {cart?.lineItems.map((item) => {
        return (
          <div className={styles.basketItemContainer} key={item.id}>
            <div>
              <img className={styles.cartItemImg} src={item.variant.images[0].url} alt="img" />
            </div>
            <div className={styles.cartItemRightColumnContainer}>
              <div className={styles.cartItemRightColumnTop}>
                <button className={styles.productNameLink} onClick={() => navigate(`/catalog/${item.productKey}`)}>
                  {item.name.en}
                </button>
                <div className={styles.quantityChangeContainer}>
                  <button
                    className={styles.quantityChangeItem}
                    onClick={() => changeProductsQuantity(cart, [item], item!.quantity - 1)}
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const newQuantity =
                        inputValue === '' ? 0 : /^\d+$/.test(inputValue) ? parseInt(inputValue) : item.quantity;

                      if (!isNaN(newQuantity!)) {
                        const clampedQuantity = Math.min(Math.max(newQuantity!, 1), 199);
                        if (clampedQuantity !== item.quantity) {
                          changeProductsQuantity(cart, [item], clampedQuantity);
                        }
                      }
                    }}
                  />
                  <button
                    className={styles.quantityChangeItem}
                    onClick={() => changeProductsQuantity(cart, [item], item!.quantity + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className={styles.cartItemRightColumnBottom}>
                <div>{item.price.discounted?.value.centAmount || item.price.value.centAmount}cent</div>
                <div>
                  {item.totalPrice.centAmount}
                  cent
                </div>
                <FaTrash onClick={() => changeProductsQuantity(cart, [item], 0)} />
              </div>
            </div>
          </div>
        );
      })}
      {cart?.totalPrice.centAmount !== 0 && <div>Total price: {cart?.totalPrice.centAmount}</div>}
      {cart?.totalPrice.centAmount !== 0 && (
        <Button
          style={styles.clearBasketBtn}
          onClick={() => {
            changeProductsQuantity(cart!, cart!.lineItems, 0);
          }}
          title="Clear basket"
          type="button"
        />
      )}
      {cart?.totalPrice.centAmount === 0 && (
        <div className={styles.emptyBasket}>
          <h2>Your basket is empty</h2>
          <div className={styles.linkToCatalog}>
            <p>See our</p>
            <button className={styles.productNameLink} onClick={() => navigate('/')}>
              catalog
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
