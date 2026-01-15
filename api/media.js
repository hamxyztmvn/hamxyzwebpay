import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const { type } = req.query;
    
    // Tentukan file mana yang akan di-serve
    let fileName, contentType;
    
    switch(type) {
      case 'profile':
        fileName = 'profile.jpg';
        contentType = 'image/jpeg';
        break;
      case 'video':
        fileName = 'video.mp4';
        contentType = 'video/mp4';
        break;
      case 'qris':
        fileName = 'qris.png';
        contentType = 'image/png';
        break;
      default:
        return res.status(400).send('Invalid media type');
    }
    
    // Path ke file
    const filePath = path.join(process.cwd(), 'public', 'assets', fileName);
    
    // Cek apakah file exist
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
    }
    
    // Baca file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Set headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', fileBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache 1 tahun
    
    // Kirim file
    res.send(fileBuffer);
    
  } catch (error) {
    console.error('Error serving media:', error);
    res.status(500).send('Internal server error');
  }
}
