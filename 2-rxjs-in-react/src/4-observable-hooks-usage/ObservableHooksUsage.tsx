import React, { FC } from 'react';
import ObservableUsage from './ObservableUsage';
import ObservableStateUsage from './ObservableStateUsage';

const ObservableHooksUsage: FC = () => {
    return (
        <div>
            <h2>
                ObservableHooksUsage
            </h2>
            <ObservableUsage />
            <ObservableStateUsage />
        </div>
    )
};

export default ObservableHooksUsage;
