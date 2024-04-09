import express from "express";
// logout endpoint
export const logoutUser = async (req, res, next) => {
    try{
        // Clearing token from localStorage
    localStorage.removeItem('auth');//name for jwt token
    console.log('Token cleared');
    
        //Handling logout through the server
   const response = await  fetch('/logout', {
    method:'POST',
    headers: {
    'Authorization': `Bearer ${localStorage.getItem('auth')}`
    }})

        if(response.ok){
            res.status(200).json({success:true, message:'User logged out'})
            console.log('Logged out');
        } else {
            res.status(404).json({success:false, message:'Failed to log out'});
            console.error('Logout Failed');
        }
    } catch(err){
        res.status(500).json({success:false, message:'Error during logout'});
        console.error('Error occured :', err)
    } }
    
