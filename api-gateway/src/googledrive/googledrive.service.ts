// google-drive.service.ts
import { Injectable } from '@nestjs/common';
const { google } = require('googleapis');
import { Readable } from 'stream';

@Injectable()
export class GoogleDriveService {
  private readonly drive;

  constructor() {
    const oauth2Client = new google.auth.OAuth2(
      '227672290325-ej8hppa706o7vgeh4jqok5t26mobn8rd.apps.googleusercontent.com',
      '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',
      'https://developers.google.com/oauthplayground',
    );

    // Set the refresh token obtained during the OAuth2 authorization process
    oauth2Client.setCredentials({
      refresh_token: '1//04J3t4Q5iwfc_CgYIARAAGAQSNwF-L9IrDD3a2r2KbuS_HVgUEx0J2jsWZrZG2sGdyEzR3G-nQ_GKGzigxuXS9SpME9dsB8hm4hg',
    });

    this.drive = google.drive({ version: 'v3', auth: oauth2Client });
  }

  async uploadImage(imageBuffer: Buffer, imageName: string): Promise<string> {
	const media = {
        mimeType: 'image/jpeg',
        body: Readable.from([imageBuffer]),
      };
	  console.log(media)
    try {
      const response = await this.drive.files.create({
        requestBody: {
          name: imageName,
          mimeType: 'image/jpeg', // Adjust the mimeType according to your image type
		  parents: ['1Nru1cSmLWo2VoUK48kpZDfo5xxR9VwjB']
        },
        media: media
      })

      const fileId = response.data.id;

    //   const fileURL = `https://drive.google.com/uc?id=${fileId}`;
      return fileId;
    } catch (error) {
      console.error('Error uploading image to Google Drive:', error);
      throw new Error('Failed to upload image');
    }
  }
}
