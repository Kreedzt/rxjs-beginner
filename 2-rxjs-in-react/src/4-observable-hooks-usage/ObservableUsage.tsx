import React, { FC, useState, useCallback } from 'react';
import { useObservable, useSubscription } from 'observable-hooks';
import { debounceTime, map } from 'rxjs/operators';

const ObservableUsage: FC = () => {
    const [input, setInput] = useState<string>('');
    const event$ = useObservable(
        (input$) => input$.pipe(
            map(([originInput]) => originInput),
            debounceTime(200)
        ),
    [input]);

    const [afterDebounceTimeValue, setAfterDebounceTimeValue] = useState<string>('');

    const updateInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }, []);

    useSubscription(event$, setAfterDebounceTimeValue);

    return (
        <div>
            <h4>
                ObservableState
            </h4>
            <input value={input} placeholder="输入值" onChange={updateInput} />
            <div>
                防抖后的值：{afterDebounceTimeValue}
            </div>
        </div>
    )
};

export default ObservableUsage;
