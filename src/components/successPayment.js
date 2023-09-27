import React, {useEffect} from 'react'
import log from 'loglevel'
import {Grid} from "@material-ui/core";
import {stateCodes} from './constants/stateCodes'
import {useDispatch, useSelector} from "react-redux";
import {BadRequest} from "../ui/error/badRequest";
import { DateTime } from 'luxon';
import {
    RESET_ADD_TO_CART, RESET_CART_TOTAL, RESET_DELIVERY_CHARGES,
    RESET_PAYMENT_RESPONSE, RESET_SHIPPING_ADDRESS, RESET_SHIPPING_OPTION, RESET_SHOPPING_BAG_PRODUCTS,
} from "../actions/types";
import {DocumentTitle} from "../ui/documentTitle";
import {GenericErrorMsg} from "../ui/error/GenericErrorMsg";
import {sendEmail} from "./util/APIUtils";

const resetStates = [RESET_ADD_TO_CART, RESET_CART_TOTAL, RESET_DELIVERY_CHARGES,
    RESET_PAYMENT_RESPONSE, RESET_SHIPPING_ADDRESS, RESET_SHIPPING_OPTION, RESET_SHOPPING_BAG_PRODUCTS]

export const SuccessPayment = () => {
    const dispatch = useDispatch()
    const shoppingBagProducts = useSelector(state => state.mainReducer.items)
    let cartTotal = useSelector(state => state.cartTotalReducer)
    const shippingAddressForm = useSelector(state => state.form.shippingAddressForm ?
        state.form.shippingAddressForm.values : null)
    const shippingOption = useSelector(state => state.shippingOptionReducer)
    const addToCart = useSelector(state => state.mainReducer.items)
    const deliveryCharges = useSelector(state => state.deliveryChargesReducer)
    const paymentResponse = useSelector(state => state.paymentResponseReducer)

    useEffect(() => {
        return () => {
            localStorage.setItem('items','[]');
            localStorage.setItem('totalPrice','0');
            log.info("[SuccessPayment] Component will unmount.")
            resetStates.forEach(resetState => {
                dispatch({
                    type: resetState
                })
            })
        }
        // eslint-disable-next-line
    }, [])

    const renderShippingAddress = () => {
        const dt = DateTime.local();
        const shoppedProducts = [];
        shoppingBagProducts.forEach(elem=>shoppedProducts.push(`<br>
                ${elem.name}<br>
                Количество: ${elem.qtty} X ${elem.price}р. = ${elem.price * elem.qtty}р.<br>
                <img src=${elem.imageURL}
                 alt=${elem.name} style="height: 100px; width: 80px"><br>`
        ))
        const emailToCustomer = {
            email: shippingAddressForm.email,
            subject: `Ваш заказ №${paymentResponse.order_id} от Ракурс цели успешно сформирован`,
            body: `Уважаемый(ая) ${shippingAddressForm.firstName} ${shippingAddressForm.lastName},<br><br>
                        <span>Благодарю за покупку в нашем магазине.<br>
                        Детали заказа:<br>
                        Адресс доставки: ${shippingAddressForm.addressLine1},<br>
                            ${shippingAddressForm.addressLine2 ? `${shippingAddressForm.addressLine2},<br>`: "<span></span>"}
                            ${shippingAddressForm.city},<br>
                            ${stateCodes()[shippingAddressForm.stateCode]} - ${shippingAddressForm.zipCode},<br>
            Тип доставки: ${shippingOption.deliveryType},<br>
            Mobile - ${shippingAddressForm.phoneNumber},<br>
            Comment to order - ${shippingAddressForm.commentToOrder}<br><br>
                        Сведения о приобретенных товарах:<br>
                         ${shoppedProducts}<br><br>
                        Оплата на сегодняшний день работает в тестовом режиме.<br>
                        Квитанция об оплате: ${paymentResponse.receipt_url}<br>
                        По любым указанным на сайте группы контактам Вы можете связаться со мной и оформить свой заказ лично.
                        </span> <br><br> С уважением, <br>Samson`,
            dateTime: dt.plus({minutes: 1}).toString().substring(0, 19),
            timeZone: dt.zone.name
        }
        sendEmail(emailToCustomer)
            .then((res) => {
                console.log(res.json());
            })
            .catch(() => {

            });

        const emailToSupplier = {
            email: 'samson.emelyanov@gmail.com',
            subject: `Заказ №${paymentResponse.order_id} от ${shippingAddressForm.firstName} ${shippingAddressForm.lastName} успешно сформирован`,
            body: `Сформирован заказ на покупку товаров,<br><br>
                        Сведения о покупателе:<br>
                          ФИО: ${shippingAddressForm.firstName} ${shippingAddressForm.lastName},<br>
           Адресс доставки: ${shippingAddressForm.addressLine1},<br>
                            ${shippingAddressForm.addressLine2 ? `${shippingAddressForm.addressLine2},<br>`: "<span></span>"}
                            ${shippingAddressForm.city},<br>
                            ${stateCodes()[shippingAddressForm.stateCode]} - ${shippingAddressForm.zipCode},<br>
            Тип доставки: ${shippingOption.deliveryType},<br>
            Mobile - ${shippingAddressForm.phoneNumber},<br>
            Email - ${shippingAddressForm.email},<br>
            Comment to order - ${shippingAddressForm.commentToOrder}<br><br>
                        Сведения о приобретенных товарах:<br>
                         ${shoppedProducts}<br>
                        Квитанция об оплате: ${paymentResponse.receipt_url}<br>
                        </span> <br><br> С уважением, <br>Samson`,
            dateTime: dt.plus({minutes: 1}).toString().substring(0, 19),
            timeZone: dt.zone.name
        }
        sendEmail(emailToSupplier)
            .then((res) => {
                console.log(res.json());
            })
            .catch(() => {

            });
        const shippingAddressAttributes = [
            `${shippingAddressForm.firstName} ${shippingAddressForm.lastName}`,
            shippingAddressForm.addressLine1, shippingAddressForm.addressLine2,
            `${shippingAddressForm.city},
            ${stateCodes()[shippingAddressForm.stateCode]} - ${shippingAddressForm.zipCode}`,
            `Mobile - ${shippingAddressForm.phoneNumber}`,
            `Email - ${shippingAddressForm.email}`,
            `Comment to order - ${shippingAddressForm.commentToOrder}`
        ]
        return shippingAddressAttributes.map((value) => {
            return (
                <Grid key={value} item>
                    {value}
                </Grid>
            )
        })
    }

    const renderShoppingProducts = () => {
        let products = []

        if (!shoppingBagProducts) {
            log.info(`[SuccessPayment] shoppingBagProducts.data is null`)
            return null
        }

        for (const [id, qty] of Object.entries(addToCart)) {
            let product = shoppingBagProducts[id]

            products.push(<Grid key={id} container spacing={2} style={{paddingTop: "2rem", color: "silver", marginLeft: "300px"}}>
                <Grid item>
                    <img src={product.imageURL}
                         alt={product.name} style={{height: 100, width: 80}}/>
                </Grid>

                <Grid item container xs={5} direction="column" style={{fontWeight: "bold"}}>
                    <Grid item>
                        {product.name}
                    </Grid>
                    <Grid item>
                        {`Количество: ${product.qtty} X ${product.price}р. = ${product.price * product.qtty}р.`}
                    </Grid>
                </Grid>
            </Grid>)
        }

        return products
    }

    log.info(`paymentResponse = ${JSON.stringify(paymentResponse)}`)
    if (paymentResponse.error) {
        // if user land on this page with an payment error
        // then we cannot proceed further...
        return <GenericErrorMsg/>
    }

    if (!shippingAddressForm) {
        return <BadRequest/>
    }

    if (!paymentResponse.hasOwnProperty("order_id")) {
        return null
    }

    log.info('[SuccessPayment] Rendering SuccessPayment Component')
    return (
        <Grid item xs={8} container spacing={2} style={{
            padding: "2rem", margin: "2rem", border: "1px solid black",
            fontSize: "1.2rem", color: "silver", marginLeft: "300px"
        }}>
        <>
            <DocumentTitle title="Payment Success"/>
            <Grid item xs={12}
                  style={{border: "1px solid #ff7000", padding: "2rem", fontSize: "2rem", fontWeight: "bold"}}>
                Payment Successful. Thank You For Shopping.
            </Grid>
            </>
            <Grid item xs={12} style={{marginTop: "2rem", fontWeight: "bold"}}>
                {`Your order is placed successfully. Your order id is ${paymentResponse.order_id}.`}
            </Grid>

            <Grid item container spacing={2}>
                <Grid item container justify="flex-end" xs={2}>
                    Receipt:
                </Grid>
                <Grid item container xs={8} direction="column" style={{fontWeight: "bold"}}>
                    <a href={paymentResponse.receipt_url} target="_blank" rel="noopener noreferrer">
                        Order-Receipt
                    </a>
                </Grid>
            </Grid>

            <Grid item container spacing={2}>
                <Grid item container justify="flex-end" xs={2}>
                    Delivery Address:
                </Grid>
                <Grid item container xs={8} direction="column" style={{fontWeight: "bold"}}>
                    {renderShippingAddress()}
                </Grid>
            </Grid>

            <Grid item container spacing={2}>
                <Grid item container justify="flex-end" xs={2}>
                    Payment Details:
                </Grid>
                <Grid item container xs={8} direction="column" style={{fontWeight: "bold"}}>
                    <Grid item>
                        {`Exp: ${paymentResponse.exp_month}/${paymentResponse.exp_year}`}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item container spacing={2}>
                <Grid item container justify="flex-end" xs={2}>
                    Paid Amount:
                </Grid>
                <Grid item style={{fontWeight: "bold"}}>
                    RUB{cartTotal + deliveryCharges}
                </Grid>
            </Grid>

            <Grid item container spacing={2}>
                <Grid item container justify="flex-end" xs={2}>
                    Delivery Details:
                </Grid>
                <Grid item container xs={8} direction="column" style={{fontWeight: "bold"}}>
                    <Grid item>
                        {shippingOption.deliveryType}
                    </Grid>
                    <Grid item>
                        {`Delivered between ${shippingOption.estimatedDate}`}
                    </Grid>
                </Grid>
            </Grid>

            {renderShoppingProducts()}
        </Grid>
    )
}
