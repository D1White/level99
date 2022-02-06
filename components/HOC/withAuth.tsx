import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import type { NextPage } from 'next';
import { IUser } from 'types/User';

const withAuth = (WrappedPage: NextPage<any>) => {
  return (props: any) => {
    const Router = useRouter();
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        Router.replace('/');
      } else {
        (async function () {
          const { data } = await axios.get<IUser>('/api/user', {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          if (data.id && data.email) {
            setUser(data);
          } else {
            localStorage.removeItem('token');
            Router.replace('/');
          }
        })();
      }
    }, []);

    if (user) {
      return <WrappedPage {...props} user={user} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
