import ProviderWithComponent from "../../store/ProviderWithComponent";
import PopupContainer from "../Popup/PopupContainer";

export default { title: "PopupContainer/PopupComponent", component: ProviderWithComponent(PopupContainer) };
export const main = () => ProviderWithComponent(PopupContainer)();
