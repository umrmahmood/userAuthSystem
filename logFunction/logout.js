import express from "express";
import axios from "axios"; 
// logout endpoint
export const logoutUser = async (req, res, next) => {
    try{
        // Clearing token from localStorage
const authHeader = req.headers.authorization;
if (!authHeader){
    return res.status(401).json({ success: false, message: 'Authorisation header missing' });
} const token = authHeader.split('')[1];
const response = await axios.post('http://localhost:3000/user/login', null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return res.status(200).json({ success: true, message: 'User logged out' });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to log out' });
        }
    } catch (err) {
        console.error('Error occurred during logout:', err);
        return res.status(500).json({ success: false, message: 'Error during logout' });
    }
};













//     localStorage.removeItem('auth');//name for jwt token
//     console.log('Token cleared');
    
//         //Handling logout through the server
//    const response = await  fetch('/logout', {
//     method:'POST',
//     headers: {
//     'Authorization': `Bearer ${localStorage.getItem('auth')}`
//     }})

//         if(response.ok){
//             res.status(200).json({success:true, message:'User logged out'})
//             console.log('Logged out');
//         } else {
//             res.status(404).json({success:false, message:'Failed to log out'});
//             console.error('Logout Failed');
//         }
//     } catch(err){
//         res.status(500).json({success:false, message:'Error during logout'});
//         console.error('Error occured :', err)
//     } }
    
