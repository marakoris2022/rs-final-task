import styles from './cartPageTest.module.scss';
import { useCartStore } from '../store/useCartStore';
import { Cart, changeProductQuantity } from './commerce-tools-api-cart';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

export const CartPageTest = () => {
  const cart = useCartStore((state) => state.cart);
  const navigate = useNavigate();

  const removeAllProducts = async (cart: Cart) => {
    if (!cart) {
      throw new Error('No cart found in state.');
    }

    for (const item of cart.lineItems) {
      await changeProductQuantity(cart, item, 0);
    }
  };

  return (
    <div>
      <h2>Cart page test</h2>
      {cart?.lineItems.map((item) => {
        return (
          <div className={styles.sas} key={item.id}>
            <div>
              <img className={styles.cartItemImg} src={item.variant.images[0].url} alt="img" />
            </div>
            <button onClick={() => navigate(`/catalog/${item.productKey}`)}>{item.name.en}</button>
            <button onClick={() => changeProductQuantity(cart, item, item!.quantity - 1)}>-</button>
            <input
              type="text"
              value={item.quantity}
              onChange={(e) => {
                const inputValue = e.target.value;
                const newQuantity =
                  inputValue === '' ? 0 : /^\d+$/.test(inputValue) ? parseInt(inputValue) : item.quantity;

                if (!isNaN(newQuantity)) {
                  const clampedQuantity = Math.min(Math.max(newQuantity, 1), 199);
                  if (clampedQuantity !== item.quantity) {
                    changeProductQuantity(cart, item, clampedQuantity);
                  }
                }
              }}
            />
            <button onClick={() => changeProductQuantity(cart, item, item!.quantity + 1)}>+</button>
            <FaTrash onClick={() => changeProductQuantity(cart, item, 0)} />
            <div>{item.price.discounted.value.centAmount || item.price.value.centAmount}cent</div>
            <div>
              {item.price.discounted.value.centAmount * item.quantity || item.price.value.centAmount * item.quantity}
              cent
            </div>
          </div>
        );
      })}
      <div>Total price: {cart?.totalPrice.centAmount}</div>
      <button
        onClick={() => {
          removeAllProducts(cart!);
        }}
      >
        remove all
      </button>
    </div>
  );
};
