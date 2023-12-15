import axios from 'axios';

export const login = async (UserInfo) => {
  const res = await axios({
    method: 'POST',
    url: 'https://icpc1hn.work/CPC1HN/User/UserLogin',
    data: UserInfo,
  });
  return res.data;
};
