import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

type ModalInstance = Omit<ModalStaticFunctions, 'warn'>;

/**
 * 封装antd中使用静态方法调用里面的弹窗类组件，在ts文件中使用，避免无法消费的上下文（组件内部的话使用App组件提供的能力）
 */
class AntdUtils {
  message: MessageInstance | null = null;
  notification: NotificationInstance | null = null;
  modal: ModalInstance | null = null;

  setMessageInstance(message: MessageInstance) {
    this.message = message;
  }

  setNotificationInstance(notification: NotificationInstance) {
    this.notification = notification;
  }

  setModalInstance(modal: ModalInstance) {
    this.modal = modal;
  }
}

export const antdUtils = new AntdUtils();
