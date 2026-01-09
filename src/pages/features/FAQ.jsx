import React from 'react'

const FAQ = () => {
  return (
    <div className='container mx-auto py-5'>
      <h2>FAQs</h2>
      <p style={{fontSize:'13px'}} className='text-secondary'>Need help with something? Here are our most frequently asked questions.</p>
      
      <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item pb-2 bg-transparent">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed bg-transparent shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        How does AlgoTest Signals work? What does it do?
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body p-3">
        <p>In TradingView, you can create alert on any price level or indicator. Now in AlgoTest Signals you can connect this alert with Future/Option position. So if a alert is generated in TradingView, AlgoTest Signal will execute your Future/Option position on your broker terminal.</p>
        <button className='btn border-primary bg-transparent py-2 px-4 text-primary' style={{fontSize:'12px'}}>Get Started
            <span className='ms-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></span>
        </button>
      </div>
    </div>
  </div>
  <div class="accordion-item py-2 bg-transparent">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed bg-transparent shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        How many signals can I generate using this?
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body p-3">
        <p>There is no limit to create AlgoTest Signals and to execute them.</p>
        <button className='btn border-primary bg-transparent py-2 px-4 text-primary' style={{fontSize:'12px'}}>Get Started
            <span className='ms-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></span>
        </button>
      </div>
    </div>
  </div>
  <div class="accordion-item py-2 bg-transparent">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed bg-transparent shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        What is the advantage of using AlgoTest Signals?
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
    <div class="accordion-body p-3">
        <ul>
            <li>AlgoTest's Signals gives you seamless and easy integration with TradingView.</li>
            <li>Code-free solution for automation.</li>
            <li>No need to create pinescripts! We provide them to you.</li>
        </ul>
        <button className='btn border-primary bg-transparent py-2 px-4 text-primary' style={{fontSize:'12px'}}>Get Started
            <span className='ms-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></span>
        </button>
      </div>
    </div>
  </div>
</div>
    
    </div>
  )
}

export default FAQ
