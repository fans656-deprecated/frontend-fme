import React from 'react';
import qs from 'query-string';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { ic_first_page } from 'react-icons-kit/md/ic_first_page';
import { ic_last_page } from 'react-icons-kit/md/ic_last_page';
import { ic_navigate_before } from 'react-icons-kit/md/ic_navigate_before';
import { ic_navigate_next } from 'react-icons-kit/md/ic_navigate_next';
import './css/Pagination.css';

export default class Pagination extends React.Component {
  render() {
    const props = this.props;
    const page = props.page || 1;
    const total = props.total || 0;
    const size = props.size || 0;

    if (size >= total) {
      return null;
    }

    const lastPage = Math.ceil(total / size);
    const COUNT = 5;

    let headPage = page - COUNT;
    let tailAdd = 0;
    if (headPage < 1) {
      tailAdd = 1 - headPage;
      headPage = 1;
    }
    let tailPage = page + COUNT;
    let headSub = 0;
    if (tailPage > lastPage) {
      headSub = tailPage - lastPage;
      tailPage = lastPage;
    }
    headPage = Math.max(1, headPage - headSub);
    tailPage = Math.min(lastPage, tailPage + tailAdd);
    
    const pages = [];
    for (let i = headPage; i <= tailPage; ++i) {
      pages.push(i);
    }

    const prevPage = Math.max(1, page - 1);
    const nextPage = Math.min(lastPage, page + 1);

    const iconSize = 20;
    return (
      <div className="pagination">
        <Link to={getPageLink(1)} className="icon page">
          <Icon size={iconSize} icon={ic_first_page}/>
        </Link>
        <Link to={getPageLink(prevPage)} className="icon page">
          <Icon size={iconSize} icon={ic_navigate_before}/>
        </Link>
        <div className="pages">
          {this.renderPageLinks(pages)}
        </div>
        <Link to={getPageLink(nextPage)} className="icon page">
          <Icon size={iconSize} icon={ic_navigate_next}/>
        </Link>
        <Link to={getPageLink(lastPage)} className="icon page">
          <Icon size={iconSize} icon={ic_last_page}/>
        </Link>
      </div>
    );
  }

  renderPageLinks = (pages) => {
    const currentPage = this.props.page;
    return pages.map(page => {
      return (
        <Link
          className={'page ' + (page === currentPage ? 'current' : '')}
          key={page}
          to={getPageLink(page)}
        >
          {page}
        </Link>
      );
    });
  }
}

function getPageLink(page) {
  const path = window.location.pathname;
  const search = window.location.search;
  const args = qs.parse(search.substring(1));
  let newArgs = Object.assign({}, args, {page: page});
  if (page === 1) {
    delete newArgs.page;
  }
  return path + (_.isEmpty(newArgs) ? '' : '?' + qs.stringify(newArgs));
}
