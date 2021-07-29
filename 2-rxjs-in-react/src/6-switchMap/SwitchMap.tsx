import React, { FC } from 'react';
import {
    useObservable,
    useObservableState,
    useObservableCallback,
} from 'observable-hooks';
import {
    takeUntil,
    skipUntil,
    switchMap,
    take,
    scan,
    tap
} from 'rxjs/operators';
import { interval } from 'rxjs';

const SwitchMap: FC = () => {
    const [start, start$] = useObservableCallback((input$) => input$);
    const [stopRecord, stopRecord$] = useObservableCallback((input$) => input$);

    const time1000$ = useObservable(
        () =>
            interval(1000).pipe(
                skipUntil(start$),
                tap(() => console.log('interval 1000')),
            ),
        [],
    );

    const time500$ = useObservable(
        () =>
            interval(500).pipe(
                tap(() => console.log('interval 500')),
            ),
        [],
    );

    const [listenTimes] = useObservableState(
        (input$, initialState) =>
            time1000$.pipe(
                take(3),
                // switchMap 销毁上一次 switchMap 的 Observable
                // 所以只会存在一个定时器
                switchMap(() => time500$),
                scan((acc, currentValue) => {
                    console.log('acc', acc, 'currentValue', currentValue);
                    return acc + 1;
                }, 0),
                takeUntil(stopRecord$),
            ),
        0,
    );

    return (
        <div>
            <h2>SwitchMap</h2>
            <button onClick={start}>开始</button>
            <button onClick={stopRecord}>停止监听</button>
            <div>监听到的次数:{listenTimes}</div>
        </div>
    );
};

export default SwitchMap;
