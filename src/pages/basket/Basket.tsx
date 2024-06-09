import styles from './basket.module.scss';
import { useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useCartStore } from '../../store/useCartStore';
import { addDiscountCode, changeProductsQuantity, removeDiscountCode } from '../../api/commerce-tools-api-cart';
import { Loading } from '../../components/loading/Loading';
import { Button } from '../../components/button/Button';
import { useFormik } from 'formik';
import { FormValues } from '../../interfaces/interfaces';
import { useState } from 'react';
import { FormField } from '../../components/form-field/FormField';
import { ModalWindow } from '../../components/modal/ModalWindow';

const validate = (values: FormValues) => {
  const errors: FormValues = {};

  if (!values.promoCode) {
    errors.firstName = 'Required';
  }

  return errors;
};

enum DiscountCodesId {
  TO_ALL_10 = '4f74c748-8545-4f50-ac5b-3ee7387dfa3b',
  TO_RACING_50 = 'd05d4292-bfdc-4191-bed4-ae62f2357698',
}

enum DiscountCodesName {
  rsschool10off = 'rsschool10off',
  racing50off = 'racing50off',
}

export const Basket = () => {
  const cart = useCartStore((state) => state.cart);
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');

  const formik = useFormik({
    initialValues: {
      promoCode: '',
    },
    validate,
    onSubmit: async function (values) {
      try {
        let msg: string;

        if (cart?.discountCodes?.length) {
          let promoToDeleteId: string | null;

          if (values.promoCode === DiscountCodesName.rsschool10off) {
            promoToDeleteId = DiscountCodesId.TO_ALL_10;
          } else if (values.promoCode === DiscountCodesName.racing50off) {
            promoToDeleteId = DiscountCodesId.TO_RACING_50;
          } else {
            promoToDeleteId = null;
          }

          if (cart.discountCodes[0].discountCode.id === promoToDeleteId && promoToDeleteId) {
            msg = 'Promo code have been already activated';
          } else if (!promoToDeleteId) {
            await addDiscountCode(cart!, values.promoCode);
            msg = 'Promo code activated!';
          } else {
            await removeDiscountCode(
              cart,
              promoToDeleteId === DiscountCodesId.TO_ALL_10 ? DiscountCodesId.TO_RACING_50 : DiscountCodesId.TO_ALL_10,
            );
            await addDiscountCode(cart!, values.promoCode);
            msg = 'Promo code activated!';
          }
        } else {
          await addDiscountCode(cart!, values.promoCode);
          msg = 'Promo code activated!';
        }

        setMsg(() => msg);
      } catch (err: unknown) {
        if (err instanceof Error) {
          const errMsg = err.message;
          formik.setFieldValue('promoCode', '');
          setMsg(() => errMsg);
        }
      }
    },
  });

  if (!cart) {
    return <Loading />;
  }

  console.log(cart);

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
                    onClick={async () => await changeProductsQuantity(cart, [item], item.quantity! - 1)}
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    onChange={async (e) => {
                      const inputValue = e.target.value;
                      const newQuantity =
                        inputValue === '' ? 0 : /^\d+$/.test(inputValue) ? parseInt(inputValue) : item.quantity;

                      if (!isNaN(newQuantity!)) {
                        const clampedQuantity = Math.min(Math.max(newQuantity!, 1), 199);
                        if (clampedQuantity !== item.quantity) {
                          await changeProductsQuantity(cart, [item], clampedQuantity);
                        }
                      }
                    }}
                  />
                  <button
                    className={styles.quantityChangeItem}
                    onClick={async () => await changeProductsQuantity(cart, [item], item.quantity! + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className={styles.cartItemRightColumnBottom}>
                <div>
                  {item?.discountedPrice?.value.centAmount ||
                    item.price.discounted?.value.centAmount ||
                    item.price.value.centAmount}
                  cent
                </div>
                <div>
                  {item.totalPrice.centAmount}
                  cent
                </div>
                <FaTrash onClick={async () => await changeProductsQuantity(cart, [item], 0)} />
              </div>
            </div>
          </div>
        );
      })}
      {cart?.totalPrice.centAmount !== 0 && (
        <div>
          <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
            <FormField
              stylesField={styles.loginFormField}
              stylesError={styles.loginFormError}
              stylesInput={styles.loginFormInput}
              isRequired={true}
              formik={formik}
              labelText="Promo code:"
              placeholder="Enter your code"
              id="promoCode"
              name="promoCode"
              type="text"
            ></FormField>
            <Button
              style={styles.loginFormBtn}
              title="Submit"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
            />
          </form>
          {cart?.discountCodes?.length && <div>remove promocode</div>}
          <div>Total price: {cart?.totalPrice.centAmount}</div>
          <Button
            style={styles.clearBasketBtn}
            onClick={async () => {
              await changeProductsQuantity(cart!, cart!.lineItems, 0);
            }}
            title="Clear basket"
            type="button"
          />
        </div>
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
      {msg && <ModalWindow message={msg} onClose={() => setMsg(() => '')} />}
    </div>
  );
};
