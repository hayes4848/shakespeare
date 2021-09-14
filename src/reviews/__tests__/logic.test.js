import {friendlyDate, handleSearchChangeLogic, handleSortLogic, filterByRating} from '../logic';
import {reviewData} from '../__test_data__/reviewData'

describe('format the date in a more friendly way', () => {
  it('should return the date in month/day/year formatting', () => {
    const date = new Date("2016-09-05T23:25:47.642350Z");
    const result = friendlyDate(date);
    expect(result).toEqual('9/5/2016');
  })
})

describe('filter the results by the search input', () => {
  it('should successfully filter the results for a string longer than 3 characters', () => {
    const result = handleSearchChangeLogic('fool', reviewData);
    expect(result.length).toEqual(8);
    expect(result.length).toBeLessThan(reviewData.length);
  });
  it('should return the full set if search is two characters', () => {
    const result = handleSearchChangeLogic('fo', reviewData);
    expect(result.length).toEqual(reviewData.length);
  })
})

describe('we should be able to sort the reviews by their rating', () => {
  it('should return the reviews sorted in ascending order', () => {
    const result = handleSortLogic('ASC', reviewData);
    expect(result[0].rating).toBeLessThan(result[5].rating);
    expect(result[5].rating).toBeLessThan(result[10].rating);
    expect(result[10].rating).toBeLessThan(result[15].rating);
  })
  it('should return the reviews in descending order', () => {
    const result = handleSortLogic('DESC', reviewData);
    expect(result[0].rating).toBeGreaterThan(result[5].rating);
    expect(result[5].rating).toBeGreaterThan(result[10].rating);
    expect(result[10].rating).toBeGreaterThan(result[15].rating);
  })
})

describe('we should filter the results by rating', () => {
  it('should return the reviews with ratings between 0 and 1', () => {
    const result = filterByRating(0, 1, reviewData);
    expect(result.length).toBeLessThan(reviewData.length);
    expect(result.length).toEqual(14);
    expect(result.filter(r => r.review > 1).length).toEqual(0);
  })
  it('should return the reviews with ratings between 2 and 3', () => {
    const result = filterByRating(2, 3, reviewData);
    expect(result.length).toBeLessThan(reviewData.length);
    expect(result.length).toEqual(6);
    expect(result.filter(r => r.review > 3).length).toEqual(0);
    expect(result.filter(r => r.review < 2).length).toEqual(0);
  })
})