
import cn from 'classnames';
import { twMerge } from 'tailwind-merge';

export default function classNames(...args: any[]) {
    return twMerge(cn(...args));
}
