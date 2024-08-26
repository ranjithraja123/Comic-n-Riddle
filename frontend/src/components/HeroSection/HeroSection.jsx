import React from 'react'
import './heroSection.css'
import Monkey from '../../assets/images/des.png'
import Navbar from '../Navbar/Navbar'
const HeroSection = () => {
  return (
  <>
  <Navbar />
   <div className='container-flex mt-lg-4'>
        <div className='heroCont row d-flex  m-auto'>
        
            <div className='col-sm-12 col-lg-6 d-flex align-item-center justify-content-center'>
                <img src={Monkey} height={1} width={450} />
            </div>
            <div className='col-sm-12 col-lg-6 d-flex align-item-center justify-content-center'>
                <p className='text-justify text-dark mt-5'>Reading stories offers a range of fascinating benefits that go beyond entertainment. One particularly interesting fact is that engaging with fictional narratives can enhance empathy. When readers immerse themselves in the lives and emotions of characters, their brains simulate those experiences as if they were happening in real life. This process helps improve the reader's ability to understand and relate to others' feelings, even in the real world. Additionally, studies have shown that frequent readers of fiction tend to have better social cognition and a greater ability to navigate complex social situations.</p>
            </div>
           

        </div>
      
    </div>
  
  
  </>
   
  )
}

export default HeroSection
