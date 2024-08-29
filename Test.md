Make Me 3 Pages :
the first one is {Forget Password} that has one input [Email] and button
the second one is Verify Code that Has 1 input and button
the third one is Resest Password Page that Has Two Inputs [Email , Password] and button

Don't use Next.js or Tsx or shadcn just use jsx and react and make sure that it looks modern and U can Use : Tailwind , DaisyUi , Material Ui , Formik + Yup , Framer Motion For Cool Animation of Inputs and Buttons and lucide-react for icons

Color Scheme : Green

The APIs:
For Page 1:
Post : https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords
Body : {
"email":"ahmedmutti@gmail.com"
}
EndPoints : {
"statusMsg": "success",
"message": "Reset code sent to your email"
}

For Page 2 :
Post: https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode
Body: {
"resetCode":"535863"
}

endpoints :{
"status": "Success"
}

for page 3 :
Put : https://ecommerce.routemisr.com/api/v1/auth/resetPassword
Body:{
"email":"ahmedmutti@gmail.com",
"newPassword": "Ahmed@123"
}

endpoints:{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDA5NTZmNmJiZmRhZDQyMjIwOTc2OSIsImlhdCI6MTcyNDk2NTk4NSwiZXhwIjoxNzMyNzQxOTg1fQ.7dezDEBPJqVD5CrH_eBVin6S2uV0X6hHwFHhG4aoylQ"
}
