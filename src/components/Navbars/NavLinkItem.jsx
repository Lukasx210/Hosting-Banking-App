import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
const NavLinkItem = ({ isScrolled,transparent, path, name }) => {
  return (
    <li className="flex items-center">
      <Link
        className={cn(
          !isScrolled ? `${transparent?'':''}` : 'lg:text-slate-600 lg:hover:text-slate-700',
          '  px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
        )}
        to={path}
      >
        {name}
      </Link>
    </li>
  );
};

export default NavLinkItem;
