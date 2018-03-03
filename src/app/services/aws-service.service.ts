import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

/*********************
    Production mode!!
*********************/

@Injectable()
export class AwsService {

    public Service = AWS;
    public BucketName = process.env.S3_BUCKET;

    constructor() {
        this.Service.config.region = process.env.S3_REGION;
        this.Service.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        this.Service.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    }
}