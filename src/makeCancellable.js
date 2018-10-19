// @flow

export type Cancellable<R> = {
  promise: Promise<R>,
  cancel: () => void,
};

function makeCancellable<R>(promise: Promise<R>): Cancellable<R> {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((value) => {
      if (isCanceled) {
        return reject({ isCancelled: true });
      }

      return resolve(value);
    });
    promise.catch((error) => {
      if (isCanceled) {
        return reject({ isCancelled: true });
      }

      return reject(error);
    });
  });

  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    },
  };
}

export default makeCancellable;
