async function tryCallbackOrPromise(promise, callback = null) {
  if (isValidCallback(callback)) {
    promise.then((data) => {
      callback(null, data);
    })
      .catch(callback);
  }
  await promise;
}

function isValidCallback(callback) {
  return typeof callback === 'function';
}

function tryCallbackOrThrowError(error, callback = null) {
  if (isValidCallback(callback)) {
    callback(error);
  } else {
    throw error;
  }
}

export {tryCallbackOrPromise, tryCallbackOrThrowError};
