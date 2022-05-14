interface DataInterface {
    (props: Record<string, any>): JQuery;
    (): Record<any, any>;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface JQuery {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    FORM_MANAGER: () => {
        showModalForm: (...args: any[]) => void;
        editValue: any;
    };

    data: DataInterface;

    placeHolder: HTMLDivElement;

    focus: () => void;
    blur: () => void;
    hide: () => void;
    show: () => void;

    append: (dom: any) => void;
    text?: (text?: string) => string;
    html: (text?: string) => string;
    attr: (name: string, value: string) => void;

    addClass: (name: string) => void;
    removeClass: (name: string) => void;

    remove: () => void;

    trigger: (event: string, data?: any[]) => void;
    resize: () => void;
    click: (cb: Function) => void;
    dblclick: (cb?: Function) => void;

    unbind: (eventName: string, handler?: any) => JQuery;
    bind: (eventName: string, handler: any) => JQuery;
    css: (prop: string, value?: string | number) => JQuery;

    // code plugins
    ComboBox: any;

    CheckBox: any;
    CheckBoxDestroy: any;

    Edit: JEditComponent;
    EditDestroy: any;

    DatePicker: any;
    DatePickerDestroy: any;

    CoreAutocomplete: any;
    CoreAutocompleteDestroy: any;

    MultiComplete: any;
    MultiCompleteDestroy: any;

    MultiEdit: any;
    MultiEditDestroy: any;

    Tree: any;

    grid: HTMLElement;

    position: ({ of: any, my: string, at: string }) => JQuery;

    $input: any;
    input: HTMLDivElement;
    value: (value?: any, other?: any) => any;

    changeData: (handler: Function, data: any) => void;
    change?: (handler: Function) => void;

    aaplayData: (data: any) => void;

    addEclipse: Function;
    eclipse: (callback?: Function) => void;

    get(number: number): HTMLDivElement;
}

interface ICoreComponent<T = Record<string, any>> {
    (props?: T): JQuery;
}

interface IJEditProps {
    border: string;
    mask: string;
    numeric: string;
    alignment: string;
    background: string;
    enable: boolean;
    fallbackMaskErrors: boolean;
}
type JEditComponent = ICoreComponent<Partial<IJEditProps>>;

type NodeElements = string | Document | Window | HTMLElement | EventTarget | JQuery;

declare const $: {
    (el: NodeElements, parent?: NodeElements): JQuery;
    extend: (...args: any[]) => any;

    Deferred: () => any;
    when: (deffered: any) => any;
    ajax: (props: Record<string, any>) => any;
};
