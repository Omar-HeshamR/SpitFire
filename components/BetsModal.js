import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import { useStateContext } from '../context/StateContext';
import { FaEthereum } from 'react-icons/fa';
import { RiWallet3Line } from 'react-icons/ri';
import Image from 'next/image';
import SpitFireLogo from '../public/SpitFireLogo.png'

const BetsModal = ({ showModal, setShowModal, PostObject }) => {

  const { currentUser } = useStateContext();
  const [accounts, setAccounts] = useState([]);

  async function handleBetting(){
    setShowModal(false)
  }

  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [selectedToggle, setSelectedToggle] = useState(null);
  const handleToggleClick = (toggleId) => {
    setSelectedToggle(toggleId);
  };

  const modalRef = useRef();  

 async function connectAccount() {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccounts(accounts);
        toast.success(`Connected to ${accounts[0].substring(0,6)}...${accounts[0].substr(-5)}`);   
    }else{
      toast.error("Please download a wallet provider");
    }
}

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
                Enter A Voting Pool
                <Image src={SpitFireLogo} alt="SpitFire Logo"/>
              </MainTitle>
            
            {accounts[0] ? <>
            <WalletIdentifierRow>
                Current Wallet: <Row>{accounts[0].substring(0,6)}...{accounts[0].substr(-5)}<Wallet2Icon /></Row>
            </WalletIdentifierRow> 
            <PostDetailsContainer>
                <PostID>Battle ID: <div>{PostObject.postId.substring(0,6)}...{PostObject.postId.substr(-6)}</div></PostID> 
                <Creator>Creator: <div>{PostObject.creator}</div></Creator>
                

                <Row>
                Enter Amount:
                <InputContainer>
                    <InputIcon />
                    <InputField
                        type="number"
                        placeholder="Enter amount"
                        value={value}
                        onChange={handleChange}
                    />
                    </InputContainer>
                </Row>
                
                <ToggleContainer>
                    <ToggleButton
                        isSelected={selectedToggle === 'rapper1'}
                        onClick={() => handleToggleClick('rapper1')}
                    >
                        {PostObject.rapper1_name}
                    </ToggleButton>
                    <ToggleButton
                        isSelected={selectedToggle === 'rapper2'}
                        onClick={() => handleToggleClick('rapper2')}
                    >
                        {PostObject.rapper2_name}
                    </ToggleButton>
                </ToggleContainer>

                <BetToVotePoolButton onClick={handleBetting}>Add Vote to Bet Pool</BetToVotePoolButton>
            </PostDetailsContainer>
            </> :
              <ConnectWalletButton onClick={connectAccount}>
                <FaEthereum />
                    Connect Wallet
                <Wallet1Icon />
              </ConnectWalletButton> }

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

const ConnectWalletButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #ff5c5c;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #d15050;
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.8);
  }

  svg {
    margin-right: 0.5vw;
    margin-left: 0.5vw;
  }
`;

const Wallet1Icon = styled(RiWallet3Line)`
  font-size: 1.5vw;
`

const Wallet2Icon = styled(RiWallet3Line)`
  margin-left: 0.5vw;
  font-size: 1.5vw;
`

const WalletIdentifierRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.25vw;
  margin-bottom: 0.75vw;
  width: 80%;
`

const PostDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #FE5F55;
    width: 80%;
`

const PostID = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5vw;
  margin-bottom: 0.75vw;
  `

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5vw;
`

const Creator = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.5vw;
    margin-bottom: 0.75vw;
`

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 0.25vw;
  width: 10.5vw;
`;

const InputIcon = styled(FaEthereum)`
  color: #ccc;
  font-size: 1.5rem;
  margin-right: 5px;
`;

const InputField = styled.input`
  width: 50%;
  border: none;
  flex: 1;
  font-size: 1vw;
  outline: none;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75vw;
`;

const ToggleButton = styled.button`
  width:100%;
  padding: 1vw 2vw;
  background-color: ${(props) =>
    props.isSelected ? '#FE5F55' : '#f5f5f5'};
  border: none;
  border-radius: 0.25vw;
  cursor: pointer;
  opacity: ${(props) =>
    props.isSelected ? '1' : '0.5'};
`;

const BetToVotePoolButton = styled.button` 
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

export default BetsModal