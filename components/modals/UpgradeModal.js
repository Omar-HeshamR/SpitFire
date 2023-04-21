import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { MdWorkspacePremium } from "react-icons/md"
import { upgradeUserToPremium } from "@/functionalities/userFunctions"
import { MdClose } from 'react-icons/md';
import { useStateContext } from '../../context/StateContext';
import Image from 'next/image';
import SpitFireLogo from '../../public/SpitFireLogo.png'
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const UpgradeModal = ({ showModal, setShowModal }) => {

  const [ goneThroughStripe, setGoneThroughStripe ] = useState(false)
  const { currentUser } = useStateContext();

  async function handleUpgrade(){
    const res = await fetch('/api/checkout_sessions', {
      method: 'POST',
    });    
    console.log(res)
  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success') && goneThroughStripe && currentUser) {
        const asyncfunc = async () =>{
          await upgradeUserToPremium(currentUser.displayName)
          }
        asyncfunc()
      console.log('Order placed!');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when youre ready.');
    }
  }, []);


  // Modal Actions

  const modalRef = useRef();  

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );
  
  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
    { showModal ? (
      <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>

            <ModalContent>
                
              <MainTitle> 
                <Image src={SpitFireLogo} alt="SpitFire Logo"/>
                Premium Plan
                <Image src={SpitFireLogo} alt="SpitFire Logo"/>
              </MainTitle>

              <RowWrapper>
                <PlanInfoContainer>
                    <PlanOfferingBulletPoint>☛ <u>Unlimited</u> posts</PlanOfferingBulletPoint>
                    <PlanOfferingBulletPoint>☛ Exclusive access to special rappers</PlanOfferingBulletPoint>
                    <PlanOfferingBulletPoint>☛ Early access to new features</PlanOfferingBulletPoint>
                    <PlanPriceBulletPoint>Only $4.99 for a whole month</PlanPriceBulletPoint>
                </PlanInfoContainer>
                <PremiumIcon />
              </RowWrapper>

              {/* <UpgradeButton onClick={handleUpgrade}>Upgrade {">>"}</UpgradeButton> */}

              <form style={{ width: "100%" }} action="/api/checkout_sessions" method="POST">
                <UpgradeButton onClick={handleUpgrade} type="submit" role="link">Upgrade {">>"}</UpgradeButton>
              </form>

            </ModalContent>

            <CloseModalButton
              aria-label='Close modal'
              onClick={() => setShowModal(prev => !prev)}
            />
          </ModalWrapper>
      </Background>
    ) : <></>}
  </>
  )
}

const Background = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:10;
`;

const ModalWrapper = styled.div` //edited
  // width: 100%;
  // height: 75%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  // background: #fff;
  background: linear-gradient(to bottom, #FFFFFF, #B5B8CF);
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  @media (max-width: 480px){
    width: 60vw;
}
`;

const ModalContent = styled.div`
  margin: 4vw 2vw;
  width: 40vw;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: 1.25;
  color: #141414;
  p {
    margin-bottom: 0rem;
    font-size: ${props => props.theme.fontlg};
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 1vw;
  right: 1.5vw;
  width: 2vw;
  height: 2vw;
  padding: 0;
  z-index: 10;
`;

const MainTitle = styled.div` // edited
font-size: 2.75vw;
margin-top: 1vw;
margin-bottom: 1vw;
justify-content: space-between;
align-items: center;
width: 90%;
display: flex;
font-weight: 900;
@media (max-width: 480px){
  font-size: 4.75vw;
}
img{

  width: 2vw;
  height: 2vw;
}
`

const PlanInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 10vw;
  width: 75%;
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

const PlanOfferingBulletPoint = styled.div`
  font-size: 1.75vw;
  color: #FE5F55;
`

const PlanPriceBulletPoint = styled.div`
  font-size: 1.5vw;
  color: #5B618A;
`

const PremiumIcon = styled(MdWorkspacePremium)`
  font-size: 10vw;
  color: #FE5F55;
  transition: all 2s ease-in-out;
  opacity: 0.9;
  &:hover{
    opacity: 1;
    transform: scale(1.1);
    cursor: pointer;
  }
`

const UpgradeButton = styled.button` 
width: 100%;
display: inline-block;
cursor: pointer;
margin-top: 1.5vw;
background-color: #FE5F55;
color: white;
font-weight: 600;
font-size: 2vw;
height: 4vw;
transition: all 0.5s ease;
border: 0;
border-radius: 0.5vw;
filter: opacity(0.8);
&:hover{
  filter: opacity(1);
  transform: scale(0.975);
  transition: ease 1s;
}
`

export default UpgradeModal