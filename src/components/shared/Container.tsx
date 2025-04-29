
import React from 'react';
import classNames from '@/utils/classNames';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    asElement?: React.ElementType;
}

const Container = (props: ContainerProps) => {
    const { 
        className, 
        children, 
        asElement: Component = 'div', 
        ...rest 
    } = props;

    return (
        <Component 
            className={classNames('container mx-auto', className)}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default Container;
