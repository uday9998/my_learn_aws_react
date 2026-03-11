/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import classnames from 'classnames';
import Icon from 'components/elements/Icon';
import './index.scss';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
   let i = from;
   // eslint-disable-next-line no-shadow
   const range = [];

   while (i <= to) {
      range.push(i);
      i += step;
   }

   return range;
};

const getPaginationNumbers = (total) => {
   const result = [];

   for (let i = 0; i < Math.ceil(total / 30); i++) {
      result.push(i + 1);
   }

   return result;
};

class Pagination extends Component {
   static propTypes = {
      currentPageProp: PropTypes.number,
   };

   constructor(props) {
      super(props);
      const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;
      this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
      this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

      this.pageNeighbours = typeof pageNeighbours === 'number'
         ? Math.max(0, Math.min(pageNeighbours, 2))
         : 0;

      this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

      this.state = { currentPage: 1 };
   }

   componentDidMount() {
      // this.gotoPage(1);
      // this.gotoPageStart(1);
   }

  gotoPage = page => {
     const { onPageChanged = f => f } = this.props;

     const currentPage = Math.max(0, Math.min(page, this.totalPages));

     const paginationData = {
        currentPage: page,
        totalPages: this.totalPages,
        pageLimit: this.pageLimit,
        totalRecords: this.totalRecords,
     };

     this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  //   gotoPageStart = page => {
  //      const { onPageChanged = f => f } = this.props;

  //      const currentPage = Math.max(0, Math.min(page, this.totalPages));
  //      const paginationData = {
  //         currentPage,
  //         totalPages: this.totalPages,
  //         pageLimit: this.pageLimit,
  //         totalRecords: this.totalRecords,
  //      };

  //      // this.setState({ currentPage }, () => onPageChanged(paginationData));
  //   };

  handleClick = (page, evt) => {
     evt.preventDefault();
     this.gotoPage(page);
  };

  handleMoveLeft = evt => {
     evt.preventDefault();
     // eslint-disable-next-line react/destructuring-assignment
     this.gotoPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
  };

  handleMoveRight = evt => {
     evt.preventDefault();
     // eslint-disable-next-line react/destructuring-assignment
     this.gotoPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
  };

  fetchPageNumbers = () => {
     const totalPages = this.totalPages;
     // eslint-disable-next-line react/destructuring-assignment
     const currentPage = this.state.currentPage;
     const pageNeighbours = this.pageNeighbours;

     const totalNumbers = this.pageNeighbours * 2 + 3;
     const totalBlocks = totalNumbers + 2;

     if (totalPages > totalBlocks) {
        let pages = [];

        const leftBound = currentPage - pageNeighbours;
        const rightBound = currentPage + pageNeighbours;
        const beforeLastPage = totalPages - 1;

        const startPage = leftBound > 2 ? leftBound : 2;
        const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

        pages = range(startPage, endPage);

        const pagesCount = pages.length;
        const singleSpillOffset = totalNumbers - pagesCount - 1;

        const leftSpill = startPage > 2;
        const rightSpill = endPage < beforeLastPage;

        const leftSpillPage = LEFT_PAGE;
        const rightSpillPage = RIGHT_PAGE;

        if (leftSpill && !rightSpill) {
           const extraPages = range(startPage - singleSpillOffset, startPage - 1);
           pages = [leftSpillPage, ...extraPages, ...pages];
        } else if (!leftSpill && rightSpill) {
           const extraPages = range(endPage + 1, endPage + singleSpillOffset);
           pages = [...pages, ...extraPages, rightSpillPage];
        } else if (leftSpill && rightSpill) {
           pages = [leftSpillPage, ...pages, rightSpillPage];
        }

        return [1, ...pages, totalPages];
     }

     return range(1, totalPages);
  };

  render() {
     if (!this.totalRecords) return null;
     if (this.totalPages === 1) return null;
     const { currentPageProp, isVideoMetrics } = this.props;
     const { currentPage } = this.state;
     let currentPageNumber = currentPage;
     if (currentPageProp) {
        currentPageNumber = currentPageProp;
     }

     const pages = isVideoMetrics ? getPaginationNumbers(this.totalRecords) : this.fetchPageNumbers();

     return (
        <Fragment>
           <nav aria-label='Countries Pagination'>
              <div className='pagePagination'>
                 <div className={ classnames('paginationLeft paginationItem ', { 'paginationItem__disabled': currentPageNumber <= 1 }) } role='presentation' onClick={ currentPageNumber <= 1 ? () => {} : (e) => this.handleClick(currentPageNumber - 1, e) }>
                    <Icon name='PaginationArrow' />
                 </div>
                 {pages.map((page, index) => {
                    if (page === LEFT_PAGE) {
                       return (
                          // eslint-disable-next-line react/no-array-index-key
                          <div className='paginationDotes' key={ index } onClick={ this.handleMoveLeft } role='presentation'>
                             <Text
                                type={ TextType.regular }
                                size={ TextSize.extraSmall }
                                inner='...'
                             />
                          </div>

                       );
                    }

                    if (page === RIGHT_PAGE) {
                       return (
                          // eslint-disable-next-line react/no-array-index-key
                          <div className='paginationDotes' key={ index } onClick={ this.handleMoveRight } role='presentation'>
                             <Icon name='PaginationDotes' />
                          </div>

                       );
                    }

                    return (
                       // eslint-disable-next-line react/no-array-index-key
                       <div key={ index } className={ classnames('paginationItem', { 'paginationItem__active': currentPageNumber === page }) } role='presentation' onClick={ e => this.handleClick(page, e) }>
                          <Text
                             type={ TextType.regularDefault }
                             size={ TextSize.small }
                             inner={ `${ page }` }
                             style={ { color: currentPageNumber === page ? '#fff' : '#131F1E' } }
                          />
                       </div>

                    );
                 })}
                 <div className={ classnames('paginationRight paginationItem ', { 'paginationItem__disabled': (currentPageNumber >= (this.totalPages)) }) } role='presentation' onClick={ currentPageNumber >= (this.totalPages) ? () => {} : (e) => this.handleClick(currentPageNumber + 1, e) }>
                    <Icon name='PaginationArrow' style={ { transform: 'rotate(180deg)' } } />
                 </div>
              </div>
           </nav>
        </Fragment>
     );
  }
}

Pagination.propTypes = {
   totalRecords: PropTypes.number.isRequired,
   pageLimit: PropTypes.number,
   pageNeighbours: PropTypes.number,
   onPageChanged: PropTypes.func,
   isVideoMetrics: PropTypes.bool,
};

export default Pagination;
