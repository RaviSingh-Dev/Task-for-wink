import React from 'react';
import ReactPaginate from "react-paginate";

import './pagination-styles.css';

const Pagination=({pageCountperPage,changePage,loading})=>{ 
	return(
		loading.length===0?'':
	    <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} pageCount={pageCountperPage}
	     onPageChange={changePage} containerClassName={"paginationBttns"} 
	     previousLinkClassName={"previousBttn"} nextLinkClassName={"nextBttn"} 
	     disabledClassName={"paginationDisabled"} activeClassName={"paginationActive"}/>
	      )
	  }
export default Pagination;