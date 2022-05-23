import React, { useState, useRef } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    let items = props.initialData;
    if (props.sorting === 'ASC') {
        items = items.sort((a, b) => a.id - b.id);
    } else {
        items = items.sort((a, b) => b.id - a.id);
    }
    return (
        <ol>
            {items.map((item) => (
                <KeyItem key={item.id} item={item} />
            ))}
        </ol>
    );
}

function KeyItem(props: { item: IItem }) {
    function keysEvents(pressedKey: React.KeyboardEvent<HTMLInputElement>) {
        if (pressedKey.key === 'Enter') {
            setOriginalName(input.current?.value || '');
            setStatus(false);
        }
        if (pressedKey.key === 'Escape') {
            setStatus(false);
        }
    }

    const [originalName, setOriginalName] = useState(props.item.name);
    const input = useRef<HTMLInputElement>(null);
    const [chngStatus, setStatus] = useState(false);

    return !chngStatus ? (
        <li onClick={() => setStatus(true)}>{originalName}</li>
    ) : (
        <li key={props.item.id}>
            <input
                ref={input}
                onKeyDown={keysEvents}
                defaultValue={originalName}
            />
        </li>
    );
}
