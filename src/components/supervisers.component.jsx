import React from 'react';

export const Supervisers = ({placeholder}) => {
    return(
        
        <div class="dropdown">
        <form>  
          <label> Select Cars </label>  
          <select>  
          <option value = "BMW"> BMW   
          </option>  
          <option value = "Mercedes"> Mercedes   
          </option>  
          <option value = "Audi"> Audi  
          </option>  
          <option value = "Skoda"> Skoda  
          </option>  
          </select>  
        </form>  

      </div>
    );
};