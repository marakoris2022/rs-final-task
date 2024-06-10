import styles from './basket.module.scss';
import { useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useCartStore } from '../../store/useCartStore';
import { addDiscountCode, changeProductsQuantity, removeDiscountCode } from '../../api/commerce-tools-api-cart';
import { Loading } from '../../components/loading/Loading';
import { Button } from '../../components/button/Button';
import { useFormik } from 'formik';
import { FormValues } from '../../interfaces/interfaces';
import { useEffect, useState } from 'react';
import { FormField } from '../../components/form-field/FormField';
import { ModalWindow } from '../../components/modal/ModalWindow';

const validate = (values: FormValues) => {
  const errors: FormValues = {};

  if (!values.promoCode) {
    errors.firstName = 'Required';
  }

  return errors;
};

enum MinMaxNumberOfItems {
  MIN_ITEMS = 1,
  MAX_ITEM = 199,
}

enum DiscountCodesId {
  TO_ALL_10 = '1b3a6505-abbb-4047-93ea-f6f79ab274b1',
  TO_RACING_50 = 'd05d4292-bfdc-4191-bed4-ae62f2357698',
}

enum DiscountCodesName {
  rsteam10off = 'rsteam10off',
  racing50off = 'racing50off',
}

export const Basket = () => {
  const cart = useCartStore((state) => state.cart);
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    if (cart?.lineItems) {
      const total = cart.lineItems.reduce((acc, item) => {
        const itemTotal = item?.price?.discounted?.value.centAmount
          ? item.price.discounted.value.centAmount * item.quantity
          : item.price.value.centAmount * item.quantity;
        return acc + itemTotal;
      }, 0);
      setTotalSum(total);
    }
  }, [cart]);

  const formik = useFormik({
    initialValues: {
      promoCode: '',
    },
    validate,
    onSubmit: async function (values) {
      try {
        let msg: string;

        if (cart?.discountCodes?.length) {
          const updatedCart = await addDiscountCode(cart!, values.promoCode);

          if (updatedCart && updatedCart.discountCodes) {
            if (updatedCart.discountCodes.length === 1) {
              msg = 'This promo code have been already activated';
            } else if (updatedCart.discountCodes.length > 0) {
              await removeDiscountCode(updatedCart, updatedCart.discountCodes[0].discountCode.id);
              msg = 'Promo code activated';
            }
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
                    disabled={item.quantity === MinMaxNumberOfItems.MIN_ITEMS || formik.isSubmitting}
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
                        const clampedQuantity = Math.min(
                          Math.max(newQuantity!, MinMaxNumberOfItems.MIN_ITEMS),
                          MinMaxNumberOfItems.MAX_ITEM,
                        );
                        if (clampedQuantity !== item.quantity) {
                          await changeProductsQuantity(cart, [item], clampedQuantity);
                        }
                      }
                    }}
                  />

                  <button
                    className={styles.quantityChangeItem}
                    onClick={async () => await changeProductsQuantity(cart, [item], item.quantity! + 1)}
                    disabled={item!.quantity === MinMaxNumberOfItems.MAX_ITEM || formik.isSubmitting}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className={styles.cartItemRightColumnBottom}>
                <div
                  className={
                    item?.discountedPrice?.value.centAmount ? `${styles.priceDiscounted}` : `${styles.priceRegular}`
                  }
                >
                  {item?.price?.discounted?.value.centAmount ? (
                    <div className={styles.priceContainer}>
                      <div>
                        Per copy: <span>{item.price.discounted.value.centAmount / 100}$</span>
                      </div>
                      <div>
                        Total: <span>{(item.price.discounted.value.centAmount * item.quantity) / 100}$</span>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.priceContainer}>
                      <div>
                        Per copy: <span>{item.price.value.centAmount / 100}$</span>
                      </div>
                      <div>
                        Total: <span>{(item.price.value.centAmount * item.quantity) / 100}$</span>
                      </div>
                    </div>
                  )}
                </div>

                {item.discountedPrice?.value.centAmount && (
                  <div className={styles.priceContainer}>
                    <div>
                      Per copy: <span>{item.discountedPrice?.value.centAmount / 100}$</span>
                    </div>
                    <div>
                      Total: <span>{item.totalPrice.centAmount / 100}$</span>
                    </div>
                  </div>
                )}
              </div>
              <FaTrash
                className={styles.removeProduct}
                onClick={async () => await changeProductsQuantity(cart, [item], 0)}
              />
            </div>
          </div>
        );
      })}
      {cart?.totalPrice.centAmount !== 0 && (
        <div>
          <form className={styles.promoCodeForm} onSubmit={formik.handleSubmit}>
            <FormField
              stylesInput={styles.promoCodeInput}
              stylesInputWrapper={styles.labelInputContainer}
              formik={formik}
              labelText="Promo code:"
              placeholder="Enter your code"
              id="promoCode"
              name="promoCode"
              type="text"
            ></FormField>
            <div className={styles.promoCodeBtnsContainer}>
              <Button
                style={styles.promoCodeBtn}
                title="Apply code"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
              />
              {cart?.discountCodes?.length !== 0 && (
                <Button
                  style={styles.promoCodeBtn}
                  title="Remove code"
                  type="button"
                  onClick={async () => {
                    if (cart?.discountCodes) {
                      await removeDiscountCode(cart, cart.discountCodes[0].discountCode.id);
                    }
                  }}
                  disabled={formik.isSubmitting}
                ></Button>
              )}
            </div>
            <div className={styles.promoCodeNotice}>
              <span className={styles.promoCodeNoticeTitle}>Notice:</span> you can have only one active promo code
            </div>
            {cart?.discountCodes?.length !== 0 && (
              <div className={styles.promoCodeNotice}>
                <span className={styles.promoCodeNoticeTitle}>Promo applied: </span>
                <span className={styles.promoCodeNoticeCode}>
                  {cart?.discountCodes && cart?.discountCodes[0].discountCode.id === DiscountCodesId.TO_ALL_10
                    ? `${DiscountCodesName.rsteam10off}`
                    : `${DiscountCodesName.racing50off}`}
                </span>
              </div>
            )}
          </form>
          {cart?.totalPrice.centAmount !== totalSum && (
            <div className={styles.basketDiscountText}>
              Total price without discount: <span>{totalSum / 100}$</span>
            </div>
          )}

          <div
            className={
              cart?.totalPrice.centAmount === totalSum
                ? `${styles.basketTotalNoDiscount}`
                : `${styles.basketTotalDiscount}`
            }
          >
            Total price: <span>{cart?.totalPrice.centAmount / 100}$</span>
          </div>

          <Button
            style={styles.clearBasketBtn}
            onClick={async () => {
              await changeProductsQuantity(cart!, cart!.lineItems, 0);
            }}
            title="Clear basket"
            type="button"
            disabled={formik.isSubmitting}
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
