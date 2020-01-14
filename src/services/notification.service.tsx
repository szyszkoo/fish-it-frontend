import { notification } from "antd";

notification.config({
    duration: 3,
    top: 1,
})

const success = (message: string) => {
    notification.success({
        message: message
    })
};

const error = (message: string) => {
    notification.error({
        message: message
    })
};

const warning = (message: string) => {
    notification.warning({
        message: message
    })
};

export const notificationService = {
    success,
    error,
    warning,
}