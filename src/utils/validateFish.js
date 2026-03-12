export const validateFish = (fish) => {
   let isValid=false;
   if(fish.trim().length===0){
    return isValid;
   }
   if(fish.length<3){
    return isValid;
   }
   if(/[^a-zA-Z\s]/.test(fish)){
    return isValid;
   }
    isValid=true;
    return isValid;

}