// google-drive.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const { google } = require('googleapis');
import { Readable } from 'stream';

@Injectable()
export class GoogleDriveService {
  private readonly drive;

  constructor(
	private config: ConfigService
  ) {
    const oauth2Client = new google.auth.OAuth2(
		this.config.get('GOOGLE_DRIVE_CLIENT_ID'),
		this.config.get('GOOGLE_DRIVE_CLIENT_SECRET'),
		this.config.get('GOOGLE_DRIVE_REDIRECT_URI')
    );

    // Set the refresh token obtained during the OAuth2 authorization process
    oauth2Client.setCredentials({
      refresh_token: this.config.get('GOOGLE_DRIVE_REFRESH_TOKEN'),
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

  async deleteImage(filedId: string) {
	await this.drive.files.delete({
		fileId: filedId
	})
  }
}
