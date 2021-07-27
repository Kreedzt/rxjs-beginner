import React, { FC, useState, useCallback } from 'react';
import { useObservableState } from 'observable-hooks';
import { debounceTime } from 'rxjs/operators';

const ObservableStateUsage: FC = () => {
    const [input, setInput] = useState<string>('');
    const [afterDebounceValue, setTransformByObservableValue] = useObservableState<string, string>(
        (value$) =>
            value$.pipe(debounceTime(200)),
        ''
    );

    const updateInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setTransformByObservableValue(e.target.value);
    }, [setTransformByObservableValue]);

    return (
        <div>
            <h4>
                ObservableStateUsage
            </h4>
            <input value={input} placeholder="输入值" onChange={updateInput} />
            <div>
                防抖后的值：{afterDebounceValue}
            </div>
        </div>
    )
};

export default ObservableStateUsage;
