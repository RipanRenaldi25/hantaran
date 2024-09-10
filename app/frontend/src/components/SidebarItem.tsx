import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { LucideProps } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export interface ISidebarItem {
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  path: string;
  setSidebarItems: any;
  isActive: boolean;
}

const SidebarItem = (props: ISidebarItem) => {
  return (
    <NavLink
      to={props.path}
      className={`flex gap-2 w-full items-center px-5 py-3 ${
        props.isActive && 'bg-[#3248F2]'
      }`}
      onClick={() =>
        props.setSidebarItems((prevValue: any) =>
          prevValue.map((item: any) => ({
            ...item,
            isActive: item.path === props.path,
          }))
        )
      }
    >
      {/* <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
      <div className="inline-block">{<props.icon />}</div>
      <h1 className="text-lg ">{props.title}</h1>
      {/* </NavigationMenuLink> */}
    </NavLink>
  );
};

export default SidebarItem;
