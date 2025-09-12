import { createContext, useContext, useState } from "react";

export type CounsellorProfile = {
  role: "counsellor" | null;
  fullName?: string;
  email?: string;
  specialization?: string;
  yearsExperience?: string;
};

const UserProfileContext = createContext<{
  profile: CounsellorProfile;
  setProfile: (p: CounsellorProfile) => void;
}>({
  profile: { role: null },
  setProfile: () => {},
});

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<CounsellorProfile>({ role: null });
  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
