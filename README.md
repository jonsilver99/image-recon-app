# ImageReconClient
This is an Angular Image reconnaissance app with Clarifai's api. App Also features a jwt registration/login module, an image 'like' feature image upload option. Created using node, Angular and basic json files for data storage.
    # hosted at : https://image-recon-app.herokuapp.com

    # 03/03/2018 - app now Integrates Amazon's S3 service to resolve, serve and upload/store    static files (images)
    
    # more info:
    - This project was generated with [Angular CLI](https://github.com/angular/angular-cli)     version 1.6.2.
    - This project is deployed to heroku with an aot build script that runs on the heroku 
      server once deployed - creating the dist folder and all the necessary compiled js files 
      in it.
    - This project is served via express server serving up the index file ONLY - the rest of 
      the data is served to the client via calls to the external image-recon-server at:
      https://image-recon-server.herokuapp.com/    