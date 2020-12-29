export class BasicDetail {
    maritalStatus: number;
    maritalChild: number;
    height: number;
    weight: number;
    bodyType: string;
    motherTongue: string;
    languagesKnown: Array<any>;
    subcaste: number;
    gothram: string;
    star: string;
    rasi: string;
    dosham: string;
    country: string;
    aboutMe: string;
}

export class ProfileDetail {
    employedIn: string;
    highestEducation: string;
    annualIncome: number;
    occupation: string;
    workLocation: string;
    organization: string;
}

export class FamilyDetails {
    parentsContactNo: string;
    familyValue: string;
    familyType: string;
    familyStatus: string;
    nativePlace: string;
    fatherOccupation: string;
    motherOccupation: string;
    noofBrothers: number;
    noofSisters: number;
    aboutFamily: string
}

export class HabitDetails {
    food: string;
    smoking: string;
    drinking: string;
    physicalStatus: string;
    hobby: Array<any>;
}
export class HobbyDetails {
    sports: Array<any>;
    music: Array<any>;
    others: Array<any>;
}