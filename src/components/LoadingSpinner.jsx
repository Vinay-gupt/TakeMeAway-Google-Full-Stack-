
function LoadingSpinner() {

  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{width: "100%", height:"70vh"}}>
      <div className="spinner-border" role="status" style={{width: "8rem", height: "8rem"}}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default LoadingSpinner