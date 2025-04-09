"use client";

export const AuthProvider = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // const user = useUser();
  // const isMounted = useIsMounted();

  // useEffect(() => {
  //   if (!isMounted) {
  //     return;
  //   }

  //   if (user) {
  //     return;
  //   }

  //   getDefaultUser().then((users) => {
  //     if (!users || users.length === 0 || !users[0]) {
  //       console.error("No default user found");
  //       return;
  //     }

  //     user$.next(users[0]);
  //   });
  // }, [user]);

  return children;
};
