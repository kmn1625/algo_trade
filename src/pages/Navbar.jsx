import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo_img from '../images/logo_symbol.png'

const Navbar = ({color}) => {
  const navigate = useNavigate()
  const [index1,setIndex1] = useState(-1) 
  const [index3,setIndex3] = useState(-1) 
  const [index2,setIndex2] = useState(-1) 

  const resources = [
    {
      icon:(<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
</svg>),
      title:"Courses",
      description:"Learn algo trading with step bu step lessons from industry experts.",
      slug:"courses"
    },
    {
      icon:(<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-journals" viewBox="0 0 16 16">
  <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2"/>
  <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0"/>
</svg>),
      title:"Blogs",
      description:"Discover algo trading tips, platform updates and market insights.",
      slug:"blogs"
    },
    {
      icon:(<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
</svg>),
      title:"Docs",
      description:"Get clear instruction on using the paltform, from setup to execution.",
      slug:""
    },
  ]

  const tools = [
    {
      title:"Margin Calculator",
      slug:""
    },
    {
      title:"Daily Trade Analysis",
      slug:""
    },
    {
      title:"Option Charts",
      slug:""
    },
    {
      title:"Heat Map",
      slug:""
    },
    {
      title:"Black Scholes",
      slug:""
    },
    {
      title:"Trade Variance Simulator",
      slug:""
    },
    {
      title:"Trade Path Simulator",
      slug:""
    },
    {
      title:"Bet Calculator",
      slug:""
    },
    {
      title:"Trade Edge Simulator",
      slug:""
    },
  ]

   const algotrading = [
    {
      icon:(<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
</svg>),
      title:"Backtest",
      description:"Backtest years of data in seconds with detailed reports.",
      slug:"backtest"
    },
    {
      icon:(<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-journals" viewBox="0 0 16 16">
  <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2"/>
  <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0"/>
</svg>),
      title:"Algo Trade",
      description:"Deploy algo strategies with one click with30+ brokers.",
      slug:"algo_trade"
    },
    {
      icon:(<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-fast-forward" viewBox="0 0 16 16">
  <path d="M6.804 8 1 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
  <path d="M14.804 8 9 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
</svg>),
      title:"Forward Test",
      description:"Trade strategies virtually without rsiking capital.",
      slug:"forward_test"
    },
    {
      icon:(<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-patch-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
</svg>),
      title:"RA Algos",
      description:"Automated professionally crafted algos by SEBI-registered research analytics.",
      slug:"ra_Algos"
    },
  ]

  const descretionary = [
    {
      icon:(<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
</svg>),
      title:"Strategy Builder",
      description:"Build, analyzde and trade directly from the Option Chain.",
      slug:""
    },
    {
      icon:(<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
</svg>),
      title:"Simulator",
      description:"Simulate your options trading idea with historical data.",
      slug:""
    }
  ]

   const indiactor_algo = [
    {
      icon:(<i class="fa-solid fa-money-bill-trend-up"></i>),
      title:"TradingView Signals",
      description:"Automate TradingView indicators, strategies & pinescripts.",
      slug:"signal"
    },
    {
      icon:(<i class="fa-solid fa-chart-simple"></i>),
      title:"Chartink Signals",
      description:"Automate your Chartink screeners to take trades.",
      slug:"signal"
    },
    {
      icon:(<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
</svg>),
      title:"GoCharting Signals",
      description:"Automate your GoCharting screeners to take trades.",
      slug:"gocharting"
    },
    {
      icon:(<i class="fa-solid fa-scroll"></i>),
      title:"Custom Script",
      description:"Automated your custom trading scripts thorugh Python, C++ & more.",
      slug:"signal"
    },
  ]

  return (
    <>
    <style>
      {`
      .active_div{
      background:rgb(0,133,255,0.1);
      color:rgb(0,133,255);
      }
      .active_icon{
      color:rgb(0,133,255);
      border:1px solid rgb(0,133,255);
      }
      .active_color{
      color:rgb(0,133,255);
      }
      `}
    </style>
    <div style={{height:'65px',position:'fixed',top:0,zIndex:10,left:0,width:'100%',background:color}} className='inter'>
      <div className="row m-0 w-100 h-100 px-1">
        <div className="col-6 d-flex align-items-center">
          <p className='m-0 d-flex align-items-center cursor' onClick={()=>navigate(`/`)}>
            <img src={logo_img} width={36} alt="" />
            <span className='ms-1 inter fs-5' style={{fontWeight:600}}>AlgoTest</span>
          </p>
          
          <div class="dropdown mx-4">
  <a class="btn border-0 d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Algo Trading
    <span className='ms-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
</svg></span>
  </a>

  <ul class="dropdown-menu bg-white border-0 p-3 shadow animate__animated animate__fadeIn animate__faster" style={{width:'1100px'}}>
    <div className="row w-100 m-0">
      <div className="col-4">
        <h6 className='border-bottom pb-2 fw-bold'>Algo Trading</h6>

        {algotrading?.map((data,index)=>(
          <div onClick={()=>navigate(`/features/${data.slug}`)} onMouseEnter={()=>setIndex1(index)} className={`d-flex my-1 cursor rounded p-3 ${index1 === index ? 'active_div':''}`}>
          <p className={`${index1 === index ? 'active_icon':'text-secondary border'} rounded d-flex align-items-center justify-content-center m-0 me-3`} 
          style={{
              height: '40px',
              width: '40px',
              minWidth: '40px',
              flexShrink: 0
            }}>
            {data.icon}
          </p>
          <div>
            <p className='fw-medium m-0 d-flex align-items-center'>{data.title} <span className={`${index === index1 ? 'ms-2 active_color':'d-none'}`} style={{transition:'0.3s'}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></span></p>
            <p className='m-0 text-secondary' style={{fontSize:'14px'}}>{data.description}</p>
          </div>
        </div>
        ))}
      </div>

      <div className="col-4">
        <h6 className='border-bottom pb-2 fw-bold'>Discretionary</h6>

        {descretionary?.map((data,index)=>(
          <div className='d-flex my-4'>
          <p className='text-secondary border bprder-secondary rounded d-flex align-items-center justify-content-center m-0 me-3' 
          style={{
              height: '40px',
              width: '40px',
              minWidth: '40px',
              flexShrink: 0
            }}>
            {data.icon}
          </p>
          <div>
            <p className='fw-medium m-0'>{data.title}</p>
            <p className='m-0 text-secondary' style={{fontSize:'14px'}}>{data.description}</p>
          </div>
        </div>
        ))}
      </div>

      <div className="col-4">
        <h6 className='border-bottom pb-2 fw-bold'>Indicator Algo</h6>

        {indiactor_algo?.map((data,index)=>(
          <div onClick={()=>navigate(`/features/${data.slug}`)} onMouseEnter={()=>setIndex3(index)} className={`d-flex my-1 cursor rounded p-3 ${index3 === index ? 'active_div':''}`}>
          <p className={`${index3 === index ? 'active_icon':'text-secondary border'} rounded d-flex align-items-center justify-content-center m-0 me-3`} 
          style={{
              height: '40px',
              width: '40px',
              minWidth: '40px',
              flexShrink: 0
            }}>
            {data.icon}
          </p>
          <div>
            <p className='fw-medium m-0 d-flex align-items-center'>{data.title} <span className={`${index === index3 ? 'ms-2 active_color':'d-none'}`} style={{transition:'0.3s'}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></span></p>
            <p className='m-0 text-secondary' style={{fontSize:'14px'}}>{data.description}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  </ul>
          </div>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-end">
          <div class="dropdown">
  <a class="btn border-0 d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Resuorces + Tools
    <span className='ms-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
</svg></span>
  </a>

  <ul class="dropdown-menu bg-white border-0 p-3 shadow animate__animated animate__fadeIn animate__faster" style={{width:'700px'}}>
    <div className="row w-100 m-0 border-bottom">
      <div className="col-6 border-end">
        <h6 className='border-bottom pb-2 fw-bold'>Resources</h6>

        {resources?.map((data,index)=>(
          <div onClick={()=>navigate(`/${data.slug}`)} onMouseEnter={()=>setIndex1(index)} className={`d-flex my-1 cursor rounded p-2 py-3 ${index1 === index ? 'active_div':''}`}>
          <p className={`${index1 === index ? 'active_icon':'text-secondary border'} rounded d-flex align-items-center justify-content-center m-0 me-3`} 
          style={{
              height: '40px',
              width: '40px',
              minWidth: '40px',
              flexShrink: 0
            }}>
            {data.icon}
          </p>
          <div>
            <p className='fw-medium m-0 d-flex align-items-center'>{data.title} <span className={`${index === index1 ? 'ms-2 active_color':'d-none'}`} style={{transition:'0.3s'}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></span></p>
            <p className='m-0 text-secondary' style={{fontSize:'14px'}}>{data.description}</p>
          </div>
        </div>
        ))}
      </div>

      <div className="col-6 ps-4">
        <h6 className='border-bottom pb-2 fw-bold'>Tools</h6>

        {tools?.map((data,index)=>(
          <p className='m-0 py-3'>{data.title}</p>
        ))}
      </div>
    </div>

    <p className='d-flex align-items-center justify-content-center m-0 pt-3' style={{cursor:'pointer'}}>View all resources & tools
      <span className='ms-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></span>
    </p>
  </ul>
          </div>
          <p className='m-0 mx-5'>Pricing</p>
          <p className='m-0 me-5'>Partnership</p>
          <button className='btn d-flex align-items-center justify-content-center border-primary text-primary px-3 fw-medium' onClick={()=>navigate('/sign_in')} style={{height:'30px',fontSize:'13px'}}>Login</button>
          <button className='btn d-flex align-items-center justify-content-center border-primary btn-primary px-3 ms-3 fw-medium' style={{height:'30px',fontSize:'13px'}}>Sign Up</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar
