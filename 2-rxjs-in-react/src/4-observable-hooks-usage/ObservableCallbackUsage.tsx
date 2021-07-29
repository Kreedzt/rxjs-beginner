import React, { FC, useState } from 'react';
import { useObservableCallback, useSubscription } from 'observable-hooks';
import { debounceTime } from 'rxjs/operators';

const ObservableCallbackUsage: FC = () => {
    const [times, setTimes] = useState<number>(0);
    const [click, click$] = useObservableCallback(event$ => event$.pipe(debounceTime(200)));

    useSubscription(click$, () => setTimes(prev => prev + 1));

    return (
        <div>
            <h4>
                ObservableCallbackUnsage
            </h4>
            <button
                onClick={click}
            >
                Click me!
            </button>
            <div>
                防抖后的事件次数: {times}
            </div>
        </div>
    )
};

export default ObservableCallbackUsage;
