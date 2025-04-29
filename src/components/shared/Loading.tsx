
import React from 'react';
import classNames from '@/utils/classNames';

interface LoadingProps {
    loading?: boolean;
    children?: React.ReactNode;
    spinnerClass?: string;
    className?: string;
    asElement?: React.ElementType;
    customLoader?: React.ReactNode;
    type?: 'default' | 'cover';
}

const DefaultLoading = (props: Omit<LoadingProps, 'type'>) => {
    const { 
        loading, 
        children, 
        spinnerClass, 
        className, 
        asElement: Component = 'div',
        customLoader 
    } = props;

    return loading ? (
        <Component
            className={classNames(
                !customLoader && 'flex items-center justify-center h-full',
                className
            )}
        >
            {customLoader ? (
                <>{customLoader}</>
            ) : (
                <div className={classNames('animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full', spinnerClass)} />
            )}
        </Component>
    ) : (
        <>{children}</>
    );
};

const CoveredLoading = (props: Omit<LoadingProps, 'type'>) => {
    const { 
        loading, 
        children, 
        spinnerClass, 
        className, 
        asElement: Component = 'div',
        customLoader 
    } = props;

    return (
        <Component
            className={classNames(loading ? 'relative' : '', className)}
        >
            {children}
            {loading && (
                <div className="w-full h-full bg-white/50 dark:bg-gray-800/60 absolute inset-0" />
            )}
            {loading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    {customLoader ? (
                        <>{customLoader}</>
                    ) : (
                        <div className={classNames('animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full', spinnerClass)} />
                    )}
                </div>
            )}
        </Component>
    );
};

const Loading = ({ 
    type = 'default', 
    loading = false, 
    asElement = 'div', 
    ...rest 
}: LoadingProps) => {
    switch (type) {
        case 'default':
            return <DefaultLoading loading={loading} asElement={asElement} {...rest} />;
        case 'cover':
            return <CoveredLoading loading={loading} asElement={asElement} {...rest} />;
        default:
            return <DefaultLoading loading={loading} asElement={asElement} {...rest} />;
    }
};

export default Loading;
