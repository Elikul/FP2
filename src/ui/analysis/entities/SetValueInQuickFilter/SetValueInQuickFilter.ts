import { CodeEntity } from "../CodeEntity";
import { Types } from "../../../../agent/utils/forDefineUIComponents";

//установить введённые значения в быстрый фильтр
export class SetValueInQuickFilter extends CodeEntity {
    //получить текущий грид и быстрый фильтр
    getPrevCode(): string {
        if (this.prevRecord?.grid === undefined || this.record.grid !== this.prevRecord?.grid) {
            return [
                `Grid grid_${this.record.grid} = GridUtils.getGridByTabName(form_${this.form_name},"${this.record.tab}");`,
                `GridToolbox toolbox_${this.record.grid} = grid_${this.record.grid}.toolbox();`,
                `toolbox_${this.record.grid}.quickFilter();`,
                `GridRow filterRow_${this.record.grid} = grid_${this.record.grid}.getFilterRow();\n`
            ].join("\n");
        } else if (this.prevRecord?.quickFilter === undefined) {
            return `GridRow filterRow_${this.record.grid} = grid_${this.record.grid}.getFilterRow();\n`;
        }
        return "";
    }

    isEntity(): boolean {
        return (
            this.record.quickFilter !== undefined &&
            (this.record.type === Types.change ||
                this.record.type === Types.blur ||
                this.record.type === Types.checked ||
                this.record.type === Types.unchecked) &&
            this.record.value !== undefined
        );
    }

    getCode(): string {
        //для combobox multiselect
        if (this.record.value?.includes(" m")) {
            let setValue: string[],
                code: string[] = [];
            setValue = this.record.value?.replace(" m", "").split(", ");
            setValue.forEach(value => {
                if (value !== "") {
                    code.push(
                        `GridUtils.setColumnValueInRow("${value}", grid_${this.record.grid}, filterRow_${this.record.grid},"${this.record.quickFilter}");`
                    );
                }
            });
            return this.getPrevCode() + code ? code.join("\n") : "";
        } else
            return (
                this.getPrevCode() +
                `GridUtils.setColumnValueInRow("${this.record.value}", grid_${this.record.grid}, filterRow_${this.record.grid},"${this.record.quickFilter}");`
            );
    }
}
