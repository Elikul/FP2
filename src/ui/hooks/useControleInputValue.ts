import { useState } from "react";
import * as React from "react";

export const useControlledInputValue = (initialState?: string | null) => {
    const [value, setValue] = useState<string>(initialState || "");

    const onChange = (event: React.ChangeEvent<any>) => {
        setValue(event.target.value);
    };

    return {
        value,
        onChange,
        setValue
    };
};