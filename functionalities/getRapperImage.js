import React from 'react'
import AndrewTate from '../public/RapperImages/Andrew Tate.jpg'
import BarackObama from '../public/RapperImages/Barack Obama A.jpg'
import BenShapiro from '../public/RapperImages/Ben Shapiro.jpg'
import CardiB from '../public/RapperImages/Cardi B.jpg'
import Eminem from '../public/RapperImages/Eminem.jpg'
import JoeBiden from '../public/RapperImages/Joe Biden A.jpg'
import KanyeWest from '../public/RapperImages/Kanye West.jpg'
import LeBronJames from '../public/RapperImages/LeBron James A.jpg'
import MarkZuckerberg from '../public/RapperImages/Mark Zuckerberg.jpeg'
import MorganFreeman from '../public/RapperImages/Morgan Freeman.jpg'
import MrKrabs from '../public/RapperImages/Mr Krabs.jpg'
import OptimusPrime from '../public/RapperImages/Optimus Prime.jpeg'
import SaddamHussein from '../public/RapperImages/Saddam Hussein A.jpg'
import Spongebob from '../public/RapperImages/Spongebob.jpg'
import ElonMusk from "../public/RapperImages/ElonMusk.png"
import TaylorSwift from '../public/RapperImages/Taylor Swift.jpg'
import Trump from '../public/RapperImages/Trump A.jpg'
import Drake from '../public/RapperImages/Drake.jpg'
import Squidward from '../public/RapperImages/Squidward.jpg'

export function getRapperImage(rapperName){
  
        let imageSrc = null;
      
        switch (rapperName) {
          case 'Donald Trump':
            imageSrc = Trump;
            break;
          case 'Optimus Prime':
            imageSrc = OptimusPrime;
            break;
          case 'Joseph Biden':
            imageSrc = JoeBiden;
            break;
          case 'Barack Obama':
            imageSrc = BarackObama;
            break;
          case 'Lebron James':
            imageSrc = LeBronJames;
            break;
          case 'Morgan Freeman':
            imageSrc = MorganFreeman;
            break;
          case 'Andrew Tate':
            imageSrc = AndrewTate;
            break;
          case 'Taylor Swift':
            imageSrc = TaylorSwift;
            break;
          case 'Kanye West':
            imageSrc = KanyeWest;
            break;
          case 'Drake':
            imageSrc = Drake;
            break;
          case 'Spongebob':
            imageSrc = Spongebob;
            break;
          case 'Squidward':
            imageSrc = Squidward;
            break;
          case 'Mr. Krabs':
            imageSrc = MrKrabs;
            break;
          case 'Eminem':
            imageSrc = Eminem;
            break;
          case 'Mark Zuckerberg':
            imageSrc = MarkZuckerberg;
            break;
          case 'Ben Shapiro':
            imageSrc = BenShapiro;
            break;
          case 'Cardi B':
            imageSrc = CardiB;
            break;
          case 'Elon Musk':
            imageSrc = ElonMusk;
            break;
          default:
            imageSrc = null;
            break;
        }
      
        return imageSrc;
  }
  
