import codeMessage from './codeMessage';
import ToastMessage from '@/components/Toaster/ToastMessage';

const successHandler = (response, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
  const { data } = response;
  if (data && data.success === true) {
    const message = response.data && data.message;
    const successText = message || codeMessage[response.status];

    if (options.notifyOnSuccess) {
      ToastMessage({
        type: 'success',
        title: 'Request success',
        description: successText,
      });
    }
  } else {
    const message = response.data && data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;
    if (options.notifyOnFailed) {
      ToastMessage({
        type: 'error',
        title: `Request error ${status}`,
        description: errorText,
      });
    }
  }
};

export default successHandler;
