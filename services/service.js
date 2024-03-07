const call = (url, func) => {
  $.ajax({
    url,
    success: (result) => {
      func(result);
      
    }
  })
}
const call2 = (url, func,variable) => {
  $.ajax({
    url,
    success: (result) => {
      func(result,variable);
      
    }
  })
}
const call3 = (url, func,var1,var2) => {
  $.ajax({
    url,
    success: (result) => {
      func(result,var1,var2);
      
    }
  })
}


