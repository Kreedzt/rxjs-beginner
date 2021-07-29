import React, { FC, useState } from 'react';
import {
    useObservable,
    useObservableState,
    useSubscription,
    useObservableCallback,
} from 'observable-hooks';
import { takeUntil, skipUntil, scan } from 'rxjs/operators';
import { interval } from 'rxjs';

const TakeUntilAndSkipUntil: FC = () => {
    const [stopRecord, stopRecord$] = useObservableCallback((input$) => input$);
    const [start, start$] = useObservableCallback((input$) => input$);

    const event$ = useObservable(
        () => interval(1000).pipe(skipUntil(start$)),
        [start$],
    );

    const [times, setTimes] = useState<number>(0);
    useSubscription(event$, () => setTimes((prev) => prev + 1));

    const [listenTimes] = useObservableState(
        (input$, initialState) =>
            event$.pipe(
                takeUntil(stopRecord$),
                scan((acc, currentValue) => acc + 1, 0),
            ),
        0,
    );

    return (
        <div>
            <h2>TakeUntil & SkipUntil</h2>
            <button onClick={start}>开始</button>
            <div>次数:{times}</div>
            <button onClick={stopRecord}>停止监听</button>
            <div>监听到的次数:{listenTimes}</div>
        </div>
    );
};

export default TakeUntilAndSkipUntil;
