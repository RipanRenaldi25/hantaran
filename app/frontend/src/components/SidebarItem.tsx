import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
    <li>
      <NavLink
        to={props.path}
        className={cn(
          'flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px] group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          props.isActive
            ? 'bg-primary text-primary-foreground shadow-xs font-semibold'
            : 'text-stone-300 hover:text-white hover:bg-stone-800/70'
        )}
        onClick={() =>
          props.setSidebarItems((prevValue: any) =>
            prevValue.map((item: any) => ({
              ...item,
              isActive: item.path === props.path,
            }))
          )
        }
      >
        <span
          className={cn(
            'shrink-0 transition-transform duration-200 group-hover:scale-110',
            props.isActive ? 'text-primary-foreground' : 'text-stone-400 group-hover:text-white'
          )}
        >
          <props.icon className="w-5 h-5" />
        </span>
        <span className="truncate">{props.title}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
