import React, { useEffect, useState } from 'react';
import {Container, CircularProgress} from '@material-ui/core'
import {fetchState, handleSearchChangeLogic, handleSortLogic, filterByRating} from './logic';
import ReviewRow from './review-row';
import FiltersRow from './filters-row';
import './reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [sortValue, setSortValue] = useState('');
  const [ratingsSortValue, setRatingSortValue] = useState(null);

  useEffect(() => {
    const fetchInitialState = async () => {
      const result = await fetchState();
      setReviews(result);
      setFilteredReviews(result);
      setLoading(false);
    }

    fetchInitialState();
  }, [])

  const handleSearchChange = (searchString) => {
    setSearchText(searchString);
    const result = handleSearchChangeLogic(searchString, reviews);
    setFilteredReviews(result);
  }

  const handleSortChange = (sortDirection) => {
    setSortValue(sortDirection)
    const result = handleSortLogic(sortDirection, filteredReviews);
    setFilteredReviews(result);
  }

  const handleRatingSortChange = (sortValueMax) => {
    setRatingSortValue(sortValueMax);
    const result = filterByRating(sortValueMax - 1, sortValueMax, filteredReviews);
    setFilteredReviews(result);
  }

  const handleResetFilters = () => {
    setSearchText('');
    setFilteredReviews(reviews);
    setSortValue(null);
    setRatingSortValue(null);
  }

  return(
    <Container>
      <h2 className="page-title">Shakespeare's Reviews</h2>

      <FiltersRow 
      handleSearchChange={handleSearchChange}
      searchText={searchText}
      handleSortChange={handleSortChange} 
      handleRatingSortChange={handleRatingSortChange} 
      sortValue={sortValue} 
      ratingSortValue={ratingsSortValue}
      handleResetFilters={handleResetFilters}
      />
      
      {loading && (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}
      { !loading && filteredReviews.length > 0 && (
        <div>
          {filteredReviews.map(review => {
            return <ReviewRow key={review.id} review={review} />
          })}
        </div>
      )}
      { !loading && filteredReviews.length === 0 && (
        <div className="review-row-container">No reviews to show.</div>
      )

      }

    </Container>
  )
}

export default Reviews;