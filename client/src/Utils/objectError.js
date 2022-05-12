

export const isObjEmpty = (error) => {
    for (var prop in error) {
      if (error.hasOwnProperty(prop)) return false;
    }
    return true;
  };

