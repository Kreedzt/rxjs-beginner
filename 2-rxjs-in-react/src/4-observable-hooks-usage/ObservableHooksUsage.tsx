import React, { FC } from 'react';
import ObservableUsage from './ObservableUsage';
import ObservableStateUsage from './ObservableStateUsage';
import ObservableCallbackUsage from './ObservableCallbackUsage';

const ObservableHooksUsage: FC = () => {
    return (
        <div>
            <h2>
                ObservableHooksUsage
            </h2>
            <ObservableUsage />
            <ObservableStateUsage />
            <ObservableCallbackUsage />
        </div>
    )
};

export default ObservableHooksUsage;
