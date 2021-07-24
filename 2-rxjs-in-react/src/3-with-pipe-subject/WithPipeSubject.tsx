import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const WithPipeSubject: FC = () => {
    const [searchText, setSearchText] = useState<string | undefined>('');
    const [valueFromSubject, setValueFromSubject] = useState<string | undefined>();
    const subjectInstance = useRef(new Subject<string | undefined>());

    const updateSearchValue = useCallback((next?: string) => {
        setSearchText(next);
        subjectInstance.current?.next(next);
    }, []);

    useEffect(() => {
        subjectInstance.current?.pipe(debounceTime(200)).subscribe((next) => {
            setValueFromSubject(next);
        });
    }, []);
    
    return (
        <div>
            <h2>
              WithPipeSubject
            </h2>
            <input value={searchText} onChange={e => updateSearchValue(e.target.value)} placeholder="输入值搜索" />
            <p>
              ValueFromSubject:{valueFromSubject}
            </p>
        </div>
    )
};

export default WithPipeSubject;
