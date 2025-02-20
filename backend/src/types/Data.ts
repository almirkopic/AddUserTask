export interface UserData {
  email: string;
  phoneNumbers: { type: string; value: string }[];
}

export interface NameData {
  firstName: string;
  lastName: string;
}

export interface Data {
  initialData: UserData[];
  namesArray: NameData[];
}
