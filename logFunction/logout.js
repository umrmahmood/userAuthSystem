import express from "express";
// logout endpoint
export const logoutUser = async (req, res, next) => {
    try{
        res.status(200).json({success:true, message:'Logout successfully'})
    } catch(e){
        next(e);
    }
};

// clearing token from localStorage

function clearToken(){
    
}
