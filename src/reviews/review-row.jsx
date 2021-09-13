
import React, {useState} from 'react';
import {CircularProgress} from '@material-ui/core'
import {getReviewDetails, friendlyDate} from './logic';

const ReviewRow = ({review}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  
  const handleReviewClick = async () => {
    setLoading(true);
    if(!details){
      const detailsResult = await getReviewDetails(review.id)
      setDetails(detailsResult);
    }
    setLoading(false);
    setOpen(!open)
  }
  
  if(loading){
    return (
    <div className="loading-container-review">
      <CircularProgress />
    </div>)
  }
  if(open){
    return <div onClick={handleReviewClick} className="expanded-row-container">
      <div className="review-row-expanded">
        <span className="expanded-label">Rating</span>
        <span>{details.rating}</span>
      </div>
      <div className="review-row-expanded">
        <span className="expanded-label">Body</span>
        {details.body}
      </div>
      <div className="review-row-expanded">
        <span className="expanded-label">Author</span>
        <span>{details.author}</span>
      </div>
      <div className="review-row-expanded">
        <span className="expanded-label">Date</span>
        <span>{friendlyDate(details.publish_date)}</span>
      </div>
    </div>
  }
  return (
    <div onClick={handleReviewClick} className="review-row-container">
      <div className="review-rating">
        <span className="label">Rating</span>
        <span>{review.rating}</span>
      </div>
      <div className="review-body">
        <span className="label">Body</span>
        {review.body}
        </div>
    </div>
  )
}

export default ReviewRow;