// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false
};

//  Production:
export const EntryURL = "https://image-recon-server.herokuapp.com";
// Development:  
// export const EntryURL = "http://localhost:4400";

export const RegisterURL = `${EntryURL}/register`;
export const LoginURL = `${EntryURL}/login`;
export const VerifyAuthURL = `${EntryURL}/api`;
export const GetPicURL = `${EntryURL}/api/files/getAllPics`;
export const UploadPicURL = `${EntryURL}/api/files/upload`;
export const ReconPicURL = `${EntryURL}/api/files/recon`;
export const LikPicURL = `${EntryURL}/api/files/like`;