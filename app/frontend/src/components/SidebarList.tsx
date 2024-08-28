import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import SidebarItem from './SidebarItem';
import { LucideProps } from 'lucide-react';
export interface ISidebarListComponent {
  sidebarItems: {
    title: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >;
    path: string;
    isActive: boolean;
  }[];
  setSidebarItems: any;
}

const SidebarList = (props: ISidebarListComponent) => {
  return (
    <ul className="flex flex-col">
      {props.sidebarItems.map((item) => (
        <SidebarItem
          key={item.path}
          path={item.path}
          title={item.title}
          icon={item.icon}
          isActive={item.isActive}
          setSidebarItems={props.setSidebarItems}
        />
      ))}
    </ul>
  );
};

export default SidebarList;
