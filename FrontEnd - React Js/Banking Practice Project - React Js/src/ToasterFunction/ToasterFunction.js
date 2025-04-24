import toast from 'react-hot-toast';
export const execeuteToast = (type, message) => {
  let BGcolor = "";
  let tosatDuration = 4000;
  if (type === "success") {
    BGcolor = "#1cc85d";
  } 
   else if (type === "error") {
    BGcolor = "#dc2d0a";
  } else if (type === "loading"){
    tosatDuration = Infinity;
    BGcolor = "#FFC300";
  }
  else{
    type="custom"
  }

  return toast[type](message, {
    duration: tosatDuration,
    position: 'bottom-right',
    style: {
      minWidth: '150px',
      backgroundColor: BGcolor,
      color: 'white'
    },
  });
};