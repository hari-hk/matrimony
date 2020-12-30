export class Count {
    interestedCount: number;
    shortListCount: number;
    viewcount: number;
    partnerPercentage: number;
    profilePercentage: number;

    constructor(payload?: any) {
        this.interestedCount = payload && payload['Interested Count'] || 0;
        this.shortListCount = payload && payload['ShortList Count'] || 0;
        this.viewcount = payload && payload['View Count'] || 0;
        this.partnerPercentage = payload && payload['Partner Percentage'] || 0;
        this.profilePercentage = payload && payload['Profile Percentage'] || 0;
    }
}
