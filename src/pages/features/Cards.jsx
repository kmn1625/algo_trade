import React from 'react'
import categoryImage from "../../images/business_card.jpg";

const Cards = () => {

    const cards = [
        {
            title:"Choose Your Signal Source",
            img:`${categoryImage}`,
            desc:"Select where your signals will come from— GoCharting"
        },
        {
            title:"Choose Your Signal Source",
            img:`${categoryImage}`,
            desc:"Select where your signals will come from— GoCharting"
        },
        {
            title:"Choose Your Signal Source",
            img:`${categoryImage}`,
            desc:"Select where your signals will come from— GoCharting"
        },
        {
            title:"Choose Your Signal Source",
            img:`${categoryImage}`,
            desc:"Select where your signals will come from— GoCharting"
        },
    ]

  return (
    <div className='container mx-auto py-5'>
      <div className='text-center'>
        <h1>Algo Setup Made Easy</h1>
        <p className='text-secondary'>Easily connect your signals, strategy, and broker to automate execution</p>
      </div>
      
      <div className="row mt-5 justify-content-center">
        {cards?.map((data,index)=>{
            return(
                <div className='col-lg-5 mb-5'>
                    <div className='rounded shadow-sm position-relative'>
                        <p style={{fontSize:'60px',left:'20px',color:'lightgray'}} className='fw-bold position-absolute'>{index+1}</p>
                        <img src={data.img} className='' style={{width:'100%',height:"300px",
                            objectFit: "cover",
                            borderTopLeftRadius: "0.5rem",
                            borderTopRightRadius: "0.5rem",}} alt="" />
                        <div className='border-top py-3 px-3'>
                            <p className='fs-5 mb-1'>{data.title}</p>
                            <p className='text-secondary m-0' style={{fontSize:'14px'}}>{data.desc}</p>
                        </div>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default Cards
