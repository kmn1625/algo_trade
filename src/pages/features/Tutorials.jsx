import React from 'react'

const Tutorials = () => {
  const videos = [
    {
      video_url: "https://www.youtube.com/embed/KtHBP0hVUus?si=Idb7ZT2wUJkvjWjX",
      title: "Tutorial 1"
    },
    {
      video_url: "https://www.youtube.com/embed/KtHBP0hVUus?si=Idb7ZT2wUJkvjWjX",
      title: "Tutorial 1"
    },
    {
      video_url: "https://www.youtube.com/embed/KtHBP0hVUus?si=Idb7ZT2wUJkvjWjX",
      title: "Tutorial 1"
    },
    {
      video_url: "https://www.youtube.com/embed/KtHBP0hVUus?si=Idb7ZT2wUJkvjWjX",
      title: "Tutorial 1"
    },
  ]

  return (
    <div className='py-5'>
      <h2 className='fw-bold mb-4'>Tutorials</h2>

      {videos.map((vid, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <iframe
            width="340"
            style={{borderRadius:'10px'}}
            height="240"
            src={vid.video_url}
            title={vid.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <p style={{fontSize:'13px'}}>{vid?.title}</p>
        </div>
      ))}
    </div>
  )
}

export default Tutorials
