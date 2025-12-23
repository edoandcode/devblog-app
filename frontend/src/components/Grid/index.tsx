import type { FC } from 'react';
import { Grid as UiKitGrid } from '@edoandcode/ui-kit-grid';
import { clsx } from 'clsx';

import defaultGridConfig from '../../../ui-kit-grid-config.mjs';
import GridDebug from './GridDebug';

import type { GridProps, ColProps } from '@edoandcode/ui-kit-grid';
interface GridComponentProps extends Omit<GridProps, 'config'> {
    boxed?: boolean;
    config?: GridProps['config'];
}

const Grid: FC<GridComponentProps> & { Col: FC<ColProps> } = ({
    children,
    className,
    config = defaultGridConfig,
    boxed,
    ...rest
}) => {
    return (
        <UiKitGrid
            config={config}
            className={clsx(
                "2xl:max-w-[1620px] 2xl:mx-auto",
                boxed && "max-w-[1180px] lg:mx-auto",
                className
            )}
            {...rest}
        >
            {children}
        </UiKitGrid>
    );
};

Grid.Col = UiKitGrid.Col;

export default Grid;

export { GridDebug };