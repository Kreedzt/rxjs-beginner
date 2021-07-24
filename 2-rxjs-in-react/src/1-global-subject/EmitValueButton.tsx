import React, { FC, useCallback } from 'react';
import { SubjectInstance } from './subject1';

let value = 'res=0';

const EmitValueButton: FC = () => {
    const emitValue = useCallback(() => {
        SubjectInstance.next(value += '+1');
    }, []);
    
    return (
        <button
          onClick={emitValue}
        >
            EmitValue
        </button>
    );
};

export default EmitValueButton;
