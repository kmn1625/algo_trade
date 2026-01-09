import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer';
import ScrollToTop from './Scroll_to_top';

const Blogs = () => {

    const articles = [
  {
    title: "Options Volatility Glossary",
    author: "AlgoTest",
    date: "Dec 02, 2025",
    readTime: "0 min read",
    category: "strategies",
    image: "https://fileserver.enrichmoney.in/Content/UploadedFiles/dbAC1EKWuWQF0f5asOkGmzGR_20220728035825903.svg"
  },
  {
    title: "Price Action Strategy",
    author: "AlgoTest",
    date: "Nov 25, 2025",
    readTime: "4 min read",
    category: "backtest",
    image: "https://fileserver.enrichmoney.in/Content/UploadedFiles/dbAC1EKWuWQF0f5asOkGmzGR_20220728035825903.svg"
  },
  {
    title: "Intraday Trading Basics",
    author: "AlgoTest",
    date: "Oct 12, 2025",
    readTime: "3 min read",
    category: "broker",
    image: "https://fileserver.enrichmoney.in/Content/UploadedFiles/dbAC1EKWuWQF0f5asOkGmzGR_20220728035825903.svg"
  }
];


    const categories = [
  { name: "All", slug: "all" },
  { name: "Strategies", slug: "strategies" },
  { name: "Broker", slug: "broker" },
  { name: "Backtest", slug: "backtest" },
  { name: "Product", slug: "product" },
  { name: "Forward Test", slug: "forward-test" }
];

const [activeCategory, setActiveCategory] = useState("all");

const filteredArticles =
  activeCategory === "all"
    ? articles
    : articles.filter(
        article => article.category === activeCategory
      );


  return (
    <div>
        <style>
            {`
            .card-img-top {
            transition: transform 0.4s ease;
            }

            .article-card:hover .card-img-top {
            transform: scale(1.1);
            }
            .cat-btn{
            color:#4186f7;
            background:#deedff;
            transition:0.3s ease-in-out;
            }
            .cat-btn:hover{
            background:#4186f7;
            color:white;
            }
            `}
        </style>
      <Navbar color={'#ecf6ff'}/>
      <div className="inter main-div">
        <div className='p-5' style={{background: "#ecf6ff"}}>
        <div className='container-fluid' style={{height:'60vh'}}>
            <div className="w-75">
                <h1 className='fw-bold' style={{lineHeight:'80px',fontSize:'70px'}}>Algo Trading: Tools, Product Updates & Market Insights</h1>
                <p className='text-secondary fs-5'>Everything you need to know about Algo Trading!</p>
                <button className='btn bg-primary bg-gradient px-4 fw-medium mt-3 text-white' style={{height:'50px'}}>Start Algo Trading</button>

                <div className='d-flex align-items-center mt-5'>
                    {categories?.map((cat)=>(
                        <p key={cat.slug}
      onClick={() => setActiveCategory(cat.slug)} className={`cat-btn rounded px-3 py-2 me-2 fw-bold cursor
        ${activeCategory === cat.slug ? 'bg-primary text-white' : ''}`} style={{height:'40px'}}>
                            <span className='me-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
  <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/>
</svg></span>
                            {cat.name}
                        </p>
                    ))}
                </div>
            </div>
        </div>

        <div className="mb-5 mt-4">
      <div className="row g-5">
        {filteredArticles.map((item, index) => (
          <div className="col-md-3" key={index}>
            <div className="card article-card shadow-sm cursor">

              <div className="card-img-container" style={{height:'350px'}}>
                <img src={item.image} className="card-img-top" alt="Blog" />
                <div className="img-overlay"></div>
              </div>

              <div className="card-body text-white">
                <h5 className="card-title fw-bold">{item.title}</h5>

                <div className="d-flex align-items-center mt-2">
                  <span className="me-3 font-sm">
                    <span className='me-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
</svg></span>
                    {item.author}</span>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-2">
                  <span className="me-3 font-sm">
                    <span className='me-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg></span>
                    {item.date}</span>

                  <span>
                    <span className='me-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch" viewBox="0 0 16 16">
  <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z"/>
  <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3"/>
</svg></span>
                  <span className='font-sm'>{item.readTime}</span>
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
      </div>
      <Footer/>
      <ScrollToTop/>
    </div>
  )
}

export default Blogs
