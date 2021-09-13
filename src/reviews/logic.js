export const fetchState = async () => {
  return fetch('https://shakespeare.podium.com/api/reviews', {
    headers: {
      'x-api-key': 'H3TM28wjL8R4#HTnqk?c'
    }
  }).then(async response => response.json() )
}

export const getReviewDetails = async (reviewId) => {
  return fetch(`https://shakespeare.podium.com/api/reviews/${reviewId}`, {
    headers: {
      'x-api-key': 'H3TM28wjL8R4#HTnqk?c'
    }
  }).then(async response => response.json() )
}

export const friendlyDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export const handleSearchChangeLogic = (searchString, reviews) => {
  if(searchString.length > 2){
    return reviews.filter(review => review.body.includes(searchString))
  }
  return reviews
}

export const handleSortLogic = (direction, reviews) => {
  if(direction === 'ASC'){
    return reviews.sort((a,b) =>  a.rating > b.rating ? 1 : -1 )
  }else{
    return reviews.sort((a,b) =>  a.rating < b.rating ? 1 : -1 )
  }
}

export const filterByRating = (ratingMin, ratingMax, reviews) => {
  return reviews.filter(review => review.rating <= ratingMax && review.rating >= ratingMin );
}