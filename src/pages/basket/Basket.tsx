import styles from './basket.module.scss';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useCartStore } from '../../store/useCartStore';
import { changeProductsQuantity } from '../../api/commerce-tools-api-cart';

export const Basket = () => {
  const cart = useCartStore((state) => state.cart);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Basket Page</h2>
      {cart?.lineItems.map((item) => {
        return (
          <div className={styles.sas} key={item.id}>
            <div>
              <img className={styles.cartItemImg} src={item.variant.images[0].url} alt="img" />
            </div>
            <button onClick={() => navigate(`/catalog/${item.productKey}`)}>{item.name.en}</button>
            <button onClick={() => changeProductsQuantity(cart, [item], item!.quantity - 1)}>-</button>
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
            <button onClick={() => changeProductsQuantity(cart, [item], item!.quantity + 1)}>+</button>
            <FaTrash onClick={() => changeProductsQuantity(cart, [item], 0)} />
            <div>{item.price.discounted?.value.centAmount || item.price.value.centAmount}cent</div>
            <div>
              {item.totalPrice.centAmount}
              cent
            </div>
          </div>
        );
      })}
      <div>Total price: {cart?.totalPrice.centAmount}</div>
      <button
        onClick={() => {
          changeProductsQuantity(cart!, cart!.lineItems, 0);
        }}
      >
        remove all
      </button>
    </div>
  );
};
