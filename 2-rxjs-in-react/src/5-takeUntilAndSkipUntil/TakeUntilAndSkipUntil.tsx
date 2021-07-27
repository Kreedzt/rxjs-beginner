import React, { FC, useState, useCallback, useRef } from 'react';
import { useObservable, useObservableState, useSubscription } from 'observable-hooks';
import { takeUntil, skipUntil } from 'rxjs/operators';
import { interval, Subject } from 'rxjs';

const TakeUntilAndSkipUntil: FC = () => {
    const start$ = useRef(new Subject<boolean>());
    const event$ = useObservable(() => interval(1000).pipe(
        skipUntil(start$.current)
    ));

    const [times, setTimes] = useState<number>(0);
    useSubscription(event$, () => setTimes(prev => prev + 1));

    const click$ = useRef(new Subject<boolean>());
    const [listenTimes] = useObservableState((input$, initialState) =>
        event$.pipe(
            takeUntil(click$.current),
        )
    , 0);

    const stopRecord = useCallback(() => {
        click$.current.next(true);
    }, []);

    const start = useCallback(() => {
        start$.current.next(true);
    }, []);

    return (
        <div>
            <h2>TakeUntil & SkipUntil</h2>
            <button onClick={start}>开始</button>
            <div>
                次数:{times}
            </div>
            <button
                onClick={stopRecord}
            >
                停止监听
            </button>
            <div>
                监听到的次数:{listenTimes}
            </div>
        </div>
    )
};

export default TakeUntilAndSkipUntil;
