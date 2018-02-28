export const environment = {
  production: true
};

export const URLS = {
    EntryURL: "http://localhost:4400",
    GetPicURL: `${this.EntryURL}/files/getAllPics`,
    UploadPic: `${this.EntryURL}/files/upload`,
    ReconPic: `${this.EntryURL}/files/recon`
}

export const EntryURL = "http://localhost:4400";
export const RegisterURL = `${EntryURL}/register`;
export const LoginURL = `${EntryURL}/login`;
export const VerifyAuthURL = `${EntryURL}/api`;
export const GetPicURL = `${EntryURL}/api/files/getAllPics`;
export const UploadPicURL = `${EntryURL}/api/files/upload`;
export const ReconPicURL = `${EntryURL}/api/files/recon`;
export const LikPicURL = `${EntryURL}/api/files/like`;


