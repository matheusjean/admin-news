import React from 'react';

import { BreadCrumbContainer } from './style';

interface BreadCrumbProps {
  crumbs: React.ReactElement[];
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ crumbs }) => (
  <BreadCrumbContainer>
    {crumbs.map((crumb, index) => (
      <div key={index}>{crumb}</div>
    ))}
  </BreadCrumbContainer>
);

export default BreadCrumb;
