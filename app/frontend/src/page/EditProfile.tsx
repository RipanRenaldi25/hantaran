import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import {
  createProfileWithAddress,
  editProfile,
  getUserWithProfile,
  getUserWithProfileAndAddress,
} from '@/feature/user';
import { useAppDispatch, useAppSelector } from '@/states';
import { setUserLoginProps, setUserLoginWithProfile } from '@/states/userState';
import { CircleChevronLeft, Pencil } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const { userLoginWithProfile } = useAppSelector((state) => state.user);
  const [newFileImage, setNewFileImage] = useState<string>('');
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [userProfileInputField, setUserProfileInputField] = useState<{
    email: string;
    username: string;
    full_name: string;
    phone_number: string;
    avatar: string;
    city: string;
    postal_code: string;
    street: string;
    details: string;
  }>(userLoginWithProfile as any);
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  console.log({ userId });

  const getUser = async () => {
    const user = await getUserWithProfileAndAddress(userId as string);
    console.log({ user });
    const payload = {
      ...user,
    };

    dispatch(setUserLoginWithProfile(payload));
    setUserProfileInputField({ ...payload, avatar: '' });
  };
  console.log({ userProfileInputField, userLoginWithProfile });

  const onInputChange = (e: any) => {
    setUserProfileInputField((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    getUser();
  }, [userId]);

  const handleCreateUser = async () => {
    let err = '';
    const payload = {
      avatar: newFileImage,
      fullName: userProfileInputField.full_name,
      phoneNumber: userProfileInputField.phone_number,
      city: userProfileInputField.city,
      postalCode: userProfileInputField.postal_code,
      street: userProfileInputField.street,
      details: userProfileInputField.details,
    };
    for (const input of Object.entries(payload)) {
      const [key, value] = input;
      if (!value) {
        err = key;
        break;
      }
    }
    if (err.length) {
      toast({
        title: 'Error',
        description: `Please fill ${err} input field`,
        variant: 'destructive',
      });
      return;
    }
    const data = await createProfileWithAddress(payload);
    dispatch(
      setUserLoginWithProfile({
        avatar: userProfileInputField.avatar,
        city: userProfileInputField.city,
        details: userProfileInputField.details,
        full_name: userProfileInputField.full_name,
        phone_number: userProfileInputField.phone_number,
        postal_code: userProfileInputField.postal_code,
        street: userProfileInputField.street,
        email: userProfileInputField.email,
        id: userId as string,
        username: userProfileInputField.username,
      })
    );
  };

  const handleEditProfile = async () => {
    const payload = {
      avatar: newFileImage,
      full_name: userProfileInputField.full_name,
      phone_number: userProfileInputField.phone_number,
      city: userProfileInputField.city,
      postal_code: userProfileInputField.postal_code,
      street: userProfileInputField.street,
      details: userProfileInputField.details,
      userId,
    };
    const data = await editProfile(payload);
    console.log({ data });
    dispatch(setUserLoginWithProfile(data));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userLoginWithProfile.city && !userLoginWithProfile.full_name) {
      handleCreateUser();
    } else {
      handleEditProfile();
    }

    toast({ title: 'Success', description: 'Update profile success' });
  };
  console.log({ userProfileInputField, userLoginWithProfile });

  return (
    <>
      <Toaster />
      <div className="form-container flex flex-col gap-5 border shadow-2xl relative">
        <div className="absolute cursor-pointer">
          <NavLink to={''} onClick={() => navigate(-1)}>
            <CircleChevronLeft className="size-6" />
          </NavLink>
        </div>
        <h1 className="font-bold text-xl">Tambah/Ubah Profil</h1>
        <div
          className="profile-img flex justify-center hover:cursor-pointer relative"
          onClick={() => {
            fileRef?.current?.click();
          }}
        >
          <img
            src={
              userProfileInputField.avatar.length
                ? userProfileInputField.avatar
                : userLoginWithProfile.avatar
                ? `${import.meta.env.VITE_API_BASE_URL}/public/${
                    userLoginWithProfile.avatar
                  }`
                : 'https://github.com/shadcn.png' // Gambar default jika tidak ada avatar
            }
            alt="Foto Profil"
          />
          <Pencil />
        </div>
        <form encType="multipart/form-data" onSubmit={handleSubmitForm}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Masukkan nama lengkap Anda"
            value={userProfileInputField.username}
            onChange={onInputChange}
            disabled
          />

          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Masukkan email Anda"
            value={userProfileInputField.email}
            onChange={onInputChange}
            disabled
          />

          <label>Nama Lengkap:</label>
          <input
            type="text"
            name="full_name"
            placeholder="Masukkan nama lengkap Anda"
            value={userProfileInputField.full_name || ''}
            onChange={onInputChange}
          />

          <label>Nomor Telepon:</label>
          <input
            type="text"
            name="phone_number"
            placeholder="Masukkan nama lengkap Anda"
            value={userProfileInputField.phone_number}
            onChange={onInputChange}
          />

          <input
            type="file"
            name="image_url"
            ref={fileRef}
            onChange={(e: any) => {
              const imageUrl = URL.createObjectURL(e.target.files[0]);
              setNewFileImage(e.target.files[0]);
              setUserProfileInputField((prevState) => ({
                ...prevState,
                avatar: imageUrl,
              }));
            }}
            hidden
          />

          <label>Kota:</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Masukkan kota Anda"
            value={userProfileInputField.city || ''}
            onChange={onInputChange}
          />

          <label>Kode Pos:</label>
          <input
            type="text"
            id="postal-code"
            name="postal_code"
            placeholder="Masukkan kode pos Anda"
            value={userProfileInputField.postal_code}
            onChange={onInputChange}
          />

          <label>Jalan:</label>
          <input
            type="text"
            id="street"
            name="street"
            placeholder="Masukkan nama jalan Anda"
            value={userProfileInputField.street}
            onChange={onInputChange}
          />

          <label>Detail Alamat:</label>
          <input
            type="text"
            id="address-detail"
            name="details"
            value={userProfileInputField.details}
            placeholder="Masukkan detail alamat (opsional)"
            onChange={onInputChange}
          />

          <button type="submit" className="btn-submit">
            {!userLoginWithProfile.city || userLoginWithProfile.full_name
              ? 'Ubah Data'
              : 'Simpan Data'}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
