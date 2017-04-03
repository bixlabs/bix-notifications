function tryCallbackOrReturnResult(data, callback = null) {
  if (isValidCallback(callback)) {
    return callback(null, data);
  }

  return data;
}

function isValidCallback(callback) {
  return typeof callback === 'function';
}

function tryCallbackForError(error, callback = null) {
  if (isValidCallback(callback)) {
    return callback(error, null);
  }
}

export {tryCallbackOrReturnResult, tryCallbackForError};
