const api = import.meta.env.VITE_API;
const projectKey = import.meta.env.VITE_PROJECT_KEY;

export interface UserDataBasic {
  version: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

interface UserDataPassword {
  version: number;
  currentPassword: string;
  newPassword: string;
}

export const updateBasicUserData = async (userId: string, updatedUserData: UserDataBasic) => {
  const apiUrl = `${api}/${projectKey}/customers/${userId}`;
  const accessToken = 'vqMKk2sT2CXMGnuKf4adI4mgFPGJF7MJ';

  const requestBody = {
    version: updatedUserData.version,
    actions: [
      { action: 'changeEmail', email: updatedUserData.email },
      { action: 'setFirstName', firstName: updatedUserData.firstName },
      { action: 'setLastName', lastName: updatedUserData.lastName },
      { action: 'setDateOfBirth', dateOfBirth: updatedUserData.dateOfBirth },
    ],
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update user data');
  }

  const updatedUserDataResponse = await response.json();

  return updatedUserDataResponse;
};

export const updateUserPassword = async (userId: string, updatedUserData: UserDataPassword) => {
  const apiUrl = `${api}/${projectKey}/customers/password`;
  const accessToken = 'vqMKk2sT2CXMGnuKf4adI4mgFPGJF7MJ';

  const requestBody = {
    id: userId,
    version: updatedUserData.version,
    currentPassword: updatedUserData.currentPassword,
    newPassword: updatedUserData.newPassword,
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update password');
  }

  const updatedUserDataResponse = await response.json();

  return updatedUserDataResponse;
};
