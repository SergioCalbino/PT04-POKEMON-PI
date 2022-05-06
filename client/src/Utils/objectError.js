

export const isNotEmpty = (error) => {
    for (var prop in error) {
      if (error.hasOwnProperty(prop)) return true;
    }
    return false;
  };

