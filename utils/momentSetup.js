import moment from "moment";
import "moment/locale/vi";

export const setupMomentLocale = (language) => {
    switch (language) {
        case "vi":
            moment.locale("vi");
            break;
        case "en":
            moment.locale("en");
            break;
        default:
            moment.locale("en");
    }
};

export default moment;
