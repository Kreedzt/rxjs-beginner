import React, { FC, useEffect, useState } from 'react';
import { SubjectInstance } from './subject1';
import EmitValueButton from './EmitValueButton';

const GlobalSubject: FC = () => {
    const [valueFromSubject, setValueFromSubject] = useState<string>();
    
    useEffect(() => {
        const subscription = SubjectInstance.subscribe((next) => {
            console.log('next', next);
            setValueFromSubject(next);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);
    
    return (
        <div>
            <h2>
              GlobalSubject...
            </h2>
            <EmitValueButton />
            <p>
            ValueFromSubject:{valueFromSubject}
            </p>
        </div>
    )
};

export default GlobalSubject;
