import React from 'react'
import Navbar from './Navbar'
import categoryImage from "../images/courses_banner.png";
import Footer from './Footer';
import ScrollToTop from './Scroll_to_top';

const Courses = () => {

    const courses = [
        {
            title:"Algo Trading Course: Learn Option Buying & Selling",
            desc:"Institutions use Algo-Trading to trade quickly and efficiently. With AlgoTest, it is possible for you, a retail trader, to do the same. Learn our tried and tested process for Algo-Trading!",
            duration:"8-10 Weeks",
            remember:"Trading is business, not gambling",
            username:"Chintan Jaggi",
            credits:"0",
            course:"Professional Algo Trading Course",
            img:"https://algotest.in/course/course-raghav.png"
        },
        {
            title:"Volatility Trading Course: Trade Options the Institutional Way",
            desc:"Institutions use Algo-Trading to trade quickly and efficiently. With AlgoTest, it is possible for you, a retail trader, to do the same. Learn our tried and tested process for Algo-Trading!",
            duration:"8-10 Weeks",
            remember:"Volatility Trading Course: Trade Options the Institutional Way",
            username:"Raghav Malik",
            credits:"0",
            course:"Professional Algo Trading Course",
            img:"https://algotest.in/course/course-raghav.png"
        }
    ]

  return (
    <div>
       <Navbar color={'white'}/>
        <div className='inter main-div animate__animated animate__fadeIn'>
            <div className='w-100 d-flex align-items-center justify-content-center' style={{height:'90vh',backgroundImage:`url(${categoryImage})`,backgroundPosition:'center',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPositionY:'-150px'}}>
                <div className="container mx-auto text-center w-75 mt-5">
                    <h1 className='fw-bold' style={{fontSize:'66px'}}>Build Powerful Algo Strategies Without Learning to Code</h1>
                    <p className='fs-4 mt-4 text-secondary'>Just a simple, guided way to build and test powerful trading strategies.</p>
                    <img src="https://algotest.in/course/founders.png" width={440} alt="" />
                </div>
            </div>

            <div className='py-5'>
                <h3 className='text-center fw-bold'>Explore Our Courses</h3>

                <div className="row container-fluid m-0 mt-5">
                    {courses?.map((course)=>(
                        <div className="col-lg-6">
                            <div className='rounded shadow-sm'>
                                <img src={course.img} style={{width:'100%',objectFit:'cover',height:'380px',borderRadius:'5px 5px 0px 0px'}} alt="" />
                                <div className="p-3">
                                    <div className='d-flex align-items-center justify-content-between'>
                                    <p className='text-secondary' style={{fontSize:'13px'}}>Course : <span>{course.duration}</span></p>
                                    <p className='rounded p-2 py-1 rounded bg-success-subtle text-success' style={{fontSize:'13px'}}>Batch Starting Soon!</p>
                                    </div>
                                    <h2 className='fw-bold'>{course.title}</h2>
                                    <p>{course.desc}</p>
                                    <p className='text-warning'>Remember : {course.remember}</p>

                                    <div className='d-flex align-items-center justify-content-between'>
                                        <p style={{fontSize:'12px'}}><i>By {course.username}</i></p>
                                        <button className='btn btn-primary text-white px-3 py-2' style={{fontSize:'14px'}}>Buy Now
                                            <span className='ms-2'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></span>
                                        </button>
                                    </div>

                                    <div className='border-top mt-4 pt-4 d-flex align-items-center justify-content-between'>
                                        <p className=''>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
</svg>
                                            <span className='ms-2 font-ssm'>Exclusive Community</span>
                                        </p>
                                        <p className=''>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code" viewBox="0 0 16 16">
  <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8z"/>
</svg>
                                            <span className='ms-2 font-ssm'>{course.credits} Credits</span>
                                        </p>
                                        <p className=''>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg>
                                            <span className='ms-2 font-ssm'>Weekly Classes</span>
                                        </p>
                                        <p className=''>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mortarboard" viewBox="0 0 16 16">
  <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z"/>
  <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z"/>
</svg>
                                            <span className='ms-2 font-ssm'>{course.course}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='d-flex flex-column align-items-center justify-content-center mt-5' style={{background: "linear-gradient(180deg, #FFFFFF 0%, #EAF6FF 45%, #D6F4FF 100%)",height:'50vh'}}>
                    <p className='fw-bold fs-1 text-center mx-auto m-0' style={{lineHeight:'50px'}}>Join 45K+ <br />member community</p>
                    <button className='bg-primary bg-gradient py-2 px-5 mt-4 text-white btn'>Join Now</button>
                </div>
        </div>
        <Footer/>
        <ScrollToTop/>
    </div>
  )
}

export default Courses
