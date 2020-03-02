import React from 'react'
import style from './style.module.scss'
import classnames from 'classnames'

const LogForm = () => {
    const [login, setLogin] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [address, setAddres] = React.useState('')
    const [paymentType, setPaymentType] = React.useState('card')
    const [isAgree, setIsAgree] = React.useState(false)

    const formData = [
        {key: 'login', type: 'text', value: login, text: 'Name', setValue: setLogin},
        {key: 'phone', type: 'number', value: phone, text: 'Phone', setValue: setPhone}
    ]

    const payment = [
        {key: 'cash', type: 'ratio', text: 'Cash', isChaked: paymentType === 'cash'},
        {key: 'card', type: 'ratio', text: 'Card', isChaked: paymentType === 'card'},
        {key: 'chekbook', text: 'Chekbook', isChaked: paymentType === 'chekbook'}
    ]

    const signInFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        const errors = [];
        if(login.trim().length === 0) errors.push('Please, enter Your name!');
        if(phone.trim().length === 0) errors.push('Please enter Your phone number!');
        if(address.trim().length === 0) errors.push('Please enter Your addres!');
        if(!isAgree) errors.push('Please agree to privacy policy!');

        if(errors.length > 0) {
            alert(errors.join(' '))
        } else {
            alert('Order was confirmed!')
            setLogin('')
            setPhone('')
            setAddres('')
            setIsAgree(false)
            setPaymentType('ca')
        }
        e.preventDefault();
    }

    return (
        <form onSubmit={signInFormSubmitHandler} className={style.FormContainer}>
            {formData.map(item => (
                <React.Fragment key={item.key}>
                    <label htmlFor={item.key}>{item.text}</label>
                    <input className={classnames(style.Input, {
                        [style.Name]: item.value === 'Serg' && item.key ==='login'})} id={item.key} value={item.value} type={item.type} onChange={e => item.setValue(e.target.value)} />
                </React.Fragment>
            ))}
            <textarea placeholder='Address' value={address} onChange={e => setAddres(e.target.value)}></textarea>
            <div className={style.RadioWrapper}>
            {payment.map(item => (
                <React.Fragment key={item.key}>
                    <label htmlFor={item.key}>
                        <input type='radio' id={item.key} checked={item.isChaked} onChange={e => setPaymentType(item.key)} /> {item.text}
                    </label>
                </React.Fragment>
            ))}
            </div>
            <label>
                <input type="checkbox" checked={isAgree} onChange={() => setIsAgree(!isAgree)} />
                Agree with the policy
            </label>
            <button type='submit'>Order</button>
        </form>
    )
}

export default React.memo(LogForm)