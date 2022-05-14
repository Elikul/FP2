/**
 * Тип поведения для кнопки масштабирования
 */
export enum Behaviour {
    logS = "logS",
    codeS = "codeS"
}

/**
 * Расширить окно "Код"
 * @param block1 - объединённый блок сессий и лога
 * @param block2 - блок кода
 * @param session_block - блок сессий
 * @param logBlock - блок лога
 */
export const expandCodeBlock = (
    block1: HTMLElement | null,
    block2: HTMLElement | null,
    session_block: HTMLElement | null,
    logBlock: HTMLElement | null
) => {
    if (!(block1 && block2 && session_block && logBlock)) return;
    block1.style.visibility = "hidden";
    block1.style.width = "0px";
    block1.style.border = "none";

    block2.style.width = "100%";

    session_block.style.height = "0px";
    session_block.style.visibility = "hidden";

    logBlock.style.height = "0px";
    logBlock.style.visibility = "hidden";
};

/**
 * Расширить окно "Лог"
 * @param block1 - объединённый блок сессий и лога
 * @param block2 - блок кода
 * @param sessionBlock - блок сессий
 * @param logBlock - блок лога
 * @param scaleCodeBtn - кнопка масштабирования окна "Код"
 */
export const expandLogBlock = (
    block1: HTMLElement | null,
    block2: HTMLElement | null,
    sessionBlock: HTMLElement | null,
    logBlock: HTMLElement | null,
    scaleCodeBtn: HTMLElement | null
) => {
    if (!(block1 && block2 && sessionBlock && logBlock && scaleCodeBtn)) return;
    block1.style.width = "100%";
    block1.style.border = "none";

    block2.style.width = "0px";
    block2.style.height = "0px";
    block2.style.visibility = "hidden";

    sessionBlock.style.height = "0px";
    sessionBlock.style.visibility = "hidden";

    logBlock.style.height = "100%";

    scaleCodeBtn.style.visibility = "hidden";
};

/**
 * Уменьшить окно "Код"
 * @param block1 - объединённый блок сессий и лога
 * @param block2 - блок кода
 * @param sessionBlock - блок сессий
 * @param logBlock - блок лога
 */
export const compressCodeBlock = (
    block1: HTMLElement | null,
    block2: HTMLElement | null,
    sessionBlock: HTMLElement | null,
    logBlock: HTMLElement | null
) => {
    if (!(block1 && block2 && sessionBlock && logBlock)) return;
    block1.style.visibility = "visible";
    block1.style.width = "50%";
    block1.style.borderRight = "solid black 5px";

    block2.style.width = "50%";

    sessionBlock.style.height = "50%";
    sessionBlock.style.visibility = "visible";

    logBlock.style.height = "50%";
    logBlock.style.visibility = "visible";
};

/**
 * Уменьшить окно "Лог"
 * @param block1 - объединённый блок сессий и лога
 * @param block2 - блок кода
 * @param sessionBlock - блок сессий
 * @param logBlock - блок лога
 * @param scaleCodeBtn - кнопка масштабирования окна "Код"
 */
export const compressLogBlock = (
    block1: HTMLElement | null,
    block2: HTMLElement | null,
    sessionBlock: HTMLElement | null,
    logBlock: HTMLElement | null,
    scaleCodeBtn: HTMLElement | null
) => {
    if (!(block1 && block2 && sessionBlock && logBlock && scaleCodeBtn)) return;
    block1.style.width = "50%";
    block1.style.borderRight = "solid black 5px";

    block2.style.width = "50%";
    block2.style.height = "100%";
    block2.style.visibility = "visible";

    sessionBlock.style.height = "50%";
    sessionBlock.style.visibility = "visible";

    logBlock.style.height = "50%";
    logBlock.style.visibility = "visible";

    scaleCodeBtn.style.visibility = "visible";
};
