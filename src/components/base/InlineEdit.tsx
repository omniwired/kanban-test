import React, {useContext, useState} from "react";
import {store} from "../../data/DataProvider";
import {InputPayload} from "../../types/InputPayload";

const InlineEdit = ({setValue}: { setValue: InputPayload }) => {
    const {dispatch} = useContext(store);

    const [editingValue, setEditingValue] = useState(setValue.value);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditingValue(event.target.value);

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === "Escape") {
            // @ts-ignore
            event.target.blur();
        }
    }

    const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value.trim() === "") {
            setEditingValue(setValue.value);
        } else {
            setValue.value = event.target.value;
            dispatch(setValue);
        }
    }

    return (
        <input
            className="bg-transparent border-0 p-1 text-right"
            type="text"
            aria-label="Field name"
            value={editingValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
        />
    );
}
export default InlineEdit;