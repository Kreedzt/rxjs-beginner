import React, { FC } from 'react';
import {
    useObservable,
    useObservableState,
    useObservableCallback,
} from 'observable-hooks';
import {
    takeUntil,
    skipUntil,
    mergeMap,
    scan,
    map,
    tap,
} from 'rxjs/operators';
import { interval, of } from 'rxjs';

const MergeMap: FC = () => {
    const [start, start$] = useObservableCallback((input$) => input$);
    const [stopRecord, stopRecord$] = useObservableCallback((input$) => input$);

    const time1000$ = useObservable(
        () =>
            interval(1000).pipe(
                skipUntil(start$),
                tap(() => console.log('interval 1000')),
                scan((acc) => acc + 1, 0),
            ),
        [start$],
    );

    const [listenTimes] = useObservableState(
        (input$, initialState) =>
            time1000$.pipe(
                // mergeMap 始终合并到新的 Observable
                /* mergeMap((nextValue) =>
                 *     of(nextValue).pipe(
                 *         timeout(500),
                 *         tap(() => console.log('timeout 500')),
                 *         map(() => nextValue * 10),
                 *     ),
                 * ), */
                /**
                 * 为每个派发的值创建一个定时器，派发 N 次就有 N 个定时器并行运行
                 */
                mergeMap((nextValue) =>
                    interval(1000).pipe(
                        map(() => {
                            console.log(
                                'interval running...',
                                `created by value:${nextValue}`,
                            );
                            return nextValue * 10;
                        }),
                    ),
                ),
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
            <h2>MergeMap</h2>
            <button onClick={start}>开始</button>
            <button onClick={stopRecord}>停止监听</button>
            <div>监听到的次数:{listenTimes}</div>
        </div>
    );
};

export default MergeMap;
