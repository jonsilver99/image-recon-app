export const environment = {
  production: true,
  
};

// Production:
export const EntryURL = "https://image-recon-server.herokuapp.com";
// Development:  
// export const EntryURL = "export const EntryURL = "http://localhost:4400";

export const RegisterURL = `${EntryURL}/register`;
export const LoginURL = `${EntryURL}/login`;
export const VerifyAuthURL = `${EntryURL}/api`;
export const GetPicURL = `${EntryURL}/api/files/getAllPics`;
export const UploadPicURL = `${EntryURL}/api/files/upload`;
export const ReconPicURL = `${EntryURL}/api/files/recon`;
export const LikPicURL = `${EntryURL}/api/files/like`;