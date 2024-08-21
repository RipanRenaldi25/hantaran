import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { InvariantError } from '../../../../../Domain/Exception/InvariantError';

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const rootPath =
      process.env.NODE_ENV === 'development'
        ? path.join(__dirname, '../../../../../../uploads')
        : path.join(__dirname, '../../../../../uploads');
    if (!fs.existsSync(rootPath)) {
      fs.mkdirSync(rootPath);
    }
    cb(null, rootPath);
  },
  filename: (req, file, cb) => {
    cb(null, `img-${new Date().toISOString()}-${file.originalname}`);
  },
});

export const multerMiddleware = multer({
  storage: diskStorage,
  fileFilter: (req, file, cb) => {
    const validFormats = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!validFormats.some((format) => format === file.mimetype)) {
      cb(new InvariantError('Invalid file format [png, jpg,jpeg]'));
      return;
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
