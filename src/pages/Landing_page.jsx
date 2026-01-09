import React, { useState,useRef } from 'react'
import Navbar from './Navbar'
import html2canvas from "html2canvas";
import Footer from './Footer';
import ScrollToTop from './Scroll_to_top';


const Landing_page = () => {

    const pageRef = useRef();

  const handleDownloadImage = async () => {
    const element = pageRef.current;

    // Scroll height ensures full-page capture
    const canvas = await html2canvas(element, {
      scrollY: -window.scrollY,
      useCORS: true,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
    });

    const dataURL = canvas.toDataURL("image/png");

    // Create download link
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "page-capture.png";
    link.click();
  };

    const [categories,setCategories] = useState(['All Products','Algo Trading','Discretionary Trading','Indicator Algo Trading'])

    const cards = [
        {
            image:"https://algotest.in/landing/products/backtest.svg",
            title:"Backtest AI Powered",
            description:"Test your strategy on years of data with slippage and brokerage for realistic results.",
            slug:"backtest"
        },
        {
            image:"https://algotest.in/landing/products/backtest.svg",
            title:"Backtest AI Powered",
            description:"Test your strategy on years of data with slippage and brokerage for realistic results.",
            slug:"backtest"
        },
        {
            image:"https://algotest.in/landing/products/backtest.svg",
            title:"Backtest AI Powered",
            description:"Test your strategy on years of data with slippage and brokerage for realistic results.",
            slug:"backtest"
        },
        {
            image:"https://algotest.in/landing/products/backtest.svg",
            title:"Backtest AI Powered",
            description:"Test your strategy on years of data with slippage and brokerage for realistic results.",
            slug:"backtest"
        },
    ]

    const traders_list = [
        {
            description: `<p style="font-size:12px;color:gray;line-height:24px">AlgoTest is, hands down, the best algo trading platform in India today. Initially considered calling it "one of the best," but my experience has convinced me otherwise
<span style="color:#4077f5;" class="fs-5">— it's simply the best</span>
If one is looking for a platform that truly understands how option trader trades, AlgoTest is the one. Separating signal from strategy is a design beauty.</p>`,
            name:"Dhiraj Sinha",
            role:"Founder and Managing Partner - Quantum Wealth Management LLP"
        },
        {
            description: `<p style="font-size:12px;color:gray;line-height:24px">AlgoTest is, hands down, the best algo trading platform in India today. Initially considered calling it "one of the best," but my experience has convinced me otherwise
<span style="color:#4077f5;" class="fs-5">— it's simply the best</span>
If one is looking for a platform that truly understands how option trader trades, AlgoTest is the one. Separating signal from strategy is a design beauty.</p>`,
            name:"Dhiraj Sinha",
            role:"Founder and Managing Partner - Quantum Wealth Management LLP"
        },
        {
            description: `<p style="font-size:12px;color:gray;line-height:24px">I've been collaborating with Raghav Malik for a while now, and I genuinely believe that for any serious trader or investor, automation has become essential.
The days of manually punching in orders are long behind us. As a systematic/quant-based research analyst,
I find AlgoTest to be one of the
<span style="color:#4077f5;" class="fs-5">most robust and versatile platforms available in the market.</span>
</p>`,
            name:"Sandeep Rao",
            role:"SEBI Registered Research Analyst"
        },
        {
            description: `<p style="font-size:12px;color:gray;line-height:24px">AlgoTest is, hands down, the best algo trading platform in India today. Initially considered calling it "one of the best," but my experience has convinced me otherwise
<span style="color:#4077f5;" class="fs-5">— it's simply the best</span>
If one is looking for a platform that truly understands how option trader trades, AlgoTest is the one. Separating signal from strategy is a design beauty.</p>`,
            name:"Dhiraj Sinha",
            role:"Founder and Managing Partner - Quantum Wealth Management LLP"
        },
        {
            description: `<p style="font-size:12px;color:gray;line-height:24px">AlgoTest is, hands down, the best algo trading platform in India today. Initially considered calling it "one of the best," but my experience has convinced me otherwise
<span style="color:#4077f5;" class="fs-5">— it's simply the best</span>
If one is looking for a platform that truly understands how option trader trades, AlgoTest is the one. Separating signal from strategy is a design beauty.</p>`,
            name:"Dhiraj Sinha",
            role:"Founder and Managing Partner - Quantum Wealth Management LLP"
        },
        {
            description: `<p style="font-size:12px;color:gray;line-height:24px">AlgoTest is, hands down, the best algo trading platform in India today. Initially considered calling it "one of the best," but my experience has convinced me otherwise
<span style="color:#4077f5;" class="fs-5">— it's simply the best</span>
If one is looking for a platform that truly understands how option trader trades, AlgoTest is the one. Separating signal from strategy is a design beauty.</p>`,
            name:"Dhiraj Sinha",
            role:"Founder and Managing Partner - Quantum Wealth Management LLP"
        },
    ]

    const faqData = [
  {
    id: 1,
    question: "What is Algo Trading or Algorithmic Trading?",
    answer: `Algo trading, or algorithmic trading, is a form of systematic trading where you create pre-defined rules for entries, exits, and risk management and code them so a computer can execute trades automatically on your behalf.

It removes emotions from trading and ensures speed, consistency, and discipline in execution.

Algorithmic trading follows a 5-step framework:
1. Ideation – Define your idea.
2. Backtesting – Test with historical data.
3. Optimization – Fine-tune parameters.
4. Forward Testing – Try in live market conditions.
5. Automation – Deploy and trade automatically.`
  },
  {
    id: 2,
    question: "Why is Algorithmic Trading Popular?",
    answer: `Algorithmic trading is popular because it reduces emotional bias, increases execution speed, allows backtesting, and provides consistent performance compared to manual trading.`
  },
  {
    id: 3,
    question: "Do I need coding knowledge for Algo Trading?",
    answer: `Basic coding helps, but many platforms offer no-code tools where you can build strategies visually. However, coding gives more flexibility and customization.`
  },
  {
    id: 4,
    question: "Is Algo Trading legal in India?",
    answer: `Yes, algo trading is 100% legal in India. It is regulated by SEBI. You must follow broker API rules and ensure your strategy complies with market regulations.`
  },
  {
    id: 5,
    question: "How much capital is required for Algo Trading?",
    answer: `There is no fixed minimum capital. You can start even with ₹5,000–₹10,000 depending on the strategy and broker margin requirements.`
  }
];


  return (
    <div ref={pageRef} id="capture-area">
        <Navbar color={'white'}/>
        <div className='inter main-div'>
        {/* Banner 1 */}
        <div className='d-flex align-items-center ' style={{height:'100vh',background:'#fdfdff'}}>
            <div className='container text-center inter' style={{width:'80%'}}>
        <p className='landing_page_banner_text' style={{lineHeight:'100px'}}>Doing well in Options Trading means 
<span className='' style={{color:'#0085ff'}}> Algo Trading.</span></p>

         <p className='fs-2'>Do it all on AlgoTest. 50+ Brokers Integrated.</p>

         <button onClick={handleDownloadImage} className='border-0 text-white rounded-pill py-4 w-25 mt-5' style={{background:'#0085ff'}}>
            Get 25 Free Backtests
            <span className='ms-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg>
            </span>
         </button>
      </div>
        </div>

        {/* Banner 2 */}
        <div className="row p-3 m-0 justify-content-between text-center border" style={{background:'#d9edff'}}>
            <div className="col-lg-2">
                <p className='mb-2'>Backed by</p>
                <p className='fs-5 m-0' style={{color:'#ff5a00'}}>Y Combinator</p>
            </div>
            <div className="col-lg-2">
                <p className='m-0 fs-3'>40M+</p>
                <p className='m-0'>Backtests done</p>
            </div>
            <div className="col-lg-2">
                <p className='m-0 fs-3'>39M+</p>
                <p className='m-0'>Trades taken</p>
            </div>
            <div className="col-lg-2">
                <p className='m-0 fs-3'>30,000+</p>
                <p className='m-0'>Traders</p>
            </div>
            <div className="col-lg-2">
                <p className='m-0 fs-3'>35,000+</p>
                <p className='m-0'>Community Members</p>
            </div>
        </div>

        {/* Banner 3 */}
        <div className='' style={{background:'#f7fafc'}}>
            <div className="container p-md-5">
                <p className='mb-3' style={{fontSize:'60px'}}>Your complete toolkit</p>
                <div className='d-flex align-items-center'>
                    {categories?.map((x)=>(
                        <p className='rounded-pill border px-4 py-3 me-3 bg-white m-0'>
                            {x}
                        </p>
                    ))}
                </div>

                <div className='row m-0 mt-5'>
                    {cards?.map((data,index)=>{
                        return(
                            <div className='col-lg-6 mb-5'>
                                <div className='rounded rounded' data-aos="fade-up">
                                    <img src={data.image} style={{width:'100%'}} alt="" />
                                    <div className='bg-white shadow-sm px-3 py-2' style={{borderRadius:'10px 10px 5px 5px'}}>
                                        <p className='m-0 fs-4'>{data.title}</p>
                                        <p>{data.description}</p>
                                        <button className='border-0 text-white bg-primary rounded-pill px-4 py-2 font-sm mb-4'>Learn More 
                                            <span className='ms-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" fill="currentColor" class="bi bi-arrow-up-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/>
</svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

        {/* Banner 4 */}
        <div style={{background:'#1a1a1a'}} className='p-5 text-white'>
            <div className="container mx-auto">
                <p style={{fontSize:'60px'}} className='m-0'>The AlgoTest Advantage</p>
            <p>Features which make AlgoTest the best place for all your trading.</p>

            <div className='row m-0 mt-5'>
                <div className="col-lg-6 mb-4">
                    <span style={{color:'#92e3fc'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"/>
</svg>
                    </span>
                    <p className='fs-3 m-0 mt-2'>Simple, Fast, & Free Templates
you can use everyday</p>
                    <p>Get started with just a click.</p>
                </div>
                <div className="col-lg-6 mb-4">

                </div>

                <div className="col-lg-6 mb-5">
                    <span style={{color:'#92e3fc'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-lightning-charge" viewBox="0 0 16 16">
  <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z"/>
</svg>
                    </span>
                    <p className='fs-3 m-0 mt-2'>Super fast Backtesting speeds,
for FREE</p>
                    <p>Backtest on over 5 years of historical data. Super Fast.</p>
                </div>
                <div className="col-lg-6 mb-5">

                </div>

                <div className="col-lg-6 mb-4">
                    <span style={{color:'#92e3fc'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
  <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
</svg>
                    </span>
                    <p className='fs-3 m-0 mt-2'>Seamless execution of strategies
with a single click</p>
                    <p>Save your strategies for simple and fast execution.</p>
                </div>
                <div className="col-lg-6 mb-4">

                </div>
            </div>
            </div>
        </div>

        {/* Banner 5 */}
        <div style={{background:'#f7fafc'}}>
            <div className="container p-5">
                <p className='text-center' style={{fontSize:'65px'}}>Retail Traders ❤️ AlgoTest</p>

                <div className="row">
                    {traders_list?.map((data,indes)=>{
                        return(
                            <div className="col-lg-4">
                                <div className='bg-white rounded mb-4 shadow-sm p-3 d-flex flex-column justify-content-between' style={{height:'280px',overflowY:'auto'}}>
                                    <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                                    <div className='d-flex align-items-center'>
                                        <span className='rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center' style={{height:'50px',width:'50px'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
                                        </span>
                                        <div className='ms-2'>
                                            <h6 className="m-0">{data.name}</h6>
          <p className="text-muted m-0" style={{fontSize:'11px'}}>{data.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

        {/* Banner 6 */}
        <div className='container row m-0 py-5 mx-auto my-4'>
            <div className="col-lg-6">
                <h2>Got a question? We’re here to help.</h2>
                <p className='text-secondary'>Everything you need to know about algo trading, strategy and live execution.</p>
                <p className='cursor' style={{color:'#1886da'}}>View All
                    <span className='ms-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></span>
                </p>
            </div>
            <div className="col-lg-6">
                 <div className="accordion accordion-flush shadow-none" id="accordionFlushExample">
      {faqData.map((item, index) => (
        <div className="accordion-item shadow-none py-2" key={item.id}>
          <h2 className="accordion-header shadow-none">
            <button
              className="accordion-button collapsed bg-transparent shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#flush-collapse${item.id}`}
              aria-expanded="false"
              aria-controls={`flush-collapse${item.id}`}
            >
              {item.question}
            </button>
          </h2>

          <div
            id={`flush-collapse${item.id}`}
            className="accordion-collapse collapse shadow-none"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body" style={{ whiteSpace: "pre-line" }}>
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
            </div>
        </div>

        {/* Banner 7 */}
        <div className='p-5' style={{background: "linear-gradient(90deg, #8ecbff 0%, #2e9eff 50%, #0084ff 100%)",}}>
            <div className='row m-0 justify-content-center container mx-auto align-items-center py-4'>
                 <div className='col-lg-6'>
                <p className='m-0' style={{fontSize:'66px'}}>Take the next step.</p>
                <p className='m-0'>Analyse • Backtest • Simulate • Forward Test • Trade</p>
            </div>
            <div className="col-lg-5 text-end">
                <button className='border-0 text-white rounded-pill py-4 w-75 mt-5' style={{background:'#000'}}>
            Get Started For Free
            <span className='ms-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg>
            </span>
         </button>
            </div>
            </div>
        </div>
    </div>
    <Footer/>
    <ScrollToTop/>
    </div>
  ) 
}

export default Landing_page
