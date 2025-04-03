import { ApiMessage } from "../interfaces/ApiMessage";
import { ProfileData } from "../interfaces/ProfilesData";

const retrieveProfiles = async () => {
  try {
    const response = await fetch('/api/profiles', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid profiles API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }  
};

const retrieveProfile = async (id: number | null): Promise<profileData> => {
  try {
    const response = await fetch(`/api/profiles/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if(!response.ok) {
      throw new Error('invalid profiles API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return Promise.reject('Could not fetch profile');
  }
};

const createProfile = async (body: ProfileData): Promise<ProfileData> => {
  try {
    const response = await fetch(
      '/api/profiles/', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(body)
      }

    )
    const data = response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from Profile Creation: ', err);
    return Promise.reject('Could not create Profile');
  }
};

const updateProfile = async (id: number, body: ProfileData): Promise<ProfileData> => {
  try {
    const response = await fetch(
      `/api/profiles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Update did not work', err);
    return Promise.reject('Update did not work');
  }
};

const deleteProfile = async (id: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/profiles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error in deleting profile', err);
    return Promise.reject('Could not delete profile');
  }
};

export { retrieveProfiles, retrieveProfile, createProfile, updateProfile, deleteProfile };
