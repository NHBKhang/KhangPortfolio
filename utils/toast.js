import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultConfig = {
    position: "top-right",        // Vị trí hiển thị (top-right, top-left, bottom-right, bottom-left, top-center, bottom-center)
    autoClose: 3000,              // Tự động đóng sau X ms
    hideProgressBar: false,       // Hiển thị thanh tiến trình
    closeOnClick: true,           // Đóng khi click vào
    pauseOnHover: true,           // Tạm dừng khi di chuột qua
    draggable: true,              // Có thể kéo
    progress: undefined,          // Giá trị tiến trình (0 - 1), undefined sẽ tự động
    theme: "dark",                // Giao diện (light, dark, colored)
};

const ToastContent = ({ message, title = null }) => (
    title ? (
        <div>
            <strong style={{ display: 'block', marginBottom: '5px' }}>
                {title}
            </strong>
            <span>{message}</span>
        </div>
    ) : (
        <span>{message}</span>
    )
);

const notify = {
    info: (content, config = {}) => {
        toast.info(<ToastContent {...content} />, {
            ...defaultConfig,
            ...config,
        });
    },
    success: (content, config = {}) => {
        toast.success(<ToastContent {...content} />, {
            ...defaultConfig,
            ...config,
        });
    },
    warning: (content, config = {}) => {
        toast.warning(<ToastContent {...content} />, {
            ...defaultConfig,
            ...config,
        });
    },
    error: (content, config = {}) => {
        toast.error(<ToastContent {...content} />, {
            ...defaultConfig,
            ...config,
        });
    },
    default: (content, config = {}) => {
        toast(<ToastContent {...content} />, {
            ...defaultConfig,
            ...config,
        });
    },
    promise: async (
        promise,
        {
            pending = "Loading...",
            success = "Success!",
            error = "Error!"
        },
        config = {}
    ) => {
        await toast.promise(promise, {
            pending: pending,
            success: success,
            error: error,
            ...defaultConfig,
            ...config,
        });
    }
};

const useNotification = () => {
    const { t } = useTranslation('common');

    const sendNotification = (
        { message = "", title = null },
        type = '',
        config = {}
    ) => {
        const resolvedTitle = title || t(type, { defaultValue: null });
        const resolvedContent = { message: message, title: resolvedTitle };

        switch (type) {
            case 'info':
                notify.info(resolvedContent, config);
                break;
            case 'success':
                notify.success(resolvedContent, config);
                break;
            case 'warning':
                notify.warning(resolvedContent, config);
                break;
            case 'error':
                notify.error(resolvedContent, config);
                break;
            default:
                notify.default(resolvedContent, config);
        }
    };

    return sendNotification;
};

export { useNotification, notify };