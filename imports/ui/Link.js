import React from 'react';

import LinksList from './LinksList';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default () => {
  return (
      <div className="page-content">
        <LinksListFilters/>
        <AddClient/>
        <LinksList/>
      </div>
  );
};
