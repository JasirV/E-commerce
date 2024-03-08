import React from 'react';

const PaymentSuccess = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px' }}>
      <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.zeuxinnovation.com%2Farticles%2Fmaximising-user-satisfaction-the-psychology-behind-effective-payment-success-page-design%2F&psig=AOvVaw2cwxkc_8lQTV9RWSMd6QDQ&ust=1710010225740000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOiT0Naq5YQDFQAAAAAdAAAAABAD" alt="Success" style={{ width: '200px', height: 'auto', marginBottom: '20px' }} />
      <div style={{ textAlign: 'center' }}>
        <h1>Payment Successful</h1>
        <p>Thank you for your payment. Your order has been successfully processed.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
