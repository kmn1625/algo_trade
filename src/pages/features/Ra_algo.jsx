import React from 'react'
import Responsive from '../Slick'
import Circle_tick from '../../svgs/Circle_tick'
import Circle_cross from '../../svgs/Circle_cross'

const Ra_algo = () => {
  return (
   <>
   <style>
    {`
    td{
        padding:15px;
    }
    `}
   </style>

    <div className='main-div p-4'>
      <div className='d-flex flex-column align-items-center justify-content-center' style={{height:'85vh'}}>
        <p className='fs-2 fw-medium' style={{letterSpacing:'1px'}}>ACTIVATE AUTOMATE TRADE</p>
        <p style={{fontSize:'80px',lineHeight:'90px'}} className='w-75 text-center fw-medium'>Automate SEBI-Registered Research Analysts Algos</p>
        <div className='row m-0 w-100 justify-content-center my-3'>
            <div className="col-2 text-center">
                <p className='m-0 fs-4 fw-medium'>40M+</p>
                <p>Trades Executed</p>
            </div>
            <div className="col-2 text-center px-lg-0">
                <p className='m-0 fs-4 fw-medium'>10+</p>
                <p>SEBI Regd. Research Analysts</p>
            </div>
            <div className="col-2 text-center">
                <p className='m-0 fs-4 fw-medium'>35K+</p>
                <p>Active Users</p>
            </div>
        </div>

        <div className='w-100 mt-3 text-center'>
            <button className='btn text-white fs-5 w-25 py-3' style={{background:'#0782da'}}>Explore Algos For Free
                <span className='ms-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                  </svg></span>
            </button>
        </div>
      </div>

      {/* Carousel */}
      <div className='py-lg-5 py-3'>
        <Responsive/>
      </div>

      <div className='row m-0 container mx-auto py-5'>
        <h3 className='fw-medium text-center mb-4' style={{fontSize:'60px'}}>Why choose RA Algos?</h3>
        <div className="col-lg-6">
            <img src="https://cdn.prod.website-files.com/647867b4902aec7bad375ba9/682eec1d548944edde66a7b9_Frame%20427322888.png" style={{width:'100%'}} alt="" />

            <div className='text-center mt-4 px-lg-5'>
                <h2 className='fw-bold mb-3'>Tech You Can Trust</h2>
                <p className='fs-6'>Ultra-low-latency execution powered by a fully cloud-native infrastructure.</p>
                <p className='fs-6'>Built by ex-HFT engineers with expertise in high-speed, reliable trading systems.</p>
            </div>
        </div>
        <div className="col-lg-6">
            <img src="https://cdn.prod.website-files.com/647867b4902aec7bad375ba9/682eec1db9e02abf199d2d20_Frame%20427322909.png" style={{width:'100%'}} alt="" />

            <div className='text-center mt-4 px-lg-5'>
                <h2 className='fw-bold mb-3'>Customer Support</h2>
                <p className='fs-6'>We're here for you - connect with us anytime during market hours.</p>
                <p className='fs-6'>Reach out via call, chat, or our dedicated Telegram support channel.</p>
            </div>
        </div>
      </div>

      <div className='row m-0 container mx-auto py-5'>
        <h3 className='fw-medium text-center mb-3' style={{fontSize:'60px'}}>Follow a Systematic Trading Process</h3>
        <p className='text-center' style={{paddingBottom:'130px'}}>AlgoTest traders beat the odds, 45% turned profits last year. SEBI says the industry average? Just 9%.</p>
        <div className="col-lg-9 mx-auto position-relative pb-5" style={{height:'70vh',border:'3px dashed blue',borderRadius:'40px',marginBottom:'120px'}}>
            
            <div className='border rounded-lg p-3 pb-2 position-absolute' style={{background:'#fafdff',width:'360px',top:'-100px',left: '50%',transform: 'translateX(-50%)'}}>
                <p className='fs-5 fw-medium mb-1'>Explore Algos</p>
                <p className='text-secondary m-0'>Use pre-built algos provided by SEBI Registered Research Analysts.</p>
                <div className='text-end'>
                    <img src="https://cdn.prod.website-files.com/647867b4902aec7bad375ba9/682d287a3d7287710d6b9ae5_Frame%20427322893.png" width={200} alt="" />
                </div>
            </div>

            <div className='border rounded-lg p-3 pb-2 position-absolute' style={{background:'#fafdff',width:'360px',top:'50%',right:'-130px',transform: 'translateY(-50%)'}}>
                <p className='fs-5 fw-medium mb-1'>Explore Algos</p>
                <p className='text-secondary m-0'>Use pre-built algos provided by SEBI Registered Research Analysts.</p>
                <div className='text-end'>
                    <img src="https://cdn.prod.website-files.com/647867b4902aec7bad375ba9/682d287a3d7287710d6b9ae5_Frame%20427322893.png" width={200} alt="" />
                </div>
            </div>

            <div className='border rounded-lg p-3 pb-2 position-absolute' style={{background:'#fafdff',width:'360px',top:'50%',left: '-130px',transform: 'translateY(-50%)'}}>
                <p className='fs-5 fw-medium mb-1'>Explore Algos</p>
                <p className='text-secondary m-0'>Use pre-built algos provided by SEBI Registered Research Analysts.</p>
                <div className='text-end'>
                    <img src="https://cdn.prod.website-files.com/647867b4902aec7bad375ba9/682d287a3d7287710d6b9ae5_Frame%20427322893.png" width={200} alt="" />
                </div>
            </div>

            <div className='border rounded-lg p-3 pb-2 position-absolute' style={{background:'#fafdff',width:'360px',bottom:'-100px',right: '60px'}}>
                <p className='fs-5 fw-medium mb-1'>Explore Algos</p>
                <p className='text-secondary m-0'>Use pre-built algos provided by SEBI Registered Research Analysts.</p>
                <div className='text-end'>
                    <img src="https://cdn.prod.website-files.com/647867b4902aec7bad375ba9/682d287a3d7287710d6b9ae5_Frame%20427322893.png" width={200} alt="" />
                </div>
            </div>

            <div className='border rounded-lg p-3 pb-2 position-absolute' style={{background:'#fafdff',width:'360px',bottom:'-100px',left: '60px'}}>
                <p className='fs-5 fw-medium mb-1'>Explore Algos</p>
                <p className='text-secondary m-0'>Use pre-built algos provided by SEBI Registered Research Analysts.</p>
                <div className='text-end'>
                    <img src="https://cdn.prod.website-files.com/647867b4902aec7bad375ba9/682d287a3d7287710d6b9ae5_Frame%20427322893.png" width={200} alt="" />
                </div>
            </div>
        </div>
      </div>

      <div className='pb-5'>
        <p className='text-center fw-medium mb-2' style={{fontSize:'60px'}}>Choose Wisely</p>
        <p className='text-center fs-5'>Do not take risks with your money</p>

        <div className="table-responsive container mx-auto mt-5">
            <table className='table-bordered w-100 rounded' cellSpacing={200}>
                <thead>
                    <tr>
                        <td>Factors</td>
                        <td>AlgoTest</td>
                        <td>Univest</td>
                        <td>Stratzy</td>
                        <td>Brokers</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>SEBI RA Algo Marketplace</td>
                        <td><Circle_tick/></td>
                        <td><Circle_cross/></td>
                        <td><Circle_cross/></td>
                        <td><Circle_cross/></td>
                    </tr>
                     <tr>
                        <td>Fully Automated Setups</td>
                        <td><Circle_tick/></td>
                        <td><Circle_cross/></td>
                        <td><Circle_tick/></td>
                        <td><Circle_cross/></td>
                    </tr>
                     <tr>
                        <td>Forward Test Mode</td>
                        <td><Circle_tick/></td>
                        <td><Circle_cross/></td>
                        <td><Circle_cross/></td>
                        <td><Circle_cross/></td>
                    </tr>
                     <tr>
                        <td>Available Brokers</td>
                        <td>40+</td>
                        <td>1</td>
                        <td>19</td>
                        <td>1</td>
                    </tr>
                     <tr>
                        <td>Real Time Customer Support</td>
                        <td><Circle_tick/></td>
                        <td><Circle_cross/></td>
                        <td><Circle_tick/></td>
                        <td><Circle_tick/></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
   </>
  )
}

export default Ra_algo
