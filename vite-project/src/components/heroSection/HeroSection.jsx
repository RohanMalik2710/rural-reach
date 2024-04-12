import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/cart.json';

function HeroSection() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
  
    const timeout = setTimeout(() => {
      setShowAnimation(false);
    }, 2500);

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []); // Run this effect only once when the component mounts

  return (
    <div>
      {showAnimation && (
        <div>
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '86vh'}}
          />
        </div>  
      )}
      <img src="https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg" alt="" />
    </div>
  );
}

export default HeroSection;
