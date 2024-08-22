import { Request, Response } from 'express';
import { CreateProfileUsecase } from '../../../../../Application/Usecase/Profile/CrateProfileUsecase';
import { validateCreateProfilePayload } from '../../../../Helper/Validator/Profile/ProfileValidator';
import { ClientError } from '../../../../../Domain/Exception/ClientError';

export class ProfileController {
  private readonly createProfileUsecase: CreateProfileUsecase;

  constructor(createProfileUsecase: CreateProfileUsecase) {
    this.createProfileUsecase = createProfileUsecase;
  }

  async createProfile(req: Request, res: Response) {
    try {
      console.log(req.body);
      validateCreateProfilePayload(req.body);
      const { fullName, phoneNumber } = req.body;
      const { id: userId, email, role } = (req as any)['user'];
      const avatar = req.file?.path;
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
      console.log({ payload });
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
}
