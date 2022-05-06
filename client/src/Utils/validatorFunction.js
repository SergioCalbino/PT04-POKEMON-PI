


export const validator = (input) => {
 
    let error = {};
    
    if (!input.name) error.name = "Name is required";
    if (!/^[a-zA-Z ]*$/.test(input.name))
      error.name = "Name is invalid: must be letters only";
    if (input.name.length > 20 || input.name.length < 3)
      error.name = "Name must be between 3 and 20 characters";
    
    if (input.life <= 0 || input.life >= 200)
      error.life = "Allowable values ​​must be greater than 0 and less than 200";
    
    if (input.strength <= 0 || input.strength >= 150)
      error.strength = "Allowable values ​​must be greater than 0 and less than 150";
    
    if (input.defense <= 0 || input.defense >= 200)
      error.defense =
        "Allowable values ​​must be greater than 0 and less than 200";
    
    if (input.speed <= 0 || input.speed >= 150)
      error.speed = "Allowable values ​​must be greater than 0 and less than 150";
    
    if (input.height <= 0 || input.height >= 150)
      error.height =
        "Allowable values ​​must be greater than 0 and less than 150";
    
    if (input.weight <= 0 || input.weight >= 300)
      error.weight =
        "Allowable values ​​must be greater than 0 and less than 300";
    
    
    
    return error;
  
}




  

  