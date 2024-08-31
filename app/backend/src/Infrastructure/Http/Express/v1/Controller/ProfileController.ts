import { Request, Response } from 'express';
import { CreateProfileUsecase } from '../../../../../Application/Usecase/Profile/CrateProfileUsecase';
import {
  validateCreateProfilePayload,
  validateUpdateProfilePayload,
} from '../../../../Helper/Validator/Profile/ProfileValidator';
import { ClientError } from '../../../../../Domain/Exception/ClientError';
import { UpdateProfileUsecase } from '../../../../../Application/Usecase/Profile/UpdateProfileUsecase';
import { EditProfileUsecase } from '../../../../../Application/Usecase/Profile/EditProfileUsecase';

export class ProfileController {
  private readonly createProfileUsecase: CreateProfileUsecase;
  private readonly updateProfileUsecase: UpdateProfileUsecase;

  constructor(
    createProfileUsecase: CreateProfileUsecase,
    updateProfileUsecase: UpdateProfileUsecase,
    private readonly editProfileUsecase: EditProfileUsecase
  ) {
    this.createProfileUsecase = createProfileUsecase;
    this.updateProfileUsecase = updateProfileUsecase;
  }

  async createProfile(req: Request, res: Response) {
    try {
      validateCreateProfilePayload(req.body);
      const { fullName, phoneNumber } = req.body;
      const { id: userId, email, role } = (req as any)['user'];
      const avatar = req.file?.filename;
      const payload = {
        userId,
        fullName,
        phoneNumber,
        address: {
          city: req.body['address.city'],
          postalCode: req.body['address.postalCode'],
          street: req.body['address.street'],
          details: req.body['address.details'],
        },
        avatar,
      };
      const createdProfile = await this.createProfileUsecase.execute(payload);
      res.status(201).json({
        status: 'Success',
        message: 'Profile created',
        createdProfile,
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: `Client Error: ${err.message}`,
          message: err.message,
        });
      } else {
        res.status(500).json({
          status: 'Server fail',
          message: err.message,
        });
      }
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      console.log(validateUpdateProfilePayload(req.body));
      const { id: userId } = (req as any)['user'];
      const { fullName, phoneNumber } = req.body;
      const payload = {
        userId,
        fullName,
        phoneNumber,
      };
      const avatar = req.file?.filename;
      const updatedProfile = await this.updateProfileUsecase.execute({
        fullName,
        phoneNumber,
        avatar,
        userId,
      });
      res.status(200).json({
        status: 'Success',
        message: 'Profile updated',
        data: updatedProfile,
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: `Client Error: ${err.message}`,
          message: err.message,
        });
      } else {
        res.status(500).json({
          status: 'Server fail',
          message: err.message,
        });
      }
    }
  }

  async editProfile(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const {
        full_name,
        phone_number,
        created_at,
        updated_at,
        city,
        postal_code,
        street,
        details,
      } = req.body;

      const avatar = req.file?.filename;
      const updatedProfile = await this.editProfileUsecase.execute(userId, {
        ...req.body,
        avatar,
      });

      res.status(200).json({
        status: 'Success',
        message: 'Profile updated',
        data: updatedProfile,
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: `Client Error: ${err.message}`,
          message: err.message,
        });
      } else {
        res.status(500).json({
          status: 'Server fail',
          message: err.message,
        });
      }
    }
  }
}
